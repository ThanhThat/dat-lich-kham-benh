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
