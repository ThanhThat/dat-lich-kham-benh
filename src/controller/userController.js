import userService from "../services/userService";

const userController = {
  handleLogin: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ errorCode: 1, message: "Missing inputs parameter" });
    }

    const userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
      errorCode: userData.errorCode,
      message: userData.errorMessage,
      user: userData.user ? userData.user : {},
    });
  },

  handleGetAllUsers: async (req, res) => {
    const id = req.body.id;

    if (!id) {
      return res.status(200).json({
        errorCode: 1,
        errorMessage: "Missing required parameters",
        users: [],
      });
    }
    const users = await userService.getAllUsers(id);

    return res.status(200).json({
      errorCode: 0,
      errorMessage: "OK",
      users,
    });
  },
};

export default userController;
