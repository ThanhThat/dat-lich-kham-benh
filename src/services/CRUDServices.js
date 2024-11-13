import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import db from "../models/index";

const CRUDServices = {
  createNewUser: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
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
        resolve("ok create a new user success!");
      } catch (error) {
        reject(error);
      }
    });
  },

  getAllUser: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const allUser = await db.User.findAll();
        resolve(allUser);
      } catch (error) {
        reject(error);
      }
    });
  },

  getUserInfoById: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db.User.findOne({
          where: {
            id: userId,
          },
          raw: true,
        });

        if (user) resolve(user);
        else resolve({});
      } catch (error) {
        reject(error);
      }
    });
  },

  updateUserData: async (userData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = db.User.findOne({
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

          const allUsers = await db.User.findAll();

          resolve(allUsers);
        } else {
          resolve("user does not exist");
        }
      } catch (error) {
        reject(error);
      }
    });
  },

  deleteUserById: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db.User.findOne({
          where: {
            id: userId,
          },
        });

        if (user) await user.destroy();

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },
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

export default CRUDServices;
