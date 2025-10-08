import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { chat, chatStream, imageGenerate } from "./ai.controller";

const AiRouter = Router();

AiRouter.post("/chat", asyncHandler(chat));
AiRouter.post("/chat/stream", asyncHandler(chatStream));
AiRouter.post("/image", asyncHandler(imageGenerate));

export { AiRouter };
