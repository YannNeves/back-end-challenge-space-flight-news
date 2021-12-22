import { Router, Request, Response } from 'express';
import { validator } from '../validators/ArticleValidator';
import * as ArticleController from '../controllers/articleController';
import * as ArticlePopulatePopulate from '../controllers/articlePopulateController';
import Cron from 'node-cron';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: "Back-end Challenge 2021 🏅 - Space Flight News" });
});

router.get('/articles', ArticleController.getAll);
router.get('/articles/:id', ArticleController.getOne);
router.post('/articles', validator.store, ArticleController.store);
router.put('/articles/:id', validator.store, ArticleController.update);
router.delete('/articles/:id', ArticleController.remove);

router.get('/articles-populate', ArticlePopulatePopulate.populeArticle);

Cron.schedule("0 0 9 * * *", () => {
  router.get('/articles-update', ArticlePopulatePopulate.updateArticle);
});

export default router;