const models = require("../../models");

// add user
exports.addCategory = async (req, res) => {
  try {
    const data = await models.Category.create(req.body);

    res.status(201).send({
      status: "Success",
      data: {
        category: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "Failed",
      message: "Failed to add data",
    });
  }
};

// get all user
exports.getCategories = async (req, res) => {
  try {
    const data = await models.Category.findAll();

    res.send({
      status: "Success",
      data: {
        categories: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "Failed",
      message: "Failed to get user",
    });
  }
};

// get user by id
exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await models.Category.findAll({ where: { id } });

    res.send({
      status: "Success",
      data: {
        category: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "Failed",
      message: "Failed to get id",
    });
  }
};

// update User
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await models.Category.update(req.body, {
      where: { id },
    });

    res.send({
      status: "Success",
      message: `Update user id : ${id} success`,
      data: {
        category: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "Failed",
      message: "Failed to update user",
    });
  }
};

//delete user
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await models.Category.destroy({
      where: { id },
    });

    res.send({
      status: "Success",
      data: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "Failed",
      message: "Failed to delete user",
    });
  }
};
