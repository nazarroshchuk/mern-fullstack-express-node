import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      {
        validator(email) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: 'Please enter a valid email address',
      },
      {
        async validator(email) {
          const user = await this.constructor.findOne({ email });
          return !user || user._id.equals(this._id);
        },
        message: 'Email already exists',
      },
    ],
  },
  password: { type: String, required: true, minlength: 8 },
  image: { type: String, required: true },
  places: [{ type: mongoose.Schema.ObjectId, ref: 'Place', required: true }],
});

const UserModel = mongoose.model('User', userSchema, 'users_collection');

export default UserModel;
