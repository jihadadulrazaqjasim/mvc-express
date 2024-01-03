const Product = require('../models/product')

exports.create = (req, res) => {
    return res.render('admin/edit-product',
        {
            pageTitle: 'Add Product',
            path:'/admin/add-product',
            product:{},
            editing:false
        })
}

exports.store = (req, res) => {
    const reqBody = req.body;
    const title = reqBody.title
    const description =reqBody.description
    const imageUrl =reqBody.imageUrl
    const price = reqBody.price
    const product = new Product(title, description, imageUrl, price)
    product.create();
    res.redirect('/admin/products');
}

exports.getProducts = (req, res) => {
    Product.getAll((products) => {
        products = products.filter(product=>product.title)
        res.render('admin/products', {
            path:'/admin/products',
            products:products,
            pageTitle:'Admin Products',
        });
    })
}

exports.editProduct = (req,res)=>{
    const editMode = req.query.edit;
    const id = req.params.id
    if(!editMode) {
        return res.redirect('/')
    }

    Product.findById(id,(product) => {
        if(!product || Object.keys(product).length <1) {
            return res.redirect('/');
        }

        res.render('admin/edit-product',{
            pageTitle:'Edit Product',
            path:'/admin/edit-product',
            editing:editMode,
            product:product
        })
    })
}

exports.updateProduct = (req,res)=>{
    const id = req.params.id
    Product.update(id,{title:req.body.title,description:req.body.description,price:req.body.price,imageUrl:req.body.imageUrl})
    res.redirect('/admin/products');
}

exports.destroyProduct = (req,res)=>{
    const id = req.params.id
    Product.destroyById(id)
    res.redirect('/admin/products');
}