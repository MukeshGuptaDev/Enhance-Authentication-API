const UserModel = require('../models/user');
const bcrypt = require('bcrypt');

let getUsers = async (req, res) => {
  try {
    let query = { email: req.userEmail };
    if (!req.userEmail) {
      query = { googleId: req?.session?.passport?.user?._json.sub };
    }

    let user = await UserModel.findOne(query).lean();

    query = {};
    if (!user.isAdmin) {
      query.privateUser = false;
    }

    let users = await UserModel.find(query).lean();

    res.render('index', { users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

let getUser = async (req, res) => {
  try {
    let query = { email: req.userEmail };
    if (!req.userEmail) {
      query = { googleId: req?.session?.passport?.user?._json.sub };
    }

    let user = await UserModel.findOne(query).lean();

    res.render('profile', { user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

let createUser = async (req, res) => {
  try {
    const userDetails = req?.session?.passport?.user?._json;
    const name = userDetails.name;
    const googleId = userDetails.sub;
    const profilePicURL = userDetails.picture;
    let createUser = true;

    const userData = await UserModel.findOne({ googleId }).lean();
    if (userData) createUser = false;

    if (createUser) {
      const user = new UserModel({
        name,
        googleId,
        profilePicURL,
      });
      await user.save();
    }

    res.redirect('/user');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

let updateUser = async (req, res) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      bio: req.body.bio,
    };
    if (req.body.password) {
      userData.password = await bcrypt.hash(req.body.password, 10);
    }
    userData.privateUser = req.body.privateUser ? true : false;

    let user = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { ...userData }
    );

    res.redirect('/user');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

let getUserToUpdate = async (req, res) => {
  try {
    let userId = req.params.id;
    let user = await UserModel.find({ _id: userId }).lean();
    user = user[0];

    res.render('editUser', { user, userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsers, createUser, updateUser, getUserToUpdate, getUser };
