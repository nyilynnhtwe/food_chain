// utils/response.ts
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
  }
  
  /**
   * Create a general response for API endpoints
   * @param success - Whether the response indicates a successful operation
   * @param data - Data payload to include (optional)
   * @param error - Error message to include (optional)
   * @returns ApiResponse object
   */
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
  
  export  default createResponse;