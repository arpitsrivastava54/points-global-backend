import { GoogleGenAI } from "@google/genai";
import { convertToEvaluationResponse } from "./evaluation-response.utils";
import { config } from "../configs/config";
import fs from 'fs';
import path from "path";

const ai = new GoogleGenAI({
  apiKey: config.gemini.apiKey || 'AIzaSyBsXss656hnvhlLtKpLoWWIEc0vf-TDzic',
});

export async function evaluationWithGemini() {
  const url = "https://ms-pb.s3.ap-south-1.amazonaws.com/submissions/68591b4df5ea9f0b81099a6c/1750767929236_QPA.pdf";

  console.log("evaluation started ...");

  try {
    const answerFile = await fetch(url).then(res => res);

    const answerBlob = await answerFile.blob()

    // Upload files to Gemini
    const uploadedAnswer = await ai.files.upload({ file: answerBlob });

    console.log("uploadedAnswer ==> ", uploadedAnswer);


    // Prepare the prompt
    const prompt = `Evaluate this paper, for a student , evaluation should be very precise. Consider you are the best evaluator who even picks up small faults. consider the marking scheme and Please evaluate the answers and return the result in table format and summary style. The table should have columns: Question Part, Student's Answer, Correct Answer/Commentary, Evaluation, Marks Awarded (Estimate). overall_impression: Overall assessment of the student's performance, general_feedback: General feedback on the student's performance .
    
    return type will be json and structure will be = {
      table: EvaluationTableRow[];
      overallImpression: string;
      generalFeedback: string[];
    }
    
      export interface EvaluationTableRow {
        "Question Part": string;
        "Student's Answer": string;
        "Correct Answer": string;
        "Evaluation": string;
        "Marks Awarded": string // obtainedMarks/totalMarks;
      }
    `;

    // Prepare contents for Gemini
    const model = 'gemini-2.0-flash';
    const contents = [
      {
        role: "user",
        parts: [
          {
            fileData: {
              fileUri: uploadedAnswer.uri,
              mimeType: uploadedAnswer.mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    ];

    console.log("contents ==> ", contents);
    const response = await ai.models.generateContent({
      model,
      contents
    });

    console.log("response ==> ", response);

    // Save raw response to public/evaluations
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `evaluation-${timestamp}.txt`;
    const responseFileName = `response-${timestamp}.json`;
    const dir = path.join(process.cwd(), 'public', 'evaluations');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, "raw-response"+filename);
    const responseFilePath = path.join(dir, responseFileName);
    fs.writeFileSync(filePath, JSON.stringify(response, null, 2));

    // // Parse Gemini response
    const responseText = response.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!responseText) throw new Error("No response text received from Gemini API");

    // Convert the response using our utility function
    const evaluationData = convertToEvaluationResponse(responseText);

    // Save the parsed response
    fs.writeFileSync(responseFilePath, JSON.stringify(evaluationData, null, 2));

    console.log("evaluation completed ...");
  } catch (error){
    console.log("evaluation failed ... , error ==> ", error);
  }
}

evaluationWithGemini();

// Helper functions to transform the data
