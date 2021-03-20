
const User = require('../models/user-model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

createUser = (req, res) => {
    const body = req.body
    console.log(body);
    var hashedPassword = bcrypt.hashSync(body.password, 8);
    console.log(hashedPassword);
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }
  
  User.create({
   
    userName : body.userName,
    email : body.email,
    password : hashedPassword,
    role: body.role,
   
  },
  function (err, user) {
      console.log(err);
    if (err) return res.status(500).send("There was a problem registering the user.")
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
});
    

    // const user = new User(body);

    // if (!user) {
    //     return res.status(400).json({ success: false, error: err })
    // }
    

    // user
    //     .save()
    //     .then(() => {
    //         return res.status(201).json({
    //             success: true,
    //             id: user._id,
    //             message: 'User created!',
    //         })
    //     })
    //     .catch(error => {
    //         return res.status(400).json({
    //             error,
    //             message: 'User not created!',
    //         })
    //     })
}
getCurrentUser=async(req,result)=>{
    const body = req.body
    console.log(body)
    console.log("here")
    if (!body) {
        return result.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }
    
    // var hashedPassword = bcrypt.hashSync(body.password, 8);
    // console.log(hashedPassword);

    await User.findOne({userName:body.userName},  (err, user) => {console.log(err)
         console.log(user, "user");
   bcrypt.compare(
    body.password, 
    user.password,
    (err,res)=>{if (err){console.log("here",err)}

    //     //if both match than you can do anything
        if (res) {
            console.log("here")
            return result.status(200).json({ success:"true",msg: "Login success" })
        } else {
            return result.status(401).json({ msg: "Invalid credential" })
        }
   // the hashed password from our database
   console.log(err, res, 'here', user.password)
   })
         
          
        //   if (!validPassword){ 
        //     console.log("Invalid"); // return to the user that the password is invalid
        //     return res
        //       .status(status.BadRequest)
        //       .json({message:'Invalid email or password'})
              
              
        //   }   
        //  console.log("Here", user, err);
        // if (err) {
        //     return res.status(404).json({
        //         err,
        //         message: 'User not found!',
        //     })
        // }
    })
   
}
updateUser = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        
        user.userName = body.userName
        
       
        user.email = body.email
        user.password = body.password
        
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'User not updated!',
                })
            })
    })
}

deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `Users not found` })
        }
        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserById,
    getCurrentUser,
}