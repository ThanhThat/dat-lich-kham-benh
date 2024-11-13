import db from "../models/index";
import CRUDServices from "../services/CRUDServices";

const getHomePage = async (req, res) => {
  try {
    const data = await db.User.findAll();

    return res.render("homepage.ejs", { data: JSON.stringify(data) });
  } catch (error) {
    console.log("Error: ", error);
  }
};

const getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

const postCRUD = async (req, res) => {
  const message = await CRUDServices.createNewUser(req.body);
  console.log(message);
  return res.send("Post crud form server");
};

const displayGetCRUD = async (req, res) => {
  const allUser = await CRUDServices.getAllUser({ raw: true });

  return res.render("displayCRUD.ejs", {
    data: allUser,
  });
};

const getEditCRUD = async (req, res) => {
  const userId = req.query.id;

  if (userId) {
    const userData = await CRUDServices.getUserInfoById(userId);
    return res.render("editCRUD.ejs", { data: userData });
  } else {
    return res.send("User not found!");
  }
};

const putCRUD = async (req, res) => {
  const data = req.body;
  const allUsers = await CRUDServices.updateUserData(data);
  return res.render("displayCRUD.ejs", {
    data: allUsers,
  });
};

const deleteCRUD = async (req, res) => {
  const userId = req.query.id;

  if (userId) {
    await CRUDServices.deleteUserById(userId);
    const allUsers = await CRUDServices.getAllUser();
    return res.render("displayCRUD.ejs", {
      data: allUsers,
    });
  } else {
    return res.send("User not found!");
  }
};

export {
  deleteCRUD,
  getHomePage,
  putCRUD,
  getCRUD,
  postCRUD,
  displayGetCRUD,
  getEditCRUD,
};
