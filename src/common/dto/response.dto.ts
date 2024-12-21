export class SuccessfulResponseDto {
  message = 'Success';
  data = null;

  constructor(data: any = null) {
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
