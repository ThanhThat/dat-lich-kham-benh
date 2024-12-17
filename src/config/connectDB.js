const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("dat_lich_kham_benh", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,

  dialectOptions: {
    // Thiết lập maxAllowedPacket
    maxAllowedPacket: 64 * 1024 * 1024, // 64MB
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connectDB;
