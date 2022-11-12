const UserModel = require("../models/user");
const encryption = require("../../utils/encrypt");
module.exports = {
  async find_by_email(email) {
    try {
      var user = await UserModel.findOne({
        emailid: email,
      });
      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (err) {
      console.log("ERROR is : ", err);
    }
  },
  register(userObject) {
    userObject.password = encryption.generateHash(userObject.password);
    let promise = UserModel.create(userObject);
    return promise;
  },
  async activate_acc(key) {
    try {
      var doc = await UserModel.updateOne(
        {
          key: key,
        },
        {
          $set: {
            account_activated: 1,
          },
        }
      );
      return doc;
    } catch (err) {
      console.log("ERROR is : ", err);
    }
  },
  async find_by_key(key) {
    try {
      var user = await UserModel.findOne(
        {
          key: key,
        },
        {
          _id: 0,
          emailid: 1,
          user_id: 1,
        }
      );
      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (err) {
      console.log("ERROR is : ", err);
    }
  },
  async login({ email, pwd }) {
    try {
      var doc = await UserModel.findOne({ emailid: email });
      if (doc) {
        if (encryption.comapreHash(doc.password, pwd)) {
          return doc;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (err) {
      console.log("ERROR is : ", err);
    }
  },
  async save_key(email, otp) {
    try {
      var saved = await UserModel.updateOne(
        {
          emailid: email,
        },
        {
          $set: {
            key: otp,
          },
        }
      );
      return saved;
    } catch (err) {
      console.log("ERROR is : ", err);
    }
  },
  async update_pass_for_recovery(user_id, pass) {
    try {
      pass = encryption.generateHash(pass);
      var update = await UserModel.updateOne(
        {
          user_id: user_id,
        },
        {
          $set: {
            password: pass,
          },
        }
      );
      return update;
    } catch (err) {
      console.log("ERROR is : ", err);
    }
  },
};
