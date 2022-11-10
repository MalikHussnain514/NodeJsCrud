import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contact: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  address: { type: String, required: true },
  // university: { type: String, required: true },
  // degree: { type: String, required: true },
  // graduation: { type: String, required: true },
  // employer: { type: String, required: true },
  // designation: { type: String, required: true },
  // experience: { type: String, required: true },
});

export default mongoose.model('User', userSchema);
