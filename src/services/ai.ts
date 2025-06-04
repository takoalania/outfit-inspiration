export const getOutfitSuggestions = async (image?: string, prompt?: string) => {
  try {
    const res = await fetch('https://outfit-inspiration.onrender.com/api/styling', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image, prompt }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Server error:', err);
      throw new Error(err);
    }

    const data = await res.json();
    return data.suggestions;
  } catch (err) {
    console.error('Fetch failed:', err);
    throw err;
  }
};
