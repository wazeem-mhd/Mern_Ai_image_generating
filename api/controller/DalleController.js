import OpenAi from "openai";
import dotenv from "dotenv";

dotenv.config();

const openAi = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
});

export const sampleDemo = (req, res) => {
  return res.send("welcome to Ai image app");
};

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    // console.log(prompt);
    const aiResponse = await openAi.images.generate({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiResponse.data[0].b64_json;

    res.status(200).json({ image });
  } catch (error) {
    console.log(error);
  }
};
