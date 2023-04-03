import Validator from 'validator';
import { isEmpty } from './is-empty';

interface PostFields {
  text: string;
}

export const validatePost = (data: PostFields) => {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { max: 1000 })) {
    errors = { text: 'Text should be less than 1000 characters' };
  }

  if (Validator.isEmpty(data.text)) {
    errors = { text: 'Text field is required' };
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
