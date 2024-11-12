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

export { getHomePage, getCRUD, postCRUD };
