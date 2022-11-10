import mongoose from 'mongoose';
import User from '../models/user.js';
import Education from '../models/userEducation.js';
import Profession from '../models/userProfession.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: 'educations',
          localField: '_id',
          foreignField: 'userId',
          as: 'education',
        },
      },
      {
        $lookup: {
          from: 'professions',
          localField: '_id',
          foreignField: 'userId',
          as: 'profession',
        },
      },
    ]);
    return res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    contact,
    dateOfBirth,
    address,
    university,
    degree,
    graduation,
    employer,
    designation,
    experience,
  } = req.body;

  try {
    const user = await User.create({
      firstName,
      lastName,
      contact,
      dateOfBirth,
      address,
    });

    const education = await Education.create({
      userId: user._id,
      university,
      degree,
      graduation,
    });

    const profession = await Profession.create({
      userId: user._id,
      employer,
      designation,
      experience,
    });
    res.status(201).json({ message: 'User Created' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const {
    firstName,
    lastName,
    contact,
    dateOfBirth,
    address,
    university,
    degree,
    graduation,
    employer,
    designation,
    experience,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No post with that id');
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstName,
        lastName,
        contact,
        dateOfBirth,
        address,
      },
      {
        new: true,
      }
    );

    const updatedUserEducation = await Education.findOneAndUpdate(
      { userId: _id },
      {
        university,
        degree,
        graduation,
      },
      { new: true }
    );

    const updatedUserProfession = await Profession.findOneAndUpdate(
      { userId: _id },
      {
        employer,
        designation,
        experience,
      },
      { new: true }
    );
    await updatedUser.save();
    await updatedUserEducation.save();
    await updatedUserProfession.save();
    res.json({ updatedUser, updatedUserEducation, updatedUserProfession });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No post with that id');
  try {
    await User.findByIdAndRemove(_id);
    await Education.findOneAndRemove({ userId: _id });
    await Profession.findOneAndRemove({ userId: _id });

    res.json({ message: 'Post Deleted Successfully' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
