/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Bot,
  Send,
  User,
  Settings2,
  Image as ImageIcon,
  PlugZap,
} from "lucide-react";
import { aiApi, API_BASE, getAuthToken } from "@/lib/api";
import { useToast } from "../ui/use-toast";
import { Switch } from "../ui/switch";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const DEFAULT_MODEL = "gpt-4.1"; // request can override

export default function OpenAIPage() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "m1",
      role: "assistant",
      content:
        "You’re chatting with OpenAI. Ask a question or describe a task.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [model, setModel] = React.useState<string>(DEFAULT_MODEL);
  const { toast } = useToast();
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [imageMode, setImageMode] = React.useState(false);
  const [imageSize, setImageSize] = React.useState<
    "256x256" | "512x512" | "1024x1024"
  >("1024x1024");
  const [images, setImages] = React.useState<
    Array<{ id: string; url?: string; b64?: string; prompt: string }>
  >([]);

  // MCP UI state (UI only; placeholder)
  const [mcpUrl, setMcpUrl] = React.useState("http://localhost:4000");
  const [mcpConnected, setMcpConnected] = React.useState(false);
  const [mcpTools, setMcpTools] = React.useState<string[]>([]);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: 1e9, behavior: "smooth" });
  }, [messages.length]);

  async function handleSend(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setSending(true);

    try {
      // Image generation path
      if (imageMode) {
        const resp = await aiApi.image(text, imageSize);
        const data = resp?.data;
        const img = {
          id: `img-${Date.now()}`,
          url: data?.url,
          b64: data?.b64,
          prompt: text,
        };
        setImages((arr) => [img, ...arr]);
        return;
      }

      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Create a placeholder assistant message we will stream into
      const assistantId = `a-${Date.now()}`;
      setMessages((m) => [
        ...m,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      const controller = new AbortController();
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      const auth = getAuthToken();
      if (auth) headers["Authorization"] = auth;

      const res = await fetch(`${API_BASE}/v1/ai/chat/stream`, {
        method: "POST",
        headers,
        body: JSON.stringify({ messages: history, model }),
        // credentials not needed if using bearer; include if you rely on cookies
        // credentials: "include",
        signal: controller.signal,
      });
      if (!res.ok || !res.body)
        throw new Error(`Stream failed (${res.status})`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        const lines = acc.split("\n");
        acc = lines.pop() || ""; // keep last partial line
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const obj = JSON.parse(line);
            if (obj.content) {
              setMessages((m) =>
                m.map((msg) =>
                  msg.id === assistantId
                    ? {
                        ...msg,
                        content: (msg.content || "") + String(obj.content),
                      }
                    : msg,
                ),
              );
            }
          } catch {
            // ignore malformed chunk
          }
        }
      }
    } catch (e: any) {
      toast({
        title: "OpenAI error",
        description: e?.message || "Request failed",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between -mt-2">
        <div>
          <h1 className="text-2xl ml-1 font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            OpenAI Chat
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            <span className="text-sm">Image mode</span>
            <Switch
              checked={imageMode}
              onCheckedChange={(v) => setImageMode(v)}
            />
            <Select
              value={imageSize}
              onValueChange={(v) => setImageSize(v as any)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="256x256">256 x 256</SelectItem>
                <SelectItem value="512x512">512 x 512</SelectItem>
                <SelectItem value="1024x1024">1024 x 1024</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Settings2 className="w-4 h-4" />
            <span className="text-sm">Model</span>
          </div>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4.1">gpt-4.1</SelectItem>
              <SelectItem value="gpt-4.1-mini">gpt-4.1-mini</SelectItem>
              <SelectItem value="gpt-4o">gpt-4o</SelectItem>
              <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="glassmorphism border-primary/20 -mt-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            Conversation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Images gallery (if any) */}
          {images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((im) => (
                <div
                  key={im.id}
                  className="rounded-xl overflow-hidden border border-primary/20 bg-accent/10"
                >
                  {im.url ? (
                    <img
                      src={im.url}
                      alt={im.prompt}
                      className="w-full h-56 object-cover"
                    />
                  ) : im.b64 ? (
                    <img
                      src={`data:image/png;base64,${im.b64}`}
                      alt={im.prompt}
                      className="w-full h-56 object-cover"
                    />
                  ) : null}
                  <div className="p-2 text-xs text-muted-foreground line-clamp-2">
                    {im.prompt}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div
            ref={scrollRef}
            className="h-[60vh] overflow-y-auto rounded-xl border border-primary/20 p-4 bg-gradient-to-b from-background to-accent/10"
          >
            <div className="space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.role === "assistant" && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="gradient-secondary text-black">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted/50 text-foreground border border-primary/20 rounded-bl-md"
                    }`}
                  >
                    {m.content.split("\n").map((line, i) => (
                      <p key={i} className="whitespace-pre-wrap">
                        {line}
                      </p>
                    ))}
                  </div>

                  {m.role === "user" && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="gradient-primary text-black">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {sending && (
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="gradient-secondary text-black">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="px-4 py-2 rounded-xl bg-muted/50 border border-primary/20 text-sm">
                    <span className="inline-flex gap-1 items-center">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="w-2 h-2 rounded-full bg-accent-foreground animate-pulse [animation-delay:120ms]" />
                      <span className="w-2 h-2 rounded-full bg-chart-4 animate-pulse [animation-delay:240ms]" />
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                imageMode
                  ? `Describe the image (${imageSize})...`
                  : `Message ${model}...`
              }
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={sending || !input.trim()}
              className="gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* MCP (Model Context Protocol) UI - placeholder controls */}
      <Card className="glassmorphism border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlugZap className="w-5 h-5 text-primary" />
            MCP Tools (Preview UI)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Server URL
              </label>
              <Input
                value={mcpUrl}
                onChange={(e) => setMcpUrl(e.target.value)}
                placeholder="http://localhost:4000"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Connect</label>
              <div className="flex items-center gap-2">
                <Switch
                  checked={mcpConnected}
                  onCheckedChange={setMcpConnected}
                />
                <span className="text-sm">
                  {mcpConnected ? "Connected" : "Disconnected"}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Enabled Tools
              </label>
              <div className="flex flex-wrap gap-2">
                {(["web-search", "code-run", "db-query"] as const).map((t) => (
                  <Button
                    key={t}
                    type="button"
                    size="sm"
                    variant={mcpTools.includes(t) ? "default" : "outline"}
                    onClick={() =>
                      setMcpTools((arr) =>
                        arr.includes(t)
                          ? arr.filter((x) => x !== t)
                          : [...arr, t],
                      )
                    }
                  >
                    {t}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Note: This UI is a placeholder for MCP integration. Wire it to your
            MCP server or tools when ready.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
