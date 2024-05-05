export class SuccessfulResponseDto {
  status = true;
  message: string = null;
  data = null;

  constructor(message: string = 'success', data?: any) {
    this.message = message;
    this.data = data;
  }
}

export class ErrorResponseDto {
  status = false;
  message: string = null;
  error = null;

  constructor(message: string = 'failed', error?: any) {
    this.message = message;
    this.error = error;
  }
}
