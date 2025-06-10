// src/resources/prompts/types.ts

import { UserPayload } from "../users/types";

export interface Prompt {
  id?: number;
  user_id: string;
  prompt: string;
  response: string;
  category_id: number;
  sub_category_id: number;
  created_at: Date;
}
export interface CustomRequest extends Request {
  user?: UserPayload;
}
