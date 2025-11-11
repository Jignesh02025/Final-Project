import express from 'express'
import { getdata } from '../controller/data.controller.js';

const router = express.Router();

router.get('/',getdata);

export default router;
