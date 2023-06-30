

export const destroySession=(req, res, next)=>{
    if (req.session.login) {
        req.session.destroy(()=>{
            res.status(200).json({message: 'session destroyed'})
        })
    }
}

export const getSession=(req, res, next)=>{
    if (req.session.login) {
        res.status(200).json({message: ' Active session'})
    }else{
        res.status(401).json({message: ' Active session'})
    }
}