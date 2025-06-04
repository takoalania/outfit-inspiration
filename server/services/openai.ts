import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function getOpenAISuggestions(prompt?: string, imageUrl?: string) {
  const keywordHint = 'Each idea must include exactly one keyword in [square brackets] for visual inspiration.';
  const basePrompt = prompt?.trim() || `You will see an image of a person wearing clothes. Your task is NOT to identify the person or make any assumptions about who they are.\n\nInstead, describe the style and clothing they are wearing, and suggest 3 stylish outfit ideas that match or complement this look.\n\n${keywordHint}`;

  const content: any[] = [{ type: 'text', text: `${basePrompt}\n\n${keywordHint}` }];

  if (imageUrl) {
    content.push({ type: 'image_url', image_url: { url: imageUrl } });
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content }],
    max_tokens: 500,
    temperature: 0.7,
  });

  return completion.choices[0]?.message?.content;
}
