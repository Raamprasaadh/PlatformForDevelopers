const express =  require('express');

const router = express.Router();
const User = require('../../models/User');

//validation result will get the response from all the checks.
const { check, validationResult} = require("express-validator/check");

//@route post api/users
//@desc to register a new user.
//@access Public

/*the server js  will reroute the post request to this api.
when this is called the validation of the post request will happen. if there is some missing parameter or some 
status will be sent as 400 and error message will be posted as response.
*/
router.post('/',
[check("name","Name should not be empty or less than 3 characters").isLength({min : 3}),
check("username","User name should not be less than 3 characters").isLength({min : 3}),
check("password","pass word should contain minimum 6 character").isLength({min:6})
],
async(req,res) => 
{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {name,username,password} = req.body;

    try{
        let username = await User.findOne({username});
        if(username)
        {
            res.status(400).json({errors:[{msg:'user already exists'}]});
        }

        const user = {user,username,password};
        
        const salt = await bcrypt.gensalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save();

        res.send("User registered");
    }
    catch(err)
    {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    console.log(req.body);
});

module.exports = router;