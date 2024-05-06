export enum ResultCode {
    Success = 0,
    Forbidden = 1,
    BadRequest = 2,
    NotFound
}

export const handleSuccessResult = <T>(data: T): Result<T> => {
  return {
    data,
    resultCode: ResultCode.Success,
  }
}
export const handleForbiddenResult = (message: string): Result<null> => {
  return {
    data: null,
    resultCode: ResultCode.Forbidden,
    errorMessage: message,
  }
}
export const handleNotFoundResult = (message: string): Result<null> => {
  return {
    data: null,
    resultCode: ResultCode.NotFound,
    errorMessage: message,
  }
}
export type Result<T> = {
  data: T,
  resultCode: ResultCode,
  errorMessage?: string,
}