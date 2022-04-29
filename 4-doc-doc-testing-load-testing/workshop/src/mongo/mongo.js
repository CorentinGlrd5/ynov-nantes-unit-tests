const mongoose = require("mongoose");
class MongoDB {
  connect(uri) {
    mongoose.connect(uri).then(() => {
      console.log("Database connected");
    });
  }

  disconnect() {
    mongoose.connection.close();
  }
}

module.exports = MongoDB;
