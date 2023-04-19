const jwt = require('jsonwebtoken');
const User = require('../../User/models/user.model');
const Organization = require('../../User/models/org.model');
require('dotenv').config();

const bprotect = async (req, res, next) => {
    let token //get token from header

    //check if token is present
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1] //get token from header

            const decoded = jwt.verify(token, process.env.JWT_SECRET)  //verify token

            req.user = await User.findOne({_id:decoded.id}).select('-password') //get user from database
            req.organization=await Organization.findOne({_id:decoded.id}).select('-password') //get organization from database



            next()//go to next middleware
        } catch (error) {
            console.error(error)
            res.status(401).json({message: 'Not authorized, token failed'})
        }//catch error
    }

    if (!token) {
        res.status(401).json({message: 'Not authorized, no token'})
    }//if token is not present

}//protect


//check if user is financial manager or organization
const budgetProtect = async (req, res, next) => {
    console.log(req.user)
    if((req.user && req.user.role === 'accountant') || (req.organization && req.organization.role === 'organization')){
        next()
    }
    else{
        res.status(401).json({message: 'Not authorized as an admin or as an accountant'})
    }
}


module.exports = {bprotect, budgetProtect};