import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ArticleController from './app/controllers/ArticleController';
import CommentController from './app/controllers/CommentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/', UserController.update);
routes.delete('/users/', UserController.delete);

routes.get('/articles', ArticleController.index);
routes.get('/articles/:permalink', ArticleController.show);
routes.post('/articles/', ArticleController.store);
routes.put('/articles/:id', ArticleController.update);
routes.delete('/articles/:id', ArticleController.delete);

routes.get('/comments', CommentController.index);
routes.get('/comments/article/:article_id', CommentController.show);
routes.post('/comments/article/:article_id', CommentController.store);
routes.put('/comments/:id', CommentController.update);
routes.delete('/comments/:id', CommentController.delete);

export default routes;
