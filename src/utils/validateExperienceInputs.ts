import Validator from 'validator';
import { isEmpty } from './is-empty';

interface ExperienceInput {
  title: string;
  company: string;
  location: string;
  from: string;
  to: string;
  current: boolean;
  description: string;
}

interface error {
  [key: string]: string;
}

export const validateExperienceInput = (data: ExperienceInput) => {
  const errors: error = {};

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Job title field is required';
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
