import { Router } from "express";
import { ProductManager } from "../controllers/products.controller.mdb.js";

const router = Router();
const productController = new ProductManager();

router.get('/addProduct', async(req, res) =>{
    try{
        if(req.user){
            res.render('addProduct', {user: req.user})
        }else{
            res.redirect('/login')
        }
    }catch(err){
        res.status(400).send({status: 'Error', payload: err.message})
    }
})

router.get('/login', async(req, res) => {
    try{
        if(req.user){
            res.redirect('/addProduct')
        }else{
            res.render('login')
        }
        }catch(err){
        res.status(500).send({status: 'error', payload: err.message})
    }
})

router.get('/matelazos', async(req, res) => {
    try{
        res.render('matelazos');
    }catch(err){
        res.status(400).send({status: 'Error', payload: err.message});
    }
})

export default router