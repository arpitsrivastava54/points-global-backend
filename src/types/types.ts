import { Multer } from 'multer';
import { Response as ExpressResponse } from 'express';
import { EvaluationType } from './enums';

export interface IAuthRequest extends Request {
  user?: { userId: string; role: 'Member' | 'Owner' };
}

export interface IEvaluationData {
  studentName: string;
  email?: string;
  rollNo: string;
  evaluationType: EvaluationType;
  files: Express.Multer.File[];
}

export interface IGeminiResponse {
  score?: number;
  feedback?: string;
  inputTokens: number;
  outputTokens: number;
}

export interface Response extends ExpressResponse {
  success: (data: {
    statusCode?: number;
    message?: string;
    data?: any;
  }) => void;
}