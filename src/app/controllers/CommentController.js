import * as Yup from 'yup';
import Comment from '../models/Comment';
import Article from '../models/Article';

class CommentController {
  /**
   * Get all comments, able to use pagination passing the params "page" and "page_size"
   * default page_size = 10
   * @async
   * @param req Request
   * @param res Response
   * @returns {JSON} Comments
   */
  async index(req, res) {
    const page = req.query.page || 1;
    const page_size =
      (req.query.page_size > 100 ? 100 : req.query.page_size) || 10;

    const comments = await Comment.findAll({
      limit: page_size,
      offset: page_size * page - page_size,
    });

    return res.json(comments);
  }

  /**
   * Get comments of a article
   * @async
   * @param req Request
   * @param res Response
   * @returns {JSON} Article
   */
  async show(req, res) {
    const article = await Article.findByPk(req.params.article_id);

    if (!article) {
      return res.status(400).json({ error: 'Article not found' });
    }

    const comments = await Comment.findAll({
      where: { article_id: req.params.article_id },
    });

    return res.json(comments);
  }

  /**
   * Create a Comment
   * @async
   * @param req Request
   * @param res Response
   * @returns {JSON} Comment
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      text: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // verify if the article exists
    const article = await Article.findOne({
      where: { id: req.params.article_id },
    });

    if (!article) {
      return res.status(400).json({ error: 'Article not found' });
    }

    const comment = await Comment.create({
      ...req.body,
      article_id: req.params.article_id,
      user_id: req.userId,
    });

    return res.json(comment);
  }

  /**
   * Update a Comment
   * @async
   * @param req Request
   * @param res Response
   * @returns {JSON} Comment
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      text: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      return res.status(400).json({ error: 'Comment not found' });
    }

    const { id, text } = await comment.update({
      text: req.body.text,
    });

    return res.json({ id, text });
  }

  /**
   * Delete a comment
   * @async
   * @param req
   * @param res
   */
  async delete(req, res) {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      return res.status(400).json({ error: 'Comment not found' });
    }

    if (comment.user_id !== req.userId) {
      return res.status(401).json({ error: 'You cannot delete this comment' });
    }

    await comment.destroy();

    return res.json({ message: 'Comment deleted' });
  }
}

export default new CommentController();
