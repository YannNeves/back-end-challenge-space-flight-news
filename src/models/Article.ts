import { Schema, model, connection } from 'mongoose';

export type ArticleTypes = {
  id: number,
  featured: boolean,
  title: string,
  url: string,
  imageUrl: string,
  newsSite: string,
  summary: string,
  publishedAt: string,
  launches: [
    {
      id: string,
      provider: string
    },
  ],
  events: [
    {
      id: number,
      provider: string
    }
  ],
}


const modelSchema = new Schema<ArticleTypes>({
  id: Number,
  featured: { type: Boolean, default: false},
  title: String,
  url: String,
  imageUrl: String,
  newsSite: String,
  summary: String,
  publishedAt: String,
  launches: [
    {
      id: String,
      provider: String
    }
  ],
  events: [
    {
      id: Number,
      provider: String
    }
  ]
})

const modelName: string  = 'Article';

export default ( connection && connection.models[modelName] ) ?
  connection.models[modelName]
  :
  model<ArticleTypes>(modelName, modelSchema)
;
