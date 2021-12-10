var bcrypt=require('bcryptjs')
var jwt=require('jsonwebtoken')

var UserModal=require("../models/user.js")

var ConUserModal=require("../models/conuser.js")


const secret = 'test';

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await ConUserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const oldUser2= await UserModal.findOne({connectId:oldUser.connectId})
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser2, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signup = async (req, res) => {
  const { firstName,lastName,email,password,accounttype,ContactNumber,ProfileDP,state,city,Pin,educationStatus,AboutYou,Educated,TeachesUpto,TeachingExperience, TutoringTitle, TutoringExperience } = req.body;

  try {
    const connectId = await UserModal.countDocuments({});

    const oldUser = await ConUserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ name: `${firstName} ${lastName}`,accounttype,ProfileDP,state,city,Pin,educationStatus,AboutYou,Educated,TeachesUpto,TeachingExperience, TutoringTitle, TutoringExperience,connectId  });

    const result2 = await ConUserModal.create({ email, password: hashedPassword,ContactNumber, connectId  });


    const token = jwt.sign( { email: result2.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};

module.exports={signin,signup}