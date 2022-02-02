const express = require("express");
const {
  getAllArticles,
  getArticlesByAuthor,
  getArticleById,
  createNewArticle,
  updateArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
} = require("../controllers/articles");

const authentication = require("../middlewares/authentication");

const articlesRouter = express.Router();

articlesRouter.get("/", getAllArticles);
// artecles/search_1?auther=1
articlesRouter.get("/search_1", getArticlesByAuthor);
articlesRouter.get("/search_2", getArticleById);
articlesRouter.post("/", authentication, createNewArticle);
articlesRouter.put("/:id", updateArticleById);
articlesRouter.delete("/", deleteArticlesByAuthor);
articlesRouter.delete("/:id", deleteArticleById);

module.exports = articlesRouter;
