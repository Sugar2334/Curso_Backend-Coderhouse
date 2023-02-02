import { Router } from "express";

const cartRouter = new Router()

// Nuevo carrito
cartRouter.post((req, res) => {

})

// Listar prods
cartRouter.get('/:cid', (req, res) => {

})

// Agregar prod al arr de prods del carrito seleccionado
cartRouter.post('/:cid/product/:pid', (req, res) => {

})

export default cartRouter