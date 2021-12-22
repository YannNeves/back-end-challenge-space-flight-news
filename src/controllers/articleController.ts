import { Request, Response } from 'express';
import * as ArticleService from '../services/ArticleService';
import { validationResult } from 'express-validator';

export const getAll = async (req: Request, res: Response) => {
  let skip = parseInt((req.query as any).skip);
  let limit = parseInt((req.query as any).limit);

  let article;

  if ( skip && limit ) {
    article =  await ArticleService.allPaginate(skip, limit);
  } else {
    article =  await ArticleService.all();
  }

  res.status(200).json({ article });
}

export const getOne = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  
  const article = await ArticleService.findOneById(id);

  res.status(200).json({ article });
}

export const store = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ error: errors.mapped() });
    return;
  }

  const newArticle = await ArticleService.createArticle( req.body );

  if (newArticle instanceof Error) {
    res.status(404).json({ message: 'Erro ao atualizar'});
  } else {
    res.status(200).json({ message: 'Cadastrado com sucess', newArticle });
  }
}

export const update = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ error: errors.mapped() });
    return;
  }

  const updatedArticle = await ArticleService.updateArticle(id, req.body);
 
  if (updatedArticle instanceof Error) {
    res.status(404).json({ message: 'Erro ao atualizar'});
  } else {
    res.status(200).json({ message: 'Atualizado com sucesso', updatedArticle});
  }
}

export const remove = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  
  const deletedArticle = await ArticleService.deleteArticle(id);

  if (deletedArticle instanceof Error) {
    res.status(404).json({ message: 'Erro ao deletar' });
  } else {
    if (deletedArticle) {
      res.status(200).json({ message: 'Deletado com sucesso' });
    } else {
      res.status(404).json({ message: 'Erro ao deletar' });
    }
  } 
}