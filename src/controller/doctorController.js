import doctorService from "../services/doctorService";

const doctorController = {
  getTopDoctorHome: async (req, res) => {
    let limit = req.query.limit;

    if (!limit) limit = 10;

    try {
      const doctors = await doctorService.getTopDoctorHome(+limit);
      return res.status(200).json(doctors);
    } catch (error) {
      console.log(error);
      return res.status(200).json({
        errorCode: -1,
        errorMessage: "Error from server...",
      });
    }
  },
};

export default doctorController;
