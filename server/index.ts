  import express, { Request, Response } from 'express';
  import cors from 'cors';
  import dotenv from 'dotenv';
  import OpenAI from 'openai';
  import fetch from 'node-fetch';

  dotenv.config();

  const app = express();
  app.use(express.json({ limit: '10mb' }));
  app.use(cors());

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  const imgbbApiKey = process.env.IMGBB_API_KEY!;

  app.post('/api/styling', async (req: Request, res: Response): Promise<void> => {
    const { prompt, image } = req.body;

    try {
      if (!image && !prompt) {
        res.status(400).json({ error: 'Either image or prompt is required' });
        return;
      }

      let imageUrl: string | undefined;

      if (image) {
        const base64Data = image.includes(',') ? image.split(',')[1] : image;

        const uploadRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ image: base64Data }),
        });

        const uploadData: any = await uploadRes.json();
        imageUrl = uploadData?.data?.url;
        if (!imageUrl) throw new Error('Image upload failed');
      }

      const keywordHint =
        'Each idea must include exactly one keyword in [square brackets] so the user can search for visual inspiration online.';

      const promptText = prompt
        ? `${prompt.trim()}\n\n${keywordHint}`
        : `You will see an image of a person wearing clothes. Your task is NOT to identify the person or make any assumptions about who they are.

      Instead, describe the style and clothing they are wearing, and suggest 3 stylish outfit ideas that match or complement this look.

      ${keywordHint}`;


      const content: any[] = [{ type: 'text', text: promptText }];

      if (imageUrl) {
        console.log('🖼️ Image URL sent to OpenAI:', imageUrl);
        content.push({ type: 'image_url', image_url: { url: imageUrl } });
      }

      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content }],
        max_tokens: 500,
        temperature: 0.7,
      });

      const reply = response.choices[0]?.message?.content;
      res.json({ suggestions: reply });
    } catch (err) {
      console.error('AI error:', err);
      res.status(500).json({ error: 'Failed to generate suggestions' });
    }
  });

  app.listen(4000, () => {
    console.log('✅ Server running on http://localhost:4000');
  });
