import { Request, Response } from "express";
import OpenAI from "openai";
import EnvSecret from "src/constants/envVariables";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export const chat = async (req: Request, res: Response) => {
  try {
    const apiKey = EnvSecret.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "OpenAI API key is not configured",
      });
    }

    const { messages, model }: { messages: ChatMessage[]; model?: string } =
      req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        message: "'messages' array is required",
      });
    }

    const defaultModel = process.env.OPENAI_MODEL || "gpt-4.1";
    const modelToUse =
      typeof model === "string" && model.trim().length > 0
        ? model
        : defaultModel;

    const client = new OpenAI({ apiKey });

    const completion = await client.chat.completions.create({
      model: modelToUse,
      messages,
      temperature: 0.6,
    });

    const choice = completion.choices?.[0];
    const text = choice?.message?.content || "";

    return res.status(200).json({
      success: true,
      message: "ok",
      data: {
        model: completion.model,
        content: text,
        finish_reason: choice?.finish_reason || null,
      },
    });
  } catch (err: any) {
    const message = err?.message || "OpenAI request failed";
    return res.status(500).json({ success: false, message });
  }
};

export const chatStream = async (req: Request, res: Response) => {
  try {
    const apiKey = EnvSecret.OPENAI_API_KEY;
    if (!apiKey) {
      res
        .status(500)
        .json({ success: false, message: "OpenAI API key is not configured" });
      return;
    }

    const { messages, model }: { messages: ChatMessage[]; model?: string } =
      (req.body as any) || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      res
        .status(400)
        .json({ success: false, message: "'messages' array is required" });
      return;
    }

    console.log("messages", model);

    const defaultModel = process.env.OPENAI_MODEL || "gpt-4.1";
    const modelToUse =
      typeof model === "string" && model.trim().length > 0
        ? model
        : defaultModel;

    // Headers for chunked streaming (NDJSON)
    res.setHeader("Content-Type", "application/x-ndjson; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    // Disable buffering in reverse proxies like nginx
    res.setHeader("X-Accel-Buffering", "no");

    const client = new OpenAI({ apiKey });

    const stream = await client.chat.completions.create({
      model: modelToUse,
      messages,
      temperature: 0.6,
      stream: true,
    });

    req.on("aborted", () => {
      try {
        // Best effort end
        res.end();
      } catch {
        //
      }
    });

    for await (const part of stream) {
      const choice = part.choices?.[0];
      const delta = choice?.delta?.content || "";
      if (delta) {
        res.write(JSON.stringify({ content: delta, done: false }) + "\n");
      }
      if (choice?.finish_reason) {
        break;
      }
    }
    res.write(JSON.stringify({ done: true }) + "\n");
    res.end();
  } catch (err: any) {
    try {
      const message = err?.message || "OpenAI stream failed";
      if (!res.headersSent) {
        res.status(500).json({ success: false, message });
      } else {
        res.write(JSON.stringify({ error: message, done: true }) + "\n");
        res.end();
      }
    } catch {
      //
    }
  }
};

export const imageGenerate = async (req: Request, res: Response) => {
  try {
    const apiKey = EnvSecret.OPENAI_API_KEY;
    if (!apiKey) {
      res
        .status(500)
        .json({ success: false, message: "OpenAI API key is not configured" });
      return;
    }
    const {
      prompt,
      size,
    }: { prompt?: string; size?: "256x256" | "512x512" | "1024x1024" } =
      req.body || {};
    if (!prompt || prompt.trim().length === 0) {
      res.status(400).json({ success: false, message: "'prompt' is required" });
      return;
    }
    const client = new OpenAI({ apiKey });
    const resp = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: size || "1024x1024",
    });
    const data = resp?.data?.[0];
    const url = (data as any)?.url as string | undefined;
    const b64 = (data as any)?.b64_json as string | undefined;
    if (!url && !b64) {
      res.status(500).json({ success: false, message: "No image returned" });
      return;
    }
    res.status(200).json({ success: true, message: "ok", data: { url, b64 } });
    return;
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.message || "Image generation failed",
    });
    return;
  }
};
