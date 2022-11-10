import mongoose from 'mongoose';

const educationSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  university: { type: String, required: true },
  degree: { type: String, required: true },
  graduation: { type: String, required: true },
});

export default mongoose.model('Education', educationSchema);
