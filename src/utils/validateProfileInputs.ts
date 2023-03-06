import Validator from 'validator';
import { isEmpty } from './is-empty';

interface ProfileInput {
  company: string;
  website: string;
  location: string;
  status: string;
  skills: any;
  bio: string;
  githubusername: string;
}

interface error {
  [key: string]: string;
}

export const validateProfileInputs = (data: ProfileInput) => {
  const errors: error = {};

  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }

  if (Validator.isEmpty(data.website)) {
    errors.website = 'Website field is required';
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = 'Location field is required';
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  }

  if (Validator.isEmpty(data.bio)) {
    errors.bio = 'Bio field is required';
  }

  if (Validator.isEmpty(data.githubusername)) {
    errors.githubusername = 'Github Username field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
