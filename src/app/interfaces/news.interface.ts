export interface News {
  id?: number;
  title: string;
  img?: string;
  description: string;
  date_create: string;
  external_id?: string;
  link_news?: string;
  read: boolean;
}