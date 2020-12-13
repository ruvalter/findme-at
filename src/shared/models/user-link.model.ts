export interface UserLink {
  name: string;
  url: string;
  order: number;
  id: string;
  profile: string;
  icon?: string;
  enabled?: boolean;
}

export interface LinkEntity {
  [key: string]: UserLink;
}
