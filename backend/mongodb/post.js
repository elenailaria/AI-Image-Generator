import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    prompt: { type: String, required: true },
    size: { type: String, required: true },
    url: String,
  },
  { timestamps: true }
); // Include timestamps option for automatic date generation

const Image = mongoose.model("Image", imageSchema);

export default Image;
