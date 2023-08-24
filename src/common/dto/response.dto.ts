enum AppResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

interface AppResponseDtoInterface {
  status: AppResponseStatus;
  message: string;
  data: any;
}

export class SuccessfulResponseDto implements AppResponseDtoInterface {
  status = AppResponseStatus.SUCCESS;
  message: string;
  data: any;

  constructor(message = 'Sukses', data?: any) {
    this.message = message;
    this.data = data;
  }
}

export class ErrorResponseDto implements AppResponseDtoInterface {
  status = AppResponseStatus.ERROR;
  message: string;
  data: null;

  constructor(message = 'Gagal', data?: any) {
    this.message = message;
    this.data = data;
  }
}
