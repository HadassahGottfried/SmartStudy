// src/services/openaiService.ts
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();
export class OpenAIService {
  private openai: OpenAI;
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });
  }

  public async generateLesson(prompt: string): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o", // או "gpt-3.5-turbo" אם אין לך גישה
        messages: [
          { role: "system", content: "You are a helpful tutor." },
          { role: "user", content: prompt },
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      const lesson = completion.choices[0].message.content;
      if (!lesson) throw new Error("No response from AI");
      return lesson;
    } catch (error: any) {
      console.error("OpenAI API error:", error);
      throw new Error("OpenAI API error: " + error.message);
    }
  }
}
