import db from "../models/index";

const getHomePage = async (req, res) => {
  try {
    const data = await db.User.findAll();

    return res.render("homepage.ejs", { data: JSON.stringify(data) });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export { getHomePage };