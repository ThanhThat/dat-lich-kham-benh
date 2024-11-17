import db from "../models/index";
import bcrypt from "bcrypt";

const userService = {
  handleUserLogin: (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userData = {};
        const isExist = await checkUserEmail(email);

        if (isExist) {
          // user already exist
          const user = await db.User.findOne({
            where: { email: email },
            attributes: ["email", "password", "roleId"],
            raw: true,
          });

          if (user) {
            // compare password
            const check = await bcrypt.compareSync(password, user.password); // false
            if (check) {
              userData.errorCode = 0;
              userData.errorMessage = "ok";

              delete user.password;

              userData.user = user;
            } else {
              userData.errorCode = 3;
              userData.errorMessage = "Wrong password!";
            }
          } else {
            // return error
            userData.errorCode = 2;
            userData.errorMessage = `User's not found~`;
          }
        } else {
          // return error
          userData.errorCode = 1;
          userData.errorMessage = `Your's Email isn't exist in your system. Please try other email!`;
        }
        resolve(userData);
      } catch (error) {
        reject(error);
      }
    });
  },
};

const compareUserPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
    } catch (error) {
      reject(error);
    }
  });
};

const checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: {
          email: email,
        },
      });

      if (user) resolve(true);
      else resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

export default userService;
