import express, { Request, Response } from 'express';
import { uploadImage } from '../services/imgbb';
import { getOpenAISuggestions } from '../services/openai';

const router = express.Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { prompt, image } = req.body;

  try {
    if (!prompt && !image) {
      res.status(400).json({ error: 'Either image or prompt is required' });
      return;
    }

    let imageUrl: string | undefined;
    if (image) {
      imageUrl = await uploadImage(image);
    }

    const result = await getOpenAISuggestions(prompt, imageUrl);
    res.json({ suggestions: result });
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ error: 'Failed to generate suggestions' });
  }
});

export default router;
