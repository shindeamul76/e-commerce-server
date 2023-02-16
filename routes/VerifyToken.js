const jwt = require('jsonwebtoken');


const VerifyToken = async (req, res, next) => {
    try {

      const authHeader = req.headers.token;
      
      if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if(err) return res.status(403).json('Token is not valid!');
            req.user = user;
            next();
        })
      } else {
        return res.status(401).json({
            success: false,
            message: "You are not authenticated"
        })
      }
        
    } catch (error) {

        res.status(500).json({
            success:false,
            message: error.message,
        })
        
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
  VerifyToken(req, res, () => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
      next();
    }else {
      return res.status(403).json('You are not allowed to do that!');
    }
  })
}

const verifyTokenAndAdmin = (req, res, next) => {
  VerifyToken(req, res, () => {
    if(req.user.isAdmin) {
      next();
    }else {
      return res.status(403).json('You are not allowed to do that!');
    }
  })
}

module.exports = {VerifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin}