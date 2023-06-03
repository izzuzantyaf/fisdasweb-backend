interface AppResponseDtoInterface {
  isSuccess: boolean;
  message: string;
  data: any;
}

export class SuccessfulResponseDto implements AppResponseDtoInterface {
  isSuccess = true;
  message: string;
  data: any;

  constructor(message = 'Sukses', data?: any) {
    this.message = message;
    this.data = data;
  }
}

export class ErrorResponseDto implements AppResponseDtoInterface {
  isSuccess = false;
  message: string;
  data: null;

  constructor(message = 'Gagal', data?: any) {
    this.message = message;
    this.data = data;
  }
}
