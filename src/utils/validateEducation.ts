import Validator from 'validator';
import { isEmpty } from './is-empty';

interface EducationInput {
  school: string;
  degree: string;
  fieldofstudy: string;
  from: string;
  to: string;
  current: boolean;
  description: string;
}

interface error {
  [key: string]: string;
}

export const validateEducationInput = (data: EducationInput) => {
  const errors: error = {};

  if (Validator.isEmpty(data.school)) {
    errors.school = 'School field is required';
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required';
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Field of study field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
