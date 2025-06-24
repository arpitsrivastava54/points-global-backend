import { Response } from "express";

export const apiResponse = (res: Response, data:{
  statusCode?: number;
  message?: string;
  data?: any;
}) => {
  res.status(data.statusCode || 200).json({
    success: true,
    message: data.message || 'Success',
    data: data.data || null,
  })
}