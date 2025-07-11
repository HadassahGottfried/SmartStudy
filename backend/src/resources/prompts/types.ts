
import { UserPayload } from "../users/types";

export interface Prompt {
  id?: number;
  user_id: string;
  prompt: string;
  response: string;
  category_id: number;
  sub_category_id: number;
  category?: { name: string };
  sub_category?: { name: string };
  created_at: Date;

}
export interface CustomRequest extends Request {
  user?: UserPayload;
}
