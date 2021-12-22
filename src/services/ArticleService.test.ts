import Article, { ArticleTypes } from '../models/Article';
import * as ArticleService from './ArticleService';
import dotenv from 'dotenv';
import { connect, disconnect, connection } from 'mongoose';
import { doesNotMatch } from 'assert';

dotenv.config();

beforeAll(async () => {
  await connect(process.env.MONGO_DEV_URL as string);
});

afterAll(async () => {
  await disconnect();
  await connection.close();
  await new Promise<void>(resolve => setTimeout(() => resolve(), 200));
});

describe('Testing article service', () => {

  let data = {
    id: 1,
    title: 'SpaceX vs. the world',
    url: 'https://spacenews.com/spacex-vs-the-world/',
    imageUrl: 'https://spacenews.com/wp-content/uploads/2021/12/spacex-starship-super...',
    newsSite: 'SpaceNews',
    publishedAt: '2021-12-18T14:46:43.000Z'
  } as ArticleTypes

  it('should create a new article', async () => {
    const newArticle = await ArticleService.createArticle(data);
    expect(newArticle).not.toBeInstanceOf(Error);
    expect(newArticle).toHaveProperty('id');
    expect(newArticle.title).toBe(data.title);
  });

  it('should return articles', async () => {
    const articles = await ArticleService.all();
    expect(articles.length).toBeGreaterThanOrEqual(1);
    for(let i in articles) {
      expect(articles[i]).toBeInstanceOf(Article);
    }
  });

  it('should return a article', async () => {
    const article = await ArticleService.findOneById(1);
    expect(article).toBeInstanceOf(Article);
  });

  it('should update a article', async () => {
    data.title = 'teste';
    const updatedArticle = await ArticleService.updateArticle(1, data);
    expect(updatedArticle).not.toBeInstanceOf(Error);
    expect(updatedArticle).toHaveProperty('id');
    expect(updatedArticle.title).toBe(updatedArticle.title);
  })

  it('should delete a article', async () => {
    const deletedArticle = await ArticleService.deleteArticle(1);
    expect(deletedArticle).toBeInstanceOf(Article);
    const article = await ArticleService.findOneById(1);
    expect(article).toBeNull();
  })
})