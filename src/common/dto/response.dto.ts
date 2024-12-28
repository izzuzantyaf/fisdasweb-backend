export class SuccessfulResponseDto {
  message = 'Success';
  data = null;

  constructor(data: any = null, message: string = 'Success') {
    this.data = data;
    this.message = message;
  }
}

export class ErrorResponseDto {
  message = 'Failed';
  data = null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(message: string = 'Failed', error?: any) {
    this.message = message;
  }
}
