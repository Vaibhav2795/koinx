import { ErrorResponse } from "../interface";

export const createErrorResponse = (
  statusCode: number,
  message: string
): ErrorResponse => {
  return { statusCode, message };
};
