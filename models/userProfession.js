import mongoose from 'mongoose';

const professionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  employer: { type: String, required: true },
  designation: { type: String, required: true },
  experience: { type: String, required: true },
});

export default mongoose.model('Profession', professionSchema);
