export type InstagramPost = {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  permalink: string;
  timestamp: string;
  thumbnail_url?: string;
}

export async function getInstagramPosts(limit: number = 12): Promise<InstagramPost[]> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!accessToken || !userId) {
    console.warn('Instagram credentials not configured');
    return [];
  }

  try {
    const fields = 'id,caption,media_type,media_url,permalink,timestamp,thumbnail_url';
    const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&access_token=${accessToken}&limit=${limit}`;

    const response = await fetch(url, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return [];
  }
}
