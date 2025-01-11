interface ErrorResponse {
  statusCode: number;
  message: string;
}

export const createErrorResponse = (
  statusCode: number,
  message: string
): ErrorResponse => {
  return { statusCode, message };
};
