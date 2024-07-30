import productModel from '../models/product.model.js'


class ProductServices{
    constructor(){}

    async addProductServices(product){
        try{
            const newProduct = await productModel.create(product)
            return newProduct
        }catch(err){
            return err.message
        }
    }

    async getProductsServices(){
        try{
            const products = await productModel.find().lean();
            return products
        }catch(err){
            return err.message
        }
    }

    async getProductByIdServices(id){
        try{
            const product = await productModel.findById(id);
            return product
        }catch(err){
            return err.message
        }
    }

    async updateProductServices(id, newData){
        try{
            const product = await productModel.findByIdAndUpdate(id, newData, {new: true});
            return product
        }catch(err){
            return err.message
        }
    }

    async deleteProductServices(id){
        try{
            const product = await productModel.findByIdAndDelete(id);
            return product
        }catch(err){
            return err.message
        }
    }
}

export { ProductServices }