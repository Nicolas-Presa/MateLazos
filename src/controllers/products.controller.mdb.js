import { ProductServices } from "../services/products.mongo.dao.js";

const services = new ProductServices();

class ProductManager{
    constructor(){}

    async addProduct(product){
        try{
            return await services.addProductServices(product);
        }catch(err){
            return err.message
        }
    }

    async getProducts(){
        try{
            return await services.getProductsServices();
        }catch(err){
            return err.message
        }
    }

    async getProductById(id){
        try{
            return await services.getProductByIdServices(id);
        }catch(err){
            return err.message
        }
    }

    async updateProduct(id, newData){
        try{
            return await services.updateProductServices(id, newData);
        }catch(err){
            return err.message
        }
    }

    async deleteProduct(id){
        try{
            return await services.deleteProductServices(id)
        }catch(err){
            return err.message
        }
    }
}

export { ProductManager }