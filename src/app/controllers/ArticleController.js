import * as Yup from 'yup';
import slug from 'slug';
import Article from '../models/Article';

class SessionController {
  /**
   * Get all articles, able to use pagination passing the params "page" and "page_size"
   * default page_size = 10
   * @async
   * @param req Request
   * @param res Response
   * @returns {JSON} Articles
   */
  async index(req, res) {
    const page = req.query.page || 1;
    const page_size =
      (req.query.page_size > 100 ? 100 : req.query.page_size) || 10;

    const articles = await Article.findAll({
      limit: page_size,
      offset: page_size * page - page_size,
    });

    return res.json(articles);
  }

  /**
   * Get article by permalink
   * @async
   * @param req Request
   * @param res Response
   * @returns {JSON} Article
   */
  async show(req, res) {
    const article = await Article.findOne({
      where: { permalink: req.params.permalink },
    });

    if (!article) {
      return res.status(400).json({ error: 'Article not found' });
    }

    return res.json(article);
  }

  /**
   * Create a Article
   * default sets the log in user as author or send 'users' in the body as author(s)
   * @async
   * @param req Request
   * @param res Response
   * @returns {JSON} Article
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      subtitle: Yup.string().required(),
      text: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    // Verify if the permalink is available
    const permalink = slug(req.body.title, { lower: true });
    const permalinkExists = await Article.findOne({
      where: { permalink },
    });

    if (permalinkExists) {
      return res.status(400).json({
        error: 'An article with the same title and permalink already exists',
      });
    }

    const article = await Article.create({
      ...req.body,
      permalink,
    });

    if (req.body.users) {
      article.setUsers(req.body.users);
      return res.json(article);
    }

    article.setUsers([req.userId]);
    return res.json(article);
  }

  /**
   * Update a Article
   * @async
   * @param req Request
   * @param res Response
   * @returns {JSON} Article
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      subtitle: Yup.string().required(),
      text: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const article = await Article.findByPk(req.params.id);

    if (!article) {
      return res.status(400).json({ error: 'Article not found' });
    }

    const { id, title, subtitle, text } = await article.update({
      title: req.body.title,
      subtitle: req.body.subtitle,
      text: req.body.text,
    });

    return res.json({ id, title, subtitle, text });
  }

  /**
   * Delete a Article
   * @async
   * @param req
   * @param res
   */
  async delete(req, res) {
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      return res.status(400).json({ error: 'Article not found' });
    }

    await article.destroy();

    return res.json({ message: 'Article deleted' });
  }
}

export default new SessionController();
