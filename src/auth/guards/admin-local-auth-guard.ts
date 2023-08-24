import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ADMIN_LOCAL_STRATEGY_NAME } from '../constants';

@Injectable()
export class AdminLocalAuthGuard extends AuthGuard(ADMIN_LOCAL_STRATEGY_NAME) {}
