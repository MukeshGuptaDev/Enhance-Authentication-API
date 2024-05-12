const bcrypt = require('bcrypt');

const UserModel = require('../models/user');
const { generateAccessToken } = require('../utils/generateToken');

const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({ email }).lean();
    if (!user) throw new Error('User not found!!');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      throw new Error('Please check your password and try again!!');

    delete password;

    const accessToken = generateAccessToken({ email });
    //   const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET);

    res.cookie('token', accessToken, { httpOnly: true });
    // res.cookie('refreshToken', refreshToken, { httpOnly: true });

    res.redirect('/user');
  } catch (error) {
    res.redirect('/login');
  }
};

module.exports = { loginUser };
