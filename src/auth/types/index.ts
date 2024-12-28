import { Request } from 'express';

export type AccessTokenPayload = {
  id: number;
  iat: number;
  exp: number;
};

export type AuthenticatedRequest = Omit<Request, 'user'> & {
  user: Record<string, AccessTokenPayload>;
};
