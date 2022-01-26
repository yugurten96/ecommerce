const express = require("express");
const {Product} = require("../models/product");
const {Category} = require("../models/category");
const router = express.Router();

//get all products
router.get("/", async(req, res)=>{
    const productList = await Product.find();
    res.send(productList)
})

//get product by id
router.get("/:id", async (req, res) => {
    const product = await Product.findById(req.params.id).populate("category");

    if(!product) {
        res.status(500).json({message: "there is no product with the given ID"})
    }
    res.status(200).send(product)

})

//update product
router.put("/:id", async (req, res) => {
    const category = await Category.findById(req.body.category)
    if(!category) return res.status(400).send("invalid category!")

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        },
        //show the updated product
        {new: true}
    )
    if(!product) {
        res.status(400).json({message: "there is no product with the given ID"})
    }
    res.send(product)
})

//add new product
router.post("/", async (req, res)=>{
    const category = await Category.findById(req.body.category)
    if(!category) return res.status(400).send("invalid category!")

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    })
    product = await product.save();
    if(!product) {
        return res.status(404).send("the product can not be created!")

    }
})


module.exports = router;