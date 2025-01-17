export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

function createResponse<T>(
  success: boolean,
  data?: T,
  error?: string
): ApiResponse<T> {
  return {
    success,
    ...(data ? { data } : {}),
    ...(error ? { error } : {}),
  };
}

export default createResponse;
