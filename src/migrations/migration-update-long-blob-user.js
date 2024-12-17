module.exports = {
  up: function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return Promise.all([
      queryInterface.changeColumn("users", "image", {
        type: Sequelize.BLOB("long"),
        allowNull: true,
      }),
    ]);
  },

  // down: function (queryInterface, Sequelize) {
  //   // logic for reverting the changes

  //   return Promise.all([
  //     queryInterface.removeColumn(
  //       "user",
  //       "image",
  //       { type: Sequelize.BLOB, allowNull: true },
  //       { transaction }
  //     ),
  //   ]);
  // },
};
