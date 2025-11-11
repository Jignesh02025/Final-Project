import express from 'express'
import { Singup,login } from '../controller/User.controller.js';

const router = express.Router();

router.post('/Singup',Singup)
router.post('/Login',login)

export default router;