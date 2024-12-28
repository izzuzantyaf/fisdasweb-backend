export interface AddScheduleDto {
  name: string;
  link: string;
  is_published?: boolean;
}

export interface UpdateScheduleDto {
  name?: string;
  link?: string;
  is_published?: boolean;
}
