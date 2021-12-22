import { checkSchema } from 'express-validator';

export const validator = {
  store: checkSchema({
    title: {
      notEmpty: true,
      errorMessage: 'Titulo precisa ser informado'
    },
    url: {
      notEmpty: true,
      errorMessage: 'Url precisa ser informado'
    },
    imageUrl: {
      notEmpty: true,
      errorMessage: 'Imagem Url precisa ser informado'
    },
    newsSite: {
      notEmpty: true,
      errorMessage: 'Site precisa ser informado'
    },
    publishedAt: {
      notEmpty: true,
      errorMessage: 'Data publicação precisa ser informado',
    }
  })
};
