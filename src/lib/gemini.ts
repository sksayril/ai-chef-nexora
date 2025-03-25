import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyD7wUqCzkLVS2ELkAXdxgtW_O5IIC3Ct7g');

export async function generateRecipe(ingredients: string[], cuisineType: string): Promise<{
  title: string;
  ingredients: string[];
  steps: string[];
  tips: string[];
}> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

  const prompt = `Create a recipe in English using these ingredients: ${ingredients.join(', ')} in ${cuisineType} style.
    Please format the response exactly as follows, maintaining valid JSON structure:
    {
      "title": "Recipe Name",
      "ingredients": ["ingredient 1", "ingredient 2"],
      "steps": ["step 1", "step 2"],
      "tips": ["tip 1", "tip 2"]
    }
    
    Important:
    - Keep all text in English
    - Ensure each step is clear and concise
    - Include exact measurements
    - Make sure the JSON is properly formatted with no trailing commas
    - Each array should have at least 2 items
    - All strings must be properly escaped`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean and parse the response
    let jsonStr = text.trim();
    
    // Remove any markdown code blocks if present
    jsonStr = jsonStr.replace(/```json\n?|\n?```/g, '');
    
    // Remove any potential leading/trailing whitespace or newlines
    jsonStr = jsonStr.trim();

    try {
      const recipeData = JSON.parse(jsonStr);

      // Validate the response structure
      if (!recipeData.title || !Array.isArray(recipeData.ingredients) || 
          !Array.isArray(recipeData.steps) || !Array.isArray(recipeData.tips)) {
        throw new Error('Invalid recipe data structure');
      }

      return {
        title: recipeData.title,
        ingredients: recipeData.ingredients,
        steps: recipeData.steps,
        tips: recipeData.tips
      };
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      throw new Error('Failed to parse recipe data. Please try again.');
    }
  } catch (error) {
    console.error('Recipe generation error:', error);
    throw new Error('Failed to generate recipe. Please try again.');
  }
}