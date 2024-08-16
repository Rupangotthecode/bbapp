import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.js";
import scheduleRoutes from "./routes/schedule.js";
import scoreboardRoutes from "./routes/scoreboard.js";

import dotenv from "dotenv";

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.send("This is bbapp API");
});

app.use("/user", userRoutes);
app.use("/schedule", scheduleRoutes);
app.use("/scoreboard", scoreboardRoutes)

mongoose.set("strictQuery", true);

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.MONGO_URL;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
