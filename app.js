require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");

app.use(express.json());
app.use("/api/users", userRouter);

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
