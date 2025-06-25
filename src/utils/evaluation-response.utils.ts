export interface EvaluationTableRow {
  "Question Part": string;
  "Student's Answer": string;
  "Correct Answer": string;
  "Evaluation": string;
  "Marks Awarded": string;
}

export interface EvaluationApiResponse {
  table: EvaluationTableRow[];
  overallImpression: string;
  generalFeedback: string[];
} 

export function convertToEvaluationResponse(responseData: string): EvaluationApiResponse {
  try {
    // Extract JSON data from the response string
    const jsonMatch = responseData.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON data found in response");
    }
    
    const jsonStr = jsonMatch[0];
    console.log("Extracted JSON:", jsonStr);
    
    let data;
    try {
      data = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      throw new Error("Invalid JSON format in response");
    }

    // Validate the required fields
    if (!data.table || !Array.isArray(data.table)) {
      throw new Error("Missing or invalid table data in response");
    }
    if (typeof data.overallImpression !== 'string') {
      throw new Error("Missing or invalid overallImpression in response");
    }
    if (!Array.isArray(data.generalFeedback)) {
      throw new Error("Missing or invalid generalFeedback in response");
    }

    // Validate each table row has the required fields
    const validTable = data.table.every((row: any) => {
      return (
        typeof row["Question Part"] === 'string' &&
        typeof row["Student's Answer"] === 'string' &&
        typeof row["Correct Answer"] === 'string' &&
        typeof row["Evaluation"] === 'string' &&
        typeof row["Marks Awarded"] === 'string'
      );
    });

    if (!validTable) {
      throw new Error("Invalid table row format in response");
    }
    
    return {
      table: data.table,
      overallImpression: data.overallImpression,
      generalFeedback: data.generalFeedback
    };
  } catch (error) {
    console.error("Error converting evaluation response:", error);
    // Return a default response structure instead of throwing
    return {
      table: [],
      overallImpression: "Error processing evaluation response",
      generalFeedback: ["Failed to parse the evaluation response. Please try again."]
    };
  }
}

/**
 * Example usage:
 * const responseData = fs.readFileSync('path/to/response.json', 'utf-8');
 * const evaluationResponse = convertToEvaluationResponse(responseData);
 */ 