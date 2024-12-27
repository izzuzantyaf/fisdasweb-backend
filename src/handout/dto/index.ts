export interface AddHandoutDto {
  name: string;
  link: string;
  is_published?: boolean;
}

export interface UpdateHandoutDto {
  name?: string;
  link?: string;
  is_published?: boolean;
}
