import mongoose from 'mongoose';

const User = mongoose.Schema({
  name: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  imgUrl: { type: String, unique: false, required: true },
  sex: { type: String, unique: false, required: true },
  title: { type: String, unique: false, required: false },
  search: { type: String, unique: false, required: true },
  likeMe: { type: Array, unique: false, required: false },
  like: { type: Array, unique: false, required: false },
  roles: [{ type: String, ref: 'Role' }],
});

export default mongoose.model('User', User);
