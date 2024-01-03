//packages
const fs = require('fs')
const path = require("path");

//local files
const Cart = require('./cart')

const filePath = path.join(path.dirname(process.mainModule.filename),
    'data',
    'products.json')

const getProductsFromFile = (cb=>{
    fs.readFile(filePath,(err, data)=>{
        if(err || data.length<1) {
            cb([])
            return;
        }
        cb(JSON.parse(data))
    })
})

module.exports = class Product{
    constructor(title,description,imageUrl,price) {
        this.title = title
        this.description = description
        this.imageUrl = imageUrl
        this.price = price
    }

    create(){
        this.id = Math.random().toString()
        getProductsFromFile(products=>{
            products.push(this)
            fs.writeFile(filePath,JSON.stringify(products),(err)=>{
                console.log(err)})
        })

    }

    static getAll(callback){
        return getProductsFromFile(callback);
    }

   static findById(id,cb){
        getProductsFromFile(products=>{
           const product =  products.find(product=>product.id===id)
            if(product) {
                cb(product)
                return;
            }
            cb({})
        })
    }

    static update(id,data){
        getProductsFromFile(products=>{
            const productIndex =  products.findIndex(product=>product.id===id)
            if(productIndex===-1){
                return;
            }

            products[productIndex] = {...data, id};
            fs.writeFile(filePath,JSON.stringify(products),err => console.log(err))
        })
    }

    static destroyById(id){
        getProductsFromFile(products=>{

            const productToRemoveIndex = products.findIndex(product=>product.id===id)
            const productToRemovePrice = products[productToRemoveIndex].price
            products.splice(productToRemoveIndex,1)

           // const updatedProducts = products.filter(product=>product.id!==id)
            fs.writeFile(filePath,JSON.stringify(products),(err)=>{
                //delete from the cart too
                if(!err){
                    Cart.deleteProduct(id,productToRemovePrice)
                }
            })
        })
    }

    deleteFromCart

}
