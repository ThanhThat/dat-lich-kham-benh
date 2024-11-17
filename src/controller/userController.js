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
};

export default userController;
