
const errorHappen = ( err, req, res, next )=>{
    const errorStatus = res.statusCode === 200 ? 500 : res.statusCode
    res.status(errorStatus)
    res.json({
        message: err.message,
        error: err.stack
    })
}






const wrongPath = ( req, res, next)=>{
    const error = new Error(`Not found - ${req.originalUrl}`) 
    res.status(404)
    next(error)

}


export {errorHappen, wrongPath}