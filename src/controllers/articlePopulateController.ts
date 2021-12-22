import * as ArticleService from '../services/ArticleService';
import { ArticleTypes }from '../models/Article';
import { Request, Response } from 'express';
import Axios from 'axios';

export const populeArticle = async (req: Request, res: Response) => {

  const promise = await Axios.get('https://api.spaceflightnewsapi.net/v3/articles')
  .then( function (response) {

    response.data.map( async (data: ArticleTypes) => {
      await ArticleService.createArticle(data);
    });

    return { status: 200, message: 'Dados populados com sucesso' };
  })
  .catch(function (error) {
    if (error.response) {
      return { status: 400 ,message: 'Erro no servidor' };
    } else if (error.request) {
      return { status: 400 ,message: 'Conexão feita ao servidor mas sem resposta' };
    } else {
      return { status: 500 ,message: 'Erro ao realizar conexão ao servidor' };
    }
  });

  console.log(promise);
  res.status(promise.status).json({ message: promise.message});
}

export const updateArticle = async (req: Request, res: Response) => {

  const promise = await Axios.get('https://api.spaceflightnewsapi.net/v3/articles')
  .then( function (response) {

    response.data.map( async (data: ArticleTypes) => {
      let article = await ArticleService.findOneById(data.id);
      if ( article ){
        await ArticleService.updateArticle(data.id, data);
      }else {
        await ArticleService.createArticle(data);
      }
    });

    return { status: 200, message: 'Dados atualizados com sucesso' };
  })
  .catch(function (error) {
    if (error.response) {
      return { status: 400 ,message: 'Erro no servidor.' };
    } else if (error.request) {
      return { status: 400 ,message: 'Conexão feita ao servidor mas sem resposta' };
    } else {
      return { status: 500 ,message: 'Erro ao realizar conexão ao servidor' };
    }
  });

  console.log(promise);
  res.status(promise.status).json({ message: promise.message});
};

