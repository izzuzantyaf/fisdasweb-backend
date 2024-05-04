export class SuccessfulResponseDto {
  status = true;
  message: string;
  data = null;

  constructor(message?: string, data?: any) {
    this.message = message;
    this.data = data;
  }
}

export class ErrorResponseDto {
  status = false;
  message: string;
  error = null;

  constructor(message?: string, error?: any) {
    this.message = message;
    this.error = error;
  }
}
