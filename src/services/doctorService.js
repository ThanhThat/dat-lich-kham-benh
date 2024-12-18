import db from "../models/index";

const doctorService = {
  getTopDoctorHome: (limitInput) => {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await db.User.findAll({
          limit: limitInput,
          order: [["createdAt", "DESC"]],
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.AllCode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.AllCode,
              as: "genderData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          where: {
            roleId: "R2",
          },
          raw: true,
          nest: true,
        });

        resolve({
          errorCode: 0,
          data: users,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

export default doctorService;
