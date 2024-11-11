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
        keyRole: "R1",
        typeRole: "ROLE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
