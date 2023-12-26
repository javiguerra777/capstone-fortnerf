import { Schema, model} from "mongoose";

const directMessageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipients: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }],
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "DirectMessageRoom",
    required: true,
  },
}, {
  timestamps: true,
});
const DirectMessageModel = model("DirectMessage", directMessageSchema);

export default DirectMessageModel;



