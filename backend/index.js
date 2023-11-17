import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const configuration = new Configuration({
   apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
   return res.status(200).send("Server is up");
});

app.post("/generate", async (req, res) => {
   const { prompt, size } = req.body;
   //    validation
   if (!prompt || !size) {
      return res.status(400).send("Bad Request");
   }
   try {
      const response = await openai.createImage({
         prompt,
         size,
         n: 1,
      });
      const image_url = response.data.data[0].url;

      return res.status(200).send({
         src: image_url,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).send({ error });
   }
});

const port = process.env.PORT || 8200;

app.listen(port, () => {
   console.log(`Server is listening on port ${port}`);
});