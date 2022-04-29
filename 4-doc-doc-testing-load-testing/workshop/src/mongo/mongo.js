const mongoose = require("mongoose");
const DB_URI = "mongodb://mongo:27017/toDoApp";

export class MongoDB {
  connect() {
    mongoose.connect(DB_URI).then(() => {
      console.log("Database connected");
    });
  }

  disconnect() {
    if (mongoose.isConnected()) {
      mongoose.close();
    }
  }
}
