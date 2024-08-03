//In this err parameter error variable use comes using app.use(errorMiddleware) in server


const errorMiddleware = (err,req,res,next) => {
    const status = err.status || 500
    const message = err.message || "Backend Error"
    const extraDetails = err.extraDetails || "Error From BackEnd"

    return res.status(status).json({message , extraDetails})

    next()
}

module.exports = errorMiddleware