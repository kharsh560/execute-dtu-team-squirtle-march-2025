import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    postContent: {
      type: String,
      required: true,
    },
    // postId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Post",
    //   required: true,
    // },
    // Remove the postId field from the contentSchema entirely since the Post already...
    // ...has a reference to the Content. You don't need to reference the Post back in...
    // ...the Content unless you anticipate a use case where you'll query content...
    // ...independently and want to trace it back to its parent post.
    // NOTE: Reason to remove it:-
    // In your contentSchema, you have a field postId referencing the Post model. ...
    // ...However, in your workflow, you are first creating the content and then using... 
    // ...the contentId to create the post. This creates a circular dependency between... 
    // ...the Content and Post models.
  },
  { timestamps: true }
);

const Content = mongoose.model("Content", contentSchema);
// the ref: "Post", should be the same as "Post" as given in string of Post model. kust like the string in model("Name", nameSchema)
export { Content };
