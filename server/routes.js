const User = require('./models/user')
const bcrypt = require('bcrypt')
const helper = require('../server/routes_helper.js');
var postRegister = async function(req, res)
{
    const {email, password, name} = req.body;
    try
    {
        const user = await User.findOne({email: email});
        if(user)
        {
            return res.status(401).json({error: 'User with this email address exists. Please log in using your email and password'});
        }
        const hashed_password = await helper.encryptPassword(password);
        const newUser = new User({
            email: email,
            password: hashed_password, 
            name: name
        }); 

        await newUser.save(); 
        req.session.email = email;
        req.session.user_id = newUser._id;
        return res.status(201).json({message: 'User registered successfully'});
    }
    catch(e)
    {
        console.error(e);
        return res.status(500).json({error: 'The server had an error'});
    }
}

var postLogin = async function(req,res)
{
    const { email, password } = req.body; 
    const isEmptyFields = !email || !password;

    if(isEmptyFields) {
        return res.status(400).json({error: 'One or more of the fields you entered was empty, please try again'});
    }

    try 
    {
        const user = await User.findOne({email: email });
        if (!user) {
            return res.status(401).send('Username or password not found'); 
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send('Username or password not found');
        }
        return res.status(200).json({message: 'Login successful'})
        
    }
    catch(e) 
    {
        console.error(e);
        return res.status(500).json({error: "An error occurred"});
    }

}

var postLogout = async function(req,res)
{
    try
    {
        req.session.username = null;
        req.session.user_id = null;
        return res.status(200).json({message: 'User has been logged out'})
    }
    catch(e)
    {
        console.error(e);
        return res.status(500).json({error: "An error occurred"});
    }
}

var routes = {
    login:postLogin,
    register: postRegister,
    logout: postLogout
};
module.exports = routes;