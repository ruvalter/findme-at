export interface NetworkLink {
  label: string;
  url: string;
  order: number;
  id: string;
  icon?: string;
  enabled?: boolean;
  createdAt?: Date;
  urlEditing?: boolean;
  nameEditing?: boolean;
}

export interface NetworkEntity {
  [key: string]: NetworkLink;
}
