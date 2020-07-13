import express from 'express';

import { asyncHandlerWrapper } from '../../lib/apiHelpers';

import getBoxProfile from './getBoxProfile/handler';
import updateBoxProfileHandler from './updateBoxProfile/handler';

const router = express.Router();

router.post('/getBoxProfile', asyncHandlerWrapper(getBoxProfile));

router.post('/updateBoxProfile', asyncHandlerWrapper(updateBoxProfileHandler));

export default router;
