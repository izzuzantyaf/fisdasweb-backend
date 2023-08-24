import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ADMIN_JWT_STRATEGY_NAME } from '../constants';

@Injectable()
export class AdminJwtAuthGuard extends AuthGuard(ADMIN_JWT_STRATEGY_NAME) {}
