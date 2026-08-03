export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content?: string;
  date: string;
  category: string;
  imageUrl: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  icon?: string;
}

export type LeaderGroup = 'pembina' | 'pengawas' | 'pengurus_harian';

export interface Leader {
  id: string;
  name: string;
  role: string;
  group: LeaderGroup;
  imageUrl: string;
}

export interface ContactInfo {
  id: string;
  icon: string;
  label: string;
  value: string;
}
