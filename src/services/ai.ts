export const getOutfitSuggestions = async (image?: string, prompt?: string) => {
  const res = await fetch('http://localhost:4000/api/styling', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image, prompt }),
  });

  const data = await res.json();
  return data.suggestions;
};
