export const getOutfitSuggestions = async (image?: string, prompt?: string) => {
  try {
    const res = await fetch('https://outfit-inspiration.onrender.com/api/styling', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image, prompt }),
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    return data.suggestions;
  } catch (error) {
    console.error('Failed to fetch outfit suggestions:', error);
    return 'Sorry, we couldn’t generate suggestions right now.';
  }
};
