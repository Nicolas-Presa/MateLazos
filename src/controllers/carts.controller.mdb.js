import { CartServices } from "../services/carts.mongo.dao.js";

const services = new CartServices();

class CartManager{
    constructor(){}

    async createCart(newCart){
        try{
            return await services.createCartServices(newCart);
        }catch(err){
            return err.message
        }
    }

    async getCarts(){
        try{
            return await services.getCartsServices();
        }catch(err){
            return err.message
        }
    }

    async getCartById(id){
        try{
            return await services.getCartByIdServices(id);
        }catch(err){
            return err.message
        }
    }

    async addProductToCart(cartId, productIc){
        try{
            return await services.addProductToCartServices(cartId, productIc);
        }catch(err){
            return err.message
        }
    }

    async deleteProductToCart(cartId, productId){
        try{
            return await services.deleteProductToCartServices(cartId, productId);
        }catch(err){
            return err.message
        }
    }
    
    async emptyCart(cartId){
        try{
            return await services.emptyCartServices(cartId);
        }catch(err){
            return err.message
        }
    }
}

export { CartManager }