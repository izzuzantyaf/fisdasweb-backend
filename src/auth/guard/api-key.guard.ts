import { AuthGuard } from '@nestjs/passport';
import { API_KEY_STRAEGY_NAME } from 'src/auth/constant';

export default class ApiKeyGuard extends AuthGuard(API_KEY_STRAEGY_NAME) {}
