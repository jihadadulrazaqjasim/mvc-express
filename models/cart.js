const fs = require('fs')
const path = require('path')

const filePath = path.join(path.dirname(process.mainModule.filename),
    'data',
    'cart.json')

module.exports = class Cart {
    static addProduct(id,productPrice){
        fs.readFile(filePath,(err, data)=>{
            let cart = { products: [], totalPrice: 0 };

            if(!err) {
                try {
                    cart = JSON.parse(data);
                }catch (err){
                    console.log('fine',cart)
                    fs.writeFileSync(filePath,JSON.stringify(cart))
                }
            }
              const existingProductIndex =  cart.products.findIndex(product=>product.id===id);
              const existingProduct = cart.products[existingProductIndex];
              let updatedProduct;
              if(existingProduct){
                  updatedProduct = {...existingProduct};
                  updatedProduct.productQty = updatedProduct.productQty + 1;
                  cart.products[existingProductIndex] = updatedProduct
              }else{
                  cart.products =  [...cart.products,{id:id,productQty:1}]
              }
              cart.totalPrice = cart.totalPrice + +productPrice;
              fs.writeFile(filePath,JSON.stringify(cart),(err)=>{
                  if(err){console.log('fail to write to cart: '+ err)}

              })
        })
    }

    static decrementOrDeleteProduct(cart,product){
        const productToDestroyIndex =  cart.products.findIndex(cartProduct=>cartProduct.id===product.id)
        if(productToDestroyIndex ===-1){
            console.log('No products found with this product ID inside the cart')
            return;
        }

        let updatedCart = {...cart}
        const productToDestroyQuantity =   cart.products[productToDestroyIndex].productQty

        //decrement.
        if( productToDestroyQuantity > 1){
            cart.products[productToDestroyIndex].productQty -=1;
            updatedCart.totalPrice = updatedCart.totalPrice - productToDestroyQuantity * product.price;
            fs.writeFile(filePath,JSON.stringify(updatedCart),err => err?console.log(err):'')
            return;
        }

        //delete it.
        this.deleteProduct(product.id,product.price)
    }

    static deleteProduct(id,productPrice){
            this.getCart((cart)=>{
                const productToRemove = cart.products.find(product=>product.id===id)
                if(!productToRemove){
                    return;
                }

                let updatedCart = {...cart};
                updatedCart.products = cart.products.filter(product=>product.id!==id)
                updatedCart.totalPrice = updatedCart.totalPrice - productToRemove.productQty * productPrice;
                fs.writeFile(filePath,JSON.stringify(updatedCart),(err)=>err?console.log(err):'')
            })
    }

    static getCart(cb){
        fs.readFile(filePath,(err, data)=>{
            let cart;
            try {
                cart = JSON.parse(data)
            }catch (err){
                cb({})
                return;
            }

            cb(cart)
        })
    }
}