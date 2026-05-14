// src/types/dashboard.ts
export interface EngagementLog {
  id: string;
  likes: number;
  comments: number;
  shares: number;
  capturedAt: string;
}

export interface Post {
  id: string;
  url: string;
  kolName: string;
  platform: 'Instagram' | 'TikTok';
  engagementLogs: EngagementLog[];
}
