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
    const id = req.query.id;

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

  handleCreateNewUser: async (req, res) => {
    const message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
  },

  handleEditUser: async (req, res) => {
    const data = req.body;
    const message = await userService.updateUserData(data);

    return res.status(200).json(message);
  },

  handleDeleteUser: async (req, res) => {
    if (!req.body.id) {
      return res.status(200).json({
        errorCode: 1,
        errorMessage: "Missing required parameters!",
      });
    }

    const message = await userService.deleteUser(req.body.id);

    return res.status(200).json(message);
  },

  getAllCode: async (req, res) => {
    try {
      const data = await userService.getAllCodeService(req.query.type);
      return res.status(200).json(data);
    } catch (error) {
      console.log("Get all code error: ", error);
      return res.status(200).json({
        errorCode: -1,
        errorMessage: "Error from server",
      });
    }
  },
};

export default userController;
