import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

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

  getAllUsers: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        let users = [];
        if (userId === "ALL") {
          users = await db.User.findAll({
            attributes: {
              exclude: ["password"],
            },
          });
          console.log(users);
        }
        if (userId && userId !== "ALL") {
          users = await db.User.findOne({
            where: { id: userId },
            attributes: {
              exclude: ["password"],
            },
          });
        }
        resolve(users);
      } catch (error) {
        reject(error);
      }
    });
  },

  createNewUser: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Check email is exist ???
        const check = await checkUserEmail(data.email);
        if (check === true) {
          resolve({
            errorCode: 1,
            errorMessage:
              "Your email is already in used. Please try another email!",
          });
        } else {
          const hashPasswordFromBcrypt = await hashUserPassword(data.password);
          await db.User.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hashPasswordFromBcrypt,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender === 1 ? true : false,
            roleId: data.role,
          });
          resolve({
            errorCode: 0,
            message: "OK",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },

  deleteUser: (userId) => {
    return new Promise(async (resolve, reject) => {
      const user = await db.User.findOne({
        where: { id: userId },
      });

      if (!user)
        resolve({
          errorCode: 2,
          errorMessage: `The user isn't exist!`,
        });
      else {
        await db.User.destroy({
          where: { id: userId },
        });

        resolve({
          errorCode: 0,
          message: "Deleted",
        });
      }
    });
  },

  updateUserData: (userData) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!userData.id) {
          resolve({
            errorCode: 2,
            errorMessage: "Missing required parameters!",
          });
        }

        const user = await db.User.findOne({
          where: { id: userData.id },
        });

        if (user) {
          await db.User.update(
            {
              firstName: userData.firstName,
              lastName: userData.lastName,
              address: userData.address,
            },
            {
              where: { id: userData.id },
            }
          );

          resolve({
            errorCode: 0,
            message: "Updated",
          });
        } else {
          resolve({
            errorCode: 1,
            errorMessage: `User's not found!`,
          });
        }
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

const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    const hashPassword = bcrypt.hashSync(password, salt);
    resolve(hashPassword);
    try {
    } catch (error) {
      reject(error);
    }
  });
};

export default userService;
