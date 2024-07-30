import cartModel from '../models/cart.model.js';
import productModel from '../models/product.model.js'

class CartServices{
    constructor(){}

    async createCartServices(newCart){
        try{
            const cart = await cartModel.create(newCart);
            return cart
        }catch(err){
            return err.message
        }
    }

    async getCartsServices(){
        try{
            const carts = await cartModel.find().lean();
            return carts
        }catch(err){
            return err.message
        }
    }

    async getCartByIdServices(id){
        try{
            const cart = await cartModel.findById(id);
            return cart
        }catch(err){
            return err.message
        }
    }

    async addProductToCartServices(cartId, productId){
        try {
            const cart = await cartModel.findById(cartId)
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId.toString());
    
            if (productIndex > -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ productId: productId, quantity: 1 });
            }
    
            let total = 0;
            for (let item of cart.products) {
                const product = await productModel.findById(item.productId);
                const price = Number(product.price);
                total += price * item.quantity;
            }
    
            cart.total = total;
            await cart.save();
            return cart;
        } catch (err) {
            return err.message;
        }
    }

    async deleteProductToCartServices(cartId, productId){
        try {
            const cart = await cartModel.findById(cartId)
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
            if (productIndex > -1) {
                const product = await productModel.findById(productId);
    
                const productPrice = Number(product.price);
    
                if (cart.products[productIndex].quantity > 1) {
                    cart.products[productIndex].quantity -= 1;
                    cart.total -= productPrice;
                } else {
                    cart.total -= productPrice * cart.products[productIndex].quantity;
                    cart.products.splice(productIndex, 1);
                }
    
                await cart.save();
                return cart;
            } else {
                return null;
            }
        } catch (err) {
            return err.message;
        }
    }

    async emptyCartServices(id){
        try{
            const cart = await cartModel.findByIdAndUpdate(
                id,
                {$set: {products: [], total: 0}},
                {new: true}
            );
            return cart
        }catch(err){
            return err.message
        }
    }
}

export { CartServices }