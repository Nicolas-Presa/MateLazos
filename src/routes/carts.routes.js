import { Router } from "express";
import { CartManager } from "../controllers/carts.controller.mdb.js";
import { ProductManager } from "../controllers/products.controller.mdb.js";

const router = Router();
const cartController = new CartManager();
const productController = new ProductManager();


router.post('/', async(req, res) => {
    try{
        const newCart = req.body
        if(!newCart){
            res.status(500).send({status: 'Error', payload: 'No pudo generarse un carrito para el usuario, ERROR EN BASE DE DATOS'})
        }
    
            const cart = await cartController.createCart(newCart);
            res.status(200).send({status: 'Success', payload: cart});
    }catch(err){
        res.status(400).send({status: 'Error', payload: err.message});
    }
})

router.get('/', async(req, res) => {
    try{
        const carts = await cartController.getCarts();
        if(!carts){
            res.status(400).send({status: 'error', payload: 'Error en base de datos'});
        }
        
        res.status(200).send({status: 'Success', payload: carts});
    }catch(err){
        res.status(400).send({status: 'Error', payload: err.message});
    }
})

router.get('/:cid', async(req, res) => {
    try{
        const cartCid = req.params.cid;
        if(!cartCid){
            res.status(400).send({status: 'Error', payload: 'Faltan parametros'});
        }
    
        const cart = await cartController.getCartById(cartCid);
        if(!cart){
            res.status(400).send({status: 'Errro', payload: 'No hay carrito asignado para este usuario. ERROR en DDBB'});
        }
    
        res.status(200).send({status: 'Success', payload: cart});
    }catch(err){
        res.status(400).send({status: 'Error', payload: err.message});
    }
})

router.post('/:cid/products/:pid', async(req, res) => {
    try{
        const cartCid = req.params.cid;
        const productPid = req.params.pid;
    
        if(!cartCid || !productPid){
            res.status(400).send({status: 'Error', payload: 'Faltan parametros'});
        }
    
        const cart = await cartController.getCartById(cartCid);
        const product = await productController.getProductById(productPid);
        if(!cart || !product){
            res.status(400).send({status: 'Error', payload: 'No existe un ID asignado'});
        }
    
        const productToCart = await cartController.addProductToCart(cartCid, productPid);
        if(!productToCart){
            res.status(400).send({status: 'Error', payload: 'Error al agregar el producto'});
        }
    
        res.status(200).send({status: 'Success', payload: productToCart});
    }catch(err){
        res.status(400).send({status: 'Error', payload: err.message})
    }
})

router.delete('/:cid/products/:pid', async(req, res) => {
    try{
        const cartCid = req.params.cid;
        const productPid = req.params.pid;
        if(!cartCid || !productPid){
            res.status(400).send({status: 'Error', payload: 'Faltan parametros'});
        }
    
        const cart = await cartController.getCartById(cartCid);
        const product = await productController.getProductById(productPid);
        if(!cart || !product){
            res.status(400).send({status: 'Error', payload: 'No existe un ID asignado'});
        }
    
        const productToCart = await cartController.deleteProductToCart(cartCid, productPid)
        if(!productToCart){
            res.status(400).send({status: 'Error', payload: 'Error al eliminar el producto'});
        }
    
        res.status(200).send({status: 'Success', payload: productToCart});
    }catch(err){
        res.status(400).send({status: 'Error', payload: err.message})
    }
})

router.put('/:cid', async(req, res) => {
    try{
        const cartCid = req.params.cid;
        if(!cartCid){
            res.status(400).send({status: 'Error', payload: 'Faltan parametros'});
        }
    
        const cart = await cartController.getCartById(cartCid);
        if(!cart){
            res.status(400).send({status: 'Error', payload: 'No existe un ID asignado'});
        }
    
        const emptyCart = await cartController.emptyCart(cartCid);
        if(!emptyCart){
            res.status(400).send({status: 'Error', payload: 'Error al vaciar el carrito'});
        }
        
        res.status(200).send({status: 'Success', payload: emptyCart});
    }catch(err){
        res.status(400).send({status: 'Success', payload: err.message});
    }
})

export default router