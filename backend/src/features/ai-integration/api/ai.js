import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config({ path: "../.env" }); // load .env one folder up

const app = express();
app.use(cors());
app.use(express.json()); // allows JSON body parsing

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/recipe", async (req, res) => {
  const { ingredients } = req.body;

  const SYSTEM_PROMPT = `
  You are an assistant that receives a list of ingredients and suggests a recipe.
  Format your response in markdown.
  `;

  try {
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredients.join(", ")}.` },
      ],
    });

    res.json({ recipe: response.output_text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating recipe." });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
