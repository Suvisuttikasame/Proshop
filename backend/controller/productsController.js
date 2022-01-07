import  asyncHandler  from "express-async-handler"
import Product from '../dataModel/productModel.js'


const searchProducts  = asyncHandler(async function(req, res, next){

    const maxPageSize = 4
    let pageNum = 1
    const {keyword, page} = req.query
    
    if(page.length > 0){
       pageNum = Number(page)
      
    }
    
    try {
        const count = await Product.countDocuments(keyword.length === 0 ? {} :{name : {$regex: keyword, $options: 'i'}})
        const pages = Math.ceil(count/maxPageSize)
        const start = (pageNum - 1) * maxPageSize
        
        const products = await Product.find(keyword.length === 0 ? {} : {name : {$regex: keyword, $options: 'i'}}).sort({'createdAt': 1}).skip(start).limit(maxPageSize)
        const maxRating = await Product.find({}).sort({rating: -1}).limit(3)
        
        res.json({products, pages, pageNum, maxRating}) 
    } catch (error) {
        next(error)
    }
    

})


const searchProduct = asyncHandler(async function(req, res, next){
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(401)
        next(new Error('product not found'))
    }
    
})

const reviewProduct = async ( req, res, next ) =>{
    const { review, productId } = req.body
    try {
    const productDetail = await Product.findById({_id:productId})

    const userReview = productDetail.review.find( x => x.user.toString() === review.user)
        
    if (!userReview) {
        const numReviews = productDetail.review.length +1
    const totalRating = productDetail.review.reduce((acc, item) =>{
            return acc + item.rating
    }, 0)
    const avgRating = (totalRating + Number(review.rating)) / numReviews
    productDetail.review.push(review)
    
    productDetail.numReviews = numReviews
    productDetail.rating = avgRating


    await  productDetail.save()
    res.json({
        'message': 'review success'
    })
        
    } else {
        next(new Error('Already reviewed!'))
        
    }

    
    } catch (error) {
        next(error)
    }

    
}


export {searchProduct, searchProducts, reviewProduct}