//This use to Zod validation for registration 

const validate = (Schema) => async (req , res , next) => {
    try {
        const parseBody = await Schema.parseAsync(req.body)
        req.body = parseBody
        // console.log(parseBody)
        next()
    } catch (err) {
        // console.log(err)
        // res.status(404).json({msg : err.errors[0].message})

        const status = 404;
        const message = err.errors[0].message;

        const error = {
            status,
            message
        }
        //send error data to error middleware

        next(error);
    }
}

module.exports = validate;