const models = require("../../models");

// add user
exports.addProduct = async (req, res) => {
  try {
    const data = await models.Products.create(req.body);

    res.status(201).send({
      status: "Success",
      data: {
        product: data,
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
exports.getProducts = async (req, res) => {
  try {
    const data = await models.Products.findAll();

    res.send({
      status: "Success",
      data: {
        products: data,
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
exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await models.Products.findAll({ where: { id } });

    res.send({
      status: "Success",
      data: {
        product: data,
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
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await models.Products.update(req.body, {
      where: { id },
    });

    res.send({
      status: "Success",
      message: `Update user id : ${id} success`,
      data: {
        products: req.body,
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
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await models.Products.destroy({
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
