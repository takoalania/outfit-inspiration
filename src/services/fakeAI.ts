export const generateOutfits = async ({
  prompt,
  image,
}: {
  prompt?: string;
  image?: string;
}) => {
  // Simulate latency
  await new Promise((res) => setTimeout(res, 1000));

  return [
    {
      id: '1',
      title: `Look inspired by ${prompt || 'your image'}`,
      image:
        image ||
        'https://images.unsplash.com/photo-1521337581100-8ca9a73a5f2b',
      link: 'https://example.com/item1',
    },
    {
      id: '2',
      title: 'Fresh alternative outfit',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2',
      link: 'https://example.com/item2',
    },
  ];
};
