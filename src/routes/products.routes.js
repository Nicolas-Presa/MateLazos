import { Router } from "express";
import { ProductManager } from "../controllers/products.controller.mdb.js";

const router = Router();
const controller = new ProductManager();

router.post('/', async(req, res) => {
    try{
        const owner = req.user.email;
        const {title, description, code, price, stock, category} = req.body

        if(!title || !description || !code || !price || !stock || !category || !owner){
            res.status(500).send({status: 'Error', payload: 'Faltan parametros obligatorios'});
        }
    
        const newProduct = { title, description, code, price, stock, category, owner };
        const result = await controller.addProduct(newProduct);
        if(!result){
            res.status(400).send({status: 'Error', payload: 'Error en base de datos'});
        }

        res.status(200).send({status: 'Success', payload: result});
    }catch(err){
        res.status(500).send({status: 'Error', payload: err.message});
    }
})

router.get('/', async(req,res) => {
    try{
        const products = await controller.getProducts();
        if(!products){
            res.status(400).send({status: 'Error', payload: 'Error en base de datos'});
        }

        res.status(200).send({status: 'Success', payload: products});
    }catch(err){
        res.status(400).send({status: 'Error', payload: err.message});
    }
})

router.get('/:pid', async(req, res) => {
    try{
        const productPid = req.params.pid;
        if(!productPid){
            res.status(500).send({status: 'Error', payload: 'Falta el parametro'})
        }

        const product = await controller.getProductById(productPid);
        if(!product){
            res.status(400).send({status: 'Error', payload: 'No existe producto con este ID'});
        }

        res.status(200).send({statos: 'Success', payload: product});
    }catch(err){
        res.status(400).send({status: 'Error', payload: err.message});
    }
})

router.put('/:pid', async(req, res) =>{
    try{
        const productPid = req.params.pid;
        const newData = req.body;

        if(Object.keys(newData).length === 0){
            res.status(500).send({status: 'Error', payload: 'No agregaste ningun dato para modificar'});
        }

        const product = await controller.getProductById(productPid);
        if(!product){
            res.status(400).send({status: 'Error', payload: 'No existe producto con este ID'});
        }

        const updateProduct = await controller.updateProduct(productPid, newData);
        if(!updateProduct){
            res.status(400).send({status: 'Error', payload: 'Error en la modificacion del producto'});
        }

        res.status(200).send({status: 'Success', payload: updateProduct});
    }catch(err){
        res.status(400).send({status: 'Error', payload: err.message});
    }
})

router.delete('/:pid', async(req, res) => {
    try{
        const productPid = req.params.pid

        const product = await controller.getProductById(productPid);
        if(!product){
            res.status(400).send({status: 'Error', payload: 'No existe un producto con este ID'});
        }

        const deleteProduct = await controller.deleteProduct(productPid)
        if(!deleteProduct){
            res.status(400).send({status: 'Error', payload: 'Error al eliminar el producto'});
        }
        res.status(200).send({status: 'Success', payload: deleteProduct})
    }catch(err){
        res.status(400).send({status: 'Error', payload: err.message})
    }
})

export default router