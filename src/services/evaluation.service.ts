import Evaluation from '../models/evaluation.model';

class EvaluationService {
  getEvaluationBySubmissionId = async (submissionId: string) => {
    const evaluation = await Evaluation.findOne({ submissionId });
    return evaluation;
  }
}

export const evaluationService = new EvaluationService();