const express = require("express");
const {Category} = require("../models/category");
const router = express.Router();

//get all gategories
router.get("/", async (req, res) => {
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success : false})
    }
    res.status(200).send(categoryList)
})
//get a category by id
router.get("/:id", async (req, res) => {
    const category = await Category.findById(req.params.id)

    if(!category) {
        res.status(500).json({message: "there is no category with the given ID"})
    }
    res.status(200).send(category)
})

//add a category
router.post("/", async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save();

    if(!category) {
        return res.status(404).send("the category can not be created!")
    }
})
//update category
router.put("/:id", async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        },
        {new: true}
    )
    if(!category) {
        res.status(400).json({message: "there is no category with the given ID"})
    }
    res.send(category)
})

//delete a category
router.delete("/:id", (req, res) => {
    Category.findByIdAndDelete(req.params.id).then(category => {
        if(category) {
            return res.status(200).json({success: true, message:"the category is deleted"})
        } else {
            return res.status(404).json({success: false, message:"category not found!"})
        }
    }).catch(err=> {
        return res.status(400).json({success: false, error: err})
    })
})

module.exports = router;