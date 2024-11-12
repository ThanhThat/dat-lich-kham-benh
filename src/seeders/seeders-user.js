"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "admin@gmail.com",
        lastName: "That",
        firstName: "Thach Thanh",
        password: "123456",
        address: "Bac Lieu",
        gender: 1,
        roleId: 1,
        phoneNumber: "0942906190",
        positionId: 1,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
