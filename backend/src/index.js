import dotenv from "dotenv";
import connectDB from "./db/dbConnectionLogic.js";
import app from "./app.js";

dotenv.config({
    path: "./env"
})

// connectDB();
const port = process.env.PORT || 8000;
connectDB()
.then(() => {
  // Express part:-
  app.on("error", (errorInOnEvent) => {
    console.log("Error: ", errorInOnEvent);
    throw errorInOnEvent;
  });

  app.listen(port, () => {
    console.log(
      `App/Server is listening on port: ${port}`
    );
  });
})
.catch((err) => {
    console.log("Mongo DB connection error!! ", err);
})








