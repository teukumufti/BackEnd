const { Products, User } = require("../../models/");

// add user
exports.addProduct = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    let newProduct = await Products.create({
      ...data,
      image: req.file.filename,
      idUser: req.user.id,
    });

    newProduct = JSON.parse(JSON.stringify(newProduct));

    newProduct = {
      ...newProduct,
      image: process.env.FILE_PATH + newProduct.image,
    };

    res.status(200).send({
      status: "Success",
      message: "Add Product Success",
      data: {
        newProduct,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Add Product Failed",
      message: "Server Error",
    });
  }
};

// get all user
exports.getProducts = async (req, res) => {
  try {
    let data = await Products.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "idUser", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

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
      message: "Failed to get product",
    });
  }
};

// get user by id
exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Products.findAll({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    res.send({
      status: "Success",
      data: {
        product: data,
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        image: process.env.FILE_PATH + item.image,
      };
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "Failed",
      message: "Failed to get product id",
    });
  }
};

// update User
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Products.update(req.body, {
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
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
      message: "Failed to update product",
    });
  }
};

//delete user
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Products.destroy({
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
      message: "Failed to delete product",
    });
  }
};
