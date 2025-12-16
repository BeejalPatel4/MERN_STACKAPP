
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDb = require("./config/connectionDb"); // import db connection
const reviewRoutes = require("./routes/review");
const userRoutes = require("./routes/user");
const recipeRoutes = require("./routes/recipe");
const OpenAI = require("openai");

const app = express();

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Connect to MongoDB
(async () => {
  await connectDb();
})();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// OpenAI route
app.post("/agent", async (req, res) => {
  try {
    const userInput = req.body.input;
    const chat = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: userInput }],
    });
    res.json({ reply: chat.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    res.status(500).json({ message: "AI request failed" });
  }
});

// Other routes
app.use("/", userRoutes);
app.use("/recipe", recipeRoutes);
app.use("/", reviewRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
