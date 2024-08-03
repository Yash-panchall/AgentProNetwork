const adminMiddleware = async(req , res , next) => {

    try {
        const adminRole = req.profile.isAdmin;
        // res.status(200).json({message : adminRole})
        if(!adminRole){
            res.status(404).json({msg : "Acces denied , Agent is Not admin"})
        }else{        
            next()
        }

    } catch (error) {
        next(error)
    }

}


module.exports = adminMiddleware;