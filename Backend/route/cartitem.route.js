import express from 'express'
import {storeCartCollection,getCartCollection,removeCartItem} from '../controller/cartitem.controller.js'

const route = express.Router()

route.post("/cart",storeCartCollection);
route.get("/:user_id",getCartCollection);
route.post("/removecart",removeCartItem)

export default route;
