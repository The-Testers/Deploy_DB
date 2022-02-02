const connection = require("../db/db");

const createNewComment = (req, res) => {
  const articleId = req.params.article_id;
  const commenter_id = req.token.userId;
  const { comment } = req.body;

  const query = `INSERT INTO comments (comment, commenter_id, article_id) VALUES (?,?,?)`;
  const data = [comment, commenter_id, articleId];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: "something went wrong while creating a new comment",
        err: err,
      });
    }
    // result are the data returned by mysql server
    res.status(201).json({
      success: true,
      massage: "The comment has been created success ",
      results: results,
    });
  });
};

module.exports = {
  createNewComment,
};
