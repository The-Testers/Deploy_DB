const connection = require("../db/db");

const getAllArticles = (req, res) => {
  const query = `SELECT * FROM articles WHERE is_deleted=0;`;
  // use the query method to execute a query
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    // result are the data returned by mysql server
    res.status(200).json({
      success: true,
      massage: "All the articles",
      results: result,
    });
  });
};

const getArticlesByAuthor = (req, res) => {
  const author_id = req.query.id;

  const query = `SELECT * FROM articles WHERE author_id=? AND is_deleted=0;`;
  const data = [author_id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: "The Author Not Found",
        err: err,
      });
    }

    // result are the data returned by mysql server
    res.status(200).json({
      success: true,
      massage: `All the articles for the author: ${author_id}`,
      results: results,
    });
  });
};

const getArticleById = (req, res) => {
  const id = req.query.id;

  const query = `SELECT title,description,firstname,author_id FROM users INNER JOIN articles ON users.id=articles.author_id WHERE articles.id=?
  AND articles.is_deleted=0;`;
  const data = [id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!results.length) {
      res.status(404).json({
        success: false,
        massage: "The Article Not found",
      });
    }
    // result are the data returned by mysql server
    res.status(200).json({
      success: true,
      massage: `The article ${id}`,
      results: results,
    });
  });
};

const createNewArticle = (req, res) => {
  const { title, description } = req.body;
  const author_id = req.token.userId;
  const query = `INSERT INTO articles (title, description, author_id) VALUES (?,?,?);`;
  const data = [title, description, author_id];

  connection.query(query, data, (err, results) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    // result are the data returned by mysql server
    res.status(200).json({
      success: true,
      massage: "Article created",
      results: results,
    });
  });
};

const updateArticleById = (req, res) => {
  const { title, description, author_id } = req.body;
  const id = req.params.id;

  const query = `UPDATE articles SET title=?, description=?, author_id=? WHERE id=?;`;

  const data = [title, description, author_id, id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: `Server error`,
        err: err,
      });
    }
    if (results.changedRows == 0) {
      res.status(404).json({
        success: false,
        massage: `The Article: ${id} is not found`,
        err: err,
      });
    }
    // result are the data returned by mysql server
    res.status(201).json({
      success: true,
      massage: `Article updated`,
      results: results,
    });
  });
};

const deleteArticleById = (req, res) => {
  const id = req.params.id;

  const query = `UPDATE articles SET is_deleted=1 WHERE id=?;`;

  const data = [id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!results.changedRows) {
      return res.status(404).json({
        success: false,
        massage: `The Article: ${id} is not found`,
        err: err,
      });
    }
    // result are the data returned by mysql server
    res.status(200).json({
      success: true,
      massage: `Succeeded to delete article with id: ${id}`,
      results: results,
    });
  });
};

const deleteArticlesByAuthor = (req, res) => {
  const author_id = req.body.author;

  const query = `UPDATE articles SET is_deleted=1 WHERE author_id=?;`;
  const data = [author_id];

  connection.query(query, data, (err, results) => {
    if (err) {
      res.status(404).json({
        success: false,
        massage: `Not Found articles for this author => ${author_id}`,
        err: err,
      });
    }
    if (!results.changedRows) {
      return res.status(404).json({
        success: false,
        massage: `The Author not found`,
        err: err,
      });
    }
    // result are the data returned by mysql server
    res.status(200).json({
      success: true,
      massage: `Success delete all the articles for the author => ${author_id}`,
      results: results,
    });
  });
};
module.exports = {
  getAllArticles,
  getArticlesByAuthor,
  getArticleById,
  createNewArticle,
  updateArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
};
