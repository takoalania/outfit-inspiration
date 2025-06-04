import fetch from 'node-fetch';

export async function uploadImage(base64Image: string): Promise<string> {
  const imgbbApiKey = process.env.IMGBB_API_KEY!;
  const base64Data = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;

  const uploadRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ image: base64Data }),
  });

  const uploadData: any = await uploadRes.json();
  const url = uploadData?.data?.url;
  if (!url) throw new Error('Image upload failed');

  return url;
}
