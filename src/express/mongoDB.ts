import mongoose from 'mongoose'

const membership = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  category: {
    one: Boolean,
    two: Boolean,
    three: Boolean
  }
})
export const membershipModel = mongoose.model('membership', membership)

const chatting = new mongoose.Schema({
  senderID: String,
  receiverID: String
})
export const chattingModel = mongoose.model('chatting', chatting)
