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
  console.log("Check all users: ");
  console.log(allUser);
  return res.render("displayCRUD.ejs", {
    data: allUser,
  });
};

export { getHomePage, getCRUD, postCRUD, displayGetCRUD };
