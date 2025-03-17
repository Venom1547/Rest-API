require("dotenv").config();
const express = require("express");
const cors=require("cors");
const app = express();
const userRouter = require("./api/users/user.router");

app.use(express.json());
app.use("/api/users", userRouter);
app.use(cors({
  origin: 'https://your-frontend.vercel.app', // Replace with your deployed frontend domain
  methods: ['GET', 'POST'],
  credentials: true
}));

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
