import { Schema, model } from "mongoose";

const directMessageRoomSchema = new Schema({
  users: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }],
}, {
  timestamps: true,
});
const DirectMessageRoomModel = model("DirectMessageRoom", directMessageRoomSchema);
export default DirectMessageRoomModel;