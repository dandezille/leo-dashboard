export type Result<T> = T | Error;

export function tryCatch<T>(action: () => T): Result<T> {
  try {
    return action();
  } catch (error) {
    return error;
  }
}

export function isError<T>(result: Result<T>): result is Error {
  return result instanceof Error;
}
