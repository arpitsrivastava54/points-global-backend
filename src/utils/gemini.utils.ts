import { GoogleGenAI } from "@google/genai";
import { convertToEvaluationResponse, EvaluationApiResponse } from "./evaluation-response.utils";
import { config } from "../configs/config";
import fs from 'fs';
import path from "path";
import { EvaluationType } from "../types/enums";
import { getBasePrompt, getResponseType } from "./evaluation.helper";

const ai = new GoogleGenAI({
  apiKey: config.gemini.apiKey || 'AIzaSyBsXss656hnvhlLtKpLoWWIEc0vf-TDzic',
});

export async function evaluationWithGemini(
  evaluationType: EvaluationType,
  files: string[]
): Promise<EvaluationApiResponse | null> {
  try {
    console.log(`Starting evaluation for type: ${evaluationType}`);

    // Upload all files to Gemini
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const answerFile = await fetch(file);
        const answerBlob = await answerFile.blob();

        const uploaded = await ai.files.upload({
          file: answerBlob
        });

        return {
          uri: uploaded.uri,
          mimeType: uploaded.mimeType,
        };
      })
    );

    console.log(`Uploaded ${uploadedFiles.length} files to Gemini`);

    // Prepare the prompt using helper functions
    const basePrompt = getBasePrompt(evaluationType);
    const responseType = getResponseType();

    const prompt = `${basePrompt}.

    Note : if there is something which you are not able to evaluate | extract text | confusing then , please return the response as "Not Applicable" into that field.
    
    - You are given the following files for evaluation:
      

    ${responseType}
    `;


    // paste this line in the prompt after the (you are given the following files for evaluation:)
    // ${uploadedFiles.map(file => `- ${file.label} file: refer to it as "${file.label}" in your evaluation.`).join('\n')}

    // Prepare contents for Gemini
    const model = 'gemini-2.0-flash';
    const contents = [
      {
        role: "user",
        parts: [
          ...uploadedFiles.map((file) => ({
            fileData: {
              fileUri: file.uri,
              mimeType: file.mimeType,
            }
          })),
          {
            text: prompt,
          },
        ],
      },
    ];

    console.log("Sending request to Gemini...");
    const response = await ai.models.generateContent({
      model,
      contents
    });

    console.log("Received response from Gemini");

    // Save raw response to public/evaluations
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `evaluation-${evaluationType}-${timestamp}.txt`;
    const responseFileName = `${evaluationType}.json`;
    const dir = path.join(process.cwd(), 'public', 'evaluations');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, "raw-response-" + filename);
    const responseFilePath = path.join(dir, responseFileName);
    // fs.writeFileSync(filePath, JSON.stringify(response, null, 2));

    // Parse Gemini response
    const responseText = response.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!responseText) throw new Error("No response text received from Gemini API");

    // Convert the response using our utility function
  const evaluationData = convertToEvaluationResponse(responseText);
    const finalResponse = {
      ...evaluationData,
      metadata: {
        tokensUsed: response.usageMetadata?.totalTokenCount || 0,
        model: model,
        files: uploadedFiles,
        evaluationType: evaluationType,
      }
    }

    // Save the parsed response
    fs.writeFileSync(responseFilePath, JSON.stringify(finalResponse, null, 2));

    console.log("Evaluation completed successfully");
    return finalResponse;

  } catch (error) {
    console.error("Evaluation failed:", error);
    return null;
  }
}
