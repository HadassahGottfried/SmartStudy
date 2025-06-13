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

  public async generateLesson(
    userPrompt: string,
    category: string,
    subCategory: string
  ): Promise<string> {
    try {
      const isHebrew = /[\u0590-\u05FF]/.test(userPrompt);
      const languageInstruction = isHebrew
        ? 'Write the lesson in fluent **Hebrew**.'
        : 'Write the lesson in fluent **English**.';

      const fullPrompt = `
The user would like to receive a **detailed and structured lesson** on the following topic.

**Category**: ${category}  
**Sub-category**: ${subCategory}  
**Question**: ${userPrompt}

${languageInstruction}
Use **Markdown** formatting.

Make sure to include:
- Clear section titles (##, ###)
- Lists or bullet points when helpful
- Bold or italic emphasis for important concepts
- Clear and simple language
- Code blocks if the topic includes technical content

Start directly with the lesson — no greetings or summaries outside the content.
`.trim();

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful and professional tutor who creates clear, structured lessons using Markdown format. Always consider the topic and sub-topic provided.',
          },
          { role: 'user', content: fullPrompt },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      const lesson = completion.choices[0].message.content;
      if (!lesson) throw new Error('No response from AI');
      return lesson;
    } catch (error: any) {
      console.error('OpenAI API error:', error);
      throw new Error('OpenAI API error: ' + error.message);
    }
  }
}
