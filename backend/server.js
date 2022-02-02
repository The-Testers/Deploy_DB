const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./db/db");

//routers
const articlesRouter = require("./routes/articles");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const commentsRouter = require("./routes/comments");
const roleRouter = require("./routes/role");

const app = express();

//built-in middleware
app.use(express.json());
app.use(cors());

// router middleware
app.use("/users", usersRouter);
app.use("/articles", articlesRouter);
app.use(authRouter);
app.use(commentsRouter);
app.use(roleRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
