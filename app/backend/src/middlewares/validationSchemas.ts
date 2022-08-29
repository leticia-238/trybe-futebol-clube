/* eslint-disable @typescript-eslint/naming-convention */
import { checkSchema } from 'express-validator';

export const validateMatchQuery = checkSchema({
  inProgress: {
    isBoolean: { bail: true },
    optional: true,
    errorMessage: 'invalid value for query string parameter "inProgress"',
    toBoolean: true,
  },
}, ['query']);

export const validateMatchBody = checkSchema({
  homeTeam: {
    isInt: { options: { min: 1 }, bail: true },
    toInt: true,
  },
  awayTeam: {
    isInt: { options: { min: 1 }, bail: true },
    toInt: true,
  },
  homeTeamGoals: {
    isInt: { options: { min: 0 }, bail: true },
    toInt: true,
  },
  awayTeamGoals: {
    isInt: { options: { min: 0 }, bail: true },
    toInt: true,
  },
}, ['body']);

export const validateIdParam = checkSchema({
  id: {
    isInt: { options: { min: 1 } },
    toInt: true,
    errorMessage: 'invalid id parameter',
  },
}, ['params']);

export const validateLoginBody = checkSchema({
  email: {
    notEmpty: {
      errorMessage: 'All fields must be filled',
      bail: true,
    },
    isEmail: { bail: true },
    errorMessage: 'Incorrect email or password',
  },
  password: {
    notEmpty: {
      errorMessage: 'All fields must be filled',
      bail: true,
    },
    isLength: { options: { min: 7, max: 100 }, bail: true },
    errorMessage: 'Incorrect email or password',
  },
}, ['body']);

export const validateAuthHeader = checkSchema({
  Authorization: {
    notEmpty: { errorMessage: 'token not found', bail: true },
    isJWT: true,
    errorMessage: 'Token must be a valid token',
  },
}, ['headers']);
