export interface NetworkLink {
  label: string;
  url: string;
  order: number;
  id: string;
  icon?: string;
  enabled?: boolean;
  createdAt?: Date;
}

export interface NetworkEntity {
  [key: string]: NetworkLink;
}
