import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 15,
  },
  users: {
    type: Array,
  },
  gameUsers: {
    type: Array,
  },
  score: {
    type: Array,
  },
  maxUsers: {
    type: Number,
    required: true,
  },
  started: {
    type: Boolean,
  },
  host: {
    type: String,
    required: true,
  },
});
const Room = mongoose.model('Room', roomSchema);

export default Room;
