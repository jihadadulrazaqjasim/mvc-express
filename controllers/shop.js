const Product = require('../models/product')
const Cart = require("../models/cart");
const fs = require('fs');
const path = require("path");

exports.show = (req,res)=>{
    Product.findById(req.params.productId,(product)=>{
          res.render('shop/product-detail', {
                pageTitle:product.title,
                path:'/products',
                product:product
            })
    })
}

exports.getProducts = (req, res) => {
   Product.getAll((products) => {
       products = products.filter(product=>product.title)
        res.render('shop/product-list', {
            path:'/products',
            products:products,
            pageTitle:'All Products',
        });
    })
}

exports.getIndex = (req,res)=>{
    Product.getAll((products) => {
        products = products.filter(product=>product.title)
        res.render('shop/index', {
            path:'/',
            products:products,
            pageTitle:'My Shop',
        });
    })
}

exports.cart = (req,res)=>{
    Cart.getCart(cart=>{
        Product.getAll(products=>{
            const cartProducts = [];
            for(product of products){
                const cartProductData = cart.products.find(cartProduct=>cartProduct.id===product.id)

                if(cartProductData){
                    cartProducts.push({productData:product,qty:cartProductData.productQty});
                }
            }

            return res.render('shop/cart',{
                pageTitle:'Your Cart',
                path:'/cart',
                products:cartProducts,
                cartTotal:cart.totalPrice
            })
        })

    })
}

exports.addToCart = (req,res)=>{
    Product.findById(req.body.productId,(product) => {
        Cart.addProduct(req.body.productId,product.price)
        res.redirect('/cart')
    })
}

exports.deleteFromCart = (req,res)=>{
    const productId = req.params.id
    Product.findById(productId,product=>{
        Cart.getCart((cart)=>{
            Cart.decrementOrDeleteProduct(cart,product)
            res.redirect('/cart')

        })
    })

}

exports.checkout = (req,res)=>{
    return res.render('shop/checkout',{
        pageTitle:'Checkout',
        path:'/checkout'
    })
}

exports.getOrders = (req,res)=>{
    return res.render('shop/orders',{
        pageTitle:'Orders',
        path:'/orders'
    })
}