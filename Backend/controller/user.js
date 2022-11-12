const { SUCCESS, SERVER_CRASH, NOT_FOUND } =
  require("../utils/config").STATUS_CODES;
var sendmail = require("../utils/nodemailer");
const HTMLBundle = require("../locales/html");
const messageBundle = require("../locales/en");
const emailBundle = require("../locales/mailcontent");
const userOperations = require("../db/services/user_crud");
const jwt = require("../utils/token");
const movieListOperations = require("../db/services/movie_list_crud");
const userController = {
  async check_email(request, response) {
    try {
      var email = request.body.email;
      var check = await userOperations.find_by_email(email);
      if (check == null) {
        response.status(SUCCESS).json({ message: messageBundle["successful"] });
      } else {
        response
          .status(SERVER_CRASH)
          .json({ message: messageBundle["email.already_used"] });
      }
    } catch (err) {
      response
        .status(SERVER_CRASH)
        .json({ message: messageBundle["unsuccessful"], ERROR: err });
    }
  },
  async check_user_id(request, response) {
    try {
      var user_id = request.body.user_id;
      var check = await userOperations.find_by_user_id(user_id);
      if (check == null) {
        response.status(SUCCESS).json({ message: messageBundle["successful"] });
      } else {
        response
          .status(SERVER_CRASH)
          .json({ message: messageBundle["uname.already_used"] });
      }
    } catch (err) {
      response
        .status(SERVER_CRASH)
        .json({ message: messageBundle["unsuccessful"], ERROR: err });
    }
  },
  register(request, response) {
    var key = jwt.generatekey();
    let userObject = {
      emailid: request.body.email,
      password: request.body.pwd,
      name: request.body.name,
      user_id: request.body.user_id,
      account_activated: 0,
      key: key,
      otp_checked: 0,
    };
    var promise = userOperations.register(userObject);
    promise
      .then((doc) => {
        sendmail(
          request.body.email,
          emailBundle["registersuccessfull.sub"],
          emailBundle["registersuccessfull.body"] + key
        );
        let object = {
          user_id: request.body.user_id,
          movie_list: [],
          isPrivate: request.body.list_visibility,
        };
        response
          .status(SUCCESS)
          .json({ message: messageBundle["register.welcome"], doc: doc });
      })
      .catch((err) => {
        console.log("error is ", err);
        response
          .status(SERVER_CRASH)
          .json({ message: messageBundle["register.fail"], err: err.toString });
      });
  },
  async activate_acc(request, response) {
    try {
      var key = request.query.key;
      var activate = await userOperations.activate_acc(key);
      if (activate.modifiedCount && key) {
        var user = await userOperations.find_by_key(key);
        sendmail(
          user.emailid,
          emailBundle["activatesuccessfull.sub"],
          emailBundle["activatesuccessfull.body"]
        );
        response.status(SUCCESS).send(HTMLBundle["activate.html"]);
      } else {
        response
          .status(NOT_FOUND)
          .json({ message: messageBundle["activate.unsuccessful"] });
      }
    } catch (err) {
      response
        .status(SERVER_CRASH)
        .json({ message: messageBundle["unsuccessful"], ERROR: err });
    }
  },
  async login(request, response) {
    try {
      var user = request.body;
      var doc = await userOperations.login(user);
      if (doc) {
        if (doc.account_activated == 1) {
          let token = jwt.generateToken(doc); //generate token here
          sendmail(
            user.email,
            emailBundle["login.sub"],
            emailBundle["login.body"]
          );
          response.status(SUCCESS).json({
            message: messageBundle["login.welcome"],
            name: doc.name,
            token: token,
          });
        } else {
          response
            .status(NOT_FOUND)
            .json({ message: messageBundle["account.not_activated"] });
        }
      } else {
        response
          .status(NOT_FOUND)
          .json({ message: messageBundle["login.invaliduser"] });
      }
    } catch (err) {
      response
        .status(SERVER_CRASH)
        .json({ message: messageBundle["unsuccessful"], ERROR: err });
    }
  },
  async forgot_pass(request, response) {
    try {
      var email = request.body.email;
      var user = await userOperations.find_by_email(email);
      if (user) {
        var key = jwt.generatekey();
        var save_key = await userOperations.save_key(email, key);
        if (save_key.modifiedCount) {
          sendmail(
            email,
            emailBundle["forgot_pass.sub"],
            emailBundle["forgot_pass.body"] + key
          );
          response
            .status(SUCCESS)
            .json({ message: messageBundle["forgotpass.success"] });
        } else {
          response
            .status(NOT_FOUND)
            .json({ message: messageBundle["forgotpass.fail"] });
        }
      } else {
        response
          .status(NOT_FOUND)
          .json({ message: messageBundle["email.notfound"] });
      }
    } catch (err) {
      response
        .status(SERVER_CRASH)
        .json({ message: messageBundle["unsuccessful"], ERROR: err });
    }
  },
  async acc_recover(request, response) {
    try {
      var password = request.body.pwd;
      var key = request.query.key;
      var check_key = await userOperations.find_by_key(key);
      if (check_key) {
        var update_pass = await userOperations.update_pass_for_recovery(
          check_key.user_id,
          password
        );
        if (update_pass.modifiedCount) {
          sendmail(
            check_key.emailid,
            emailBundle["account_recover.sub"],
            emailBundle["account_recover.body"]
          );
          response
            .status(SUCCESS)
            .json({ message: messageBundle["acc_recovery.success"] });
        } else {
          response
            .status(SERVER_CRASH)
            .json({ message: messageBundle["acc_recovery.fail"] });
        }
      } else {
        response
          .status(NOT_FOUND)
          .json({ message: messageBundle["acc_recovery.fail"] });
      }
    } catch (err) {
      response
        .status(SERVER_CRASH)
        .json({ message: messageBundle["unsuccessful"], ERROR: err });
    }
  },
};
module.exports = userController;
