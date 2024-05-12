const bcrypt = require('bcrypt');
const UserModel = require('../models/user');

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, bio, password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      throw new Error('Password do not match!!');
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      phone,
      bio,
      password: hashedPassword,
    });

    await user.save();

    res.redirect('/');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser };
