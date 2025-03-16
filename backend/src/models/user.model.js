import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    enrollment: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      // required: true, // -> Its not mandatory! We'll provide a default avatar in case of no avatar.
      default:
        "https://res.cloudinary.com/dx5dlghqe/image/upload/v1735927377/genderNeutralAvatar_ywbjph.png",
    },
    refreshToken: {
      type: String,
      // required: true, -> Of course, it should not be a required field.
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

// bcrypt codes for hashing the password.
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (incomingPassword) {
  return await bcrypt.compare(incomingPassword, this.password);
};

// JWT token generation codes 
// Skeleton:-

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      // Payload: Info which this token has to store.
      _id: this._id,
      email: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      // Payload: Info which this token has to store.
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// export const User = mongoose.model("User", userSchema);
// Instead of the above line, we can write this as below:-
const User = mongoose.model("User", userSchema);
// export User; -> Wrong
export {User};