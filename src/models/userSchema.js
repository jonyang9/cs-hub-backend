import mongoose from 'mongoose';
const { Schema, model } = mongoose

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function(v) {
        return /[A-Z]/.test(v) && /[a-z]/.test(v) && /[0-9]/.test(v);
      },
      message: props => `${props.value} is not a valid password`
    }
  }
});


const User = model('User', userSchema);
export default User;