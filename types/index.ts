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

export interface Leader {
  id: string;
  name: string;
  role: string;
  group: 'Pembina' | 'Pengawas' | 'Pengurus Harian';
  imageUrl: string;
}
