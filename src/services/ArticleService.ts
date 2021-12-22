import Article, { ArticleTypes } from '../models/Article';
import { isValidObjectId } from 'mongoose';

export const all = async () => {
  return await Article.find({});
}

export const allPaginate = async (skip: number, limit: number) => {
  return await Article.find({}).skip(skip).limit(limit);
}

export const findOneById = async ( id: string|number) => {
  const query = await queryPatern(id);
  return await Article.findOne(query);
};

export const createArticle = async (data: ArticleTypes) => {
  return await Article.create( data );
}

export const updateArticle = async (id: string|number, body: ArticleTypes) => {
  const query = await queryPatern(id);
  return await Article.findOneAndUpdate(query, body, {new: true});
}

export const deleteArticle = async (id: string|number) => {
  const query = await queryPatern(id);
  return await Article.findOneAndDelete(query);
}

const queryPatern = async (id: string|number) => {
  if (isValidObjectId(id)) {
    return { '_id': id };
  } else {
    return { 'id': id };
  }
}
