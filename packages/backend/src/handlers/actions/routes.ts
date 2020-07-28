import express from 'express';

import { asyncHandlerWrapper } from '../../lib/apiHelpers';
import { getBoxProfile } from './getBoxProfile/handler';
import { updateBoxProfileHandler } from './updateBoxProfile/handler';

export const actionRoutes = express.Router();

actionRoutes.post('/getBoxProfile', asyncHandlerWrapper(getBoxProfile));

actionRoutes.post(
  '/updateBoxProfile',
  asyncHandlerWrapper(updateBoxProfileHandler),
);
