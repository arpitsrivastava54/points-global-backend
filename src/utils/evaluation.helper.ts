import { EvaluationType } from "../types/enums";

export function getBasePrompt(type: EvaluationType): string {
  const prompts: Record<EvaluationType, string> = {
    QP_AFR: `
- Evaluate the student's answers written on AFR (supplement sheet).
- Use the corresponding questions from QP (question paper without answer space).
- Evaluate strictly based on content correctness using your own understanding.
- Do not apply any marking scheme or provide partial marks.
`,

    QP_AFR_MS: `
- Evaluate the student's answers written on AFR (supplement sheet).
- Use the corresponding questions from QP (question paper without answer space).
- Evaluate strictly based on content correctness using your own understanding.
- apply any MS (marking scheme) which i will provide you (it can be answer keys or any other marking scheme).
`,

    QPA: `
- Evaluate the QPA(Question Paper with Answer Space) file, where the student has written answers directly within the question paper.
- Review answers for content clarity, relevance, and correctness.
- Do not apply any external marking scheme or grading key.
- Use your own understanding and knowledge to evaluate the answers.
`,

    QPA_MS: `
- Evaluate the QPA(Question Paper with Answer Space) file, where the student has written answers directly within the question paper.
- Review answers for content clarity, relevance, and correctness.
- Use the provided MS (marking scheme) to grade each response.
- Follow exact marking instructions and ensure accurate score assignment.
- Consider both completeness and correctness of responses.
`,

    QPM: `
- Evaluate QPM, an MCQ-type question paper where the student has marked choices directly.
- Use your own subject knowledge to determine the correct answers.
- Student may mark answers via any method (tick, circle, underline, etc.).
- Ignore all hand-written explanations or notes — only evaluate the selected option.
- No marking scheme is provided — evaluate based on correctness alone.
`,

    QPM_MS: `
- Evaluate QPM, an MCQ-type question paper where the student has marked choices directly.
- Use the provided MS (marking scheme) — it may be a list of correct answers (e.g., "1. A", "2. B") or a full schema.
- Apply the MS strictly and use your understanding where interpretation is required.
- Student may mark answers using tick, circle, or any marking method on the question.
- Ignore all hand-written content other than marked options.
`,

    QP_AMO: `
- Evaluate AMO (Answer Marked on omr sheet), the OMR-like sheet where the student marked MCQ responses .
- Use the corresponding questions from QP to identify what was asked.
- Do not use a marking scheme — apply your own knowledge to assess the correctness of each marked option.
- Evaluate only the selected answers — ignore any annotations or markings outside the response area.
- Ignore all hand-written content or any kind of pen written content.

- Note :- omr pattern will be like (there will be four options ex:- a b c d and student will dark the option circle now you need to mindfully check that which circle student has dark so you will consider it as selected option of student)
`,

    QP_AMO_MS: `
- Evaluate AMO (Answer Marked on omr sheet), the OMR-like sheet where the student marked MCQ responses .
- Use the corresponding questions from QP to identify what was asked.
- Evaluate only the selected answers — ignore any annotations or markings outside the response area.
- Ignore all hand-written content or any kind of pen written content.

- Use the provided MS (marking scheme) — it may be a list of correct answers (e.g., "1. A", "2. B") or a full schema.
- Apply the MS strictly and use your understanding where interpretation is required.

- Note :- omr pattern will be like (there will be four options ex:- a b c d and student will dark the option circle now you need to mindfully check that which circle student has dark so you will consider it as selected option of student)
`,

    QP_AMP: `
- Evaluate AMP (Multiple Choice Question on supplement sheet), where the student wrote MCQ answers on a plain supplement sheet it will be something like this ex :- 1 a | 2 b | 4 .
- Use the questions from QP (question paper) to match and verify selected answers.
- Do not use a marking scheme — use your own knowledge to assess correctness.
- Ignore any hand-written reasoning or explanations — only match the indicated option.
`,

    QP_AMP_MS: `
- Evaluate AMP (Multiple Choice Question on supplement sheet), where the student wrote MCQ answers on a plain supplement sheet it will be something like this ex :- 1 a | 2 b | 4 .
- Use the questions from QP (question paper) to match and verify selected answers.
- Ignore any hand-written reasoning or explanations — only match the indicated option.
- Mark strictly based on MS (marking scheme OR answer keys which will be something like ex :- 1 a | 2 b | 4)
`
  };

  return prompts[type] || "Invalid type. Please provide a valid format like 'QPA', 'QP_AFR_MS', etc.";
}

export function getResponseType() {
  const returnType = `
  Please evaluate the answers and return the result in table format and summary style. The table should have columns: Question Part, Student's Answer, Correct Answer/Commentary, Evaluation, Marks Awarded (Estimate). overall_impression: Overall assessment of the student's performance, general_feedback: General feedback on the student's performance .

  Note : Feedback will be detailed evaluation which students knows what mistake he has done and if there is something which you are not able to evaluate | extract text | confusing then , please return the response as "Not Applicable" into that field.
   return type will be json and structure will be = {
      table: EvaluationTableRow[];
      overallImpression: string;
      generalFeedback: string[];
    }
    
      export interface EvaluationTableRow {
        "Question Part": string;
        "Student's Answer": string;
        "Correct Answer": string;
        "Evaluation Feedback": string;
        "Marks Awarded": string // obtainedMarks/totalMarks;
      }
  `
  return returnType;
}