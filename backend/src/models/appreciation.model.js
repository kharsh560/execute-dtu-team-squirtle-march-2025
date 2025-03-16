import mongoose from "mongoose";

const AppreciationSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    appreciatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Appreciation = mongoose.model("Appreciation", AppreciationSchema);

export { Appreciation };
