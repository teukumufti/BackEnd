const { Transaction, Products, User } = require("../../models");

exports.buyProducts = async (req, res) => {
  console.log(req.user);
  try {
    const data = req.body;
    const buyProduct = await Transaction.create({
      ...data,
      idBuyer: req.user.id,
    });

    res.status(200).send({
      status: "Success",
      message: "Buy Product Success",
      data: {
        transaction: {
          id: buyProduct.id,
          idProducts: buyProduct.idProducts,
          idBuyer: buyProduct.idBuyer,
          idSeller: buyProduct.idSeller,
          price: buyProduct.price,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: "Buy Products Failed",
      message: "Server Error",
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const data = await Transaction.findAll({
      attributes: {
        exclude: [
          "idProduct",
          "idBuyer",
          "idSeller",
          "createdAt",
          "updatedAt",
          "status",
        ],
      },
      include: [
        {
          model: Products,
          as: "product",
          attributes: {
            exclude: [
              "price",
              "qty",
              "idUser",
              "createdAt",
              "updatedAt",
              "status",
            ],
          },
        },
        {
          model: User,
          as: "buyer",
          attributes: {
            exclude: ["password", "idUser", "createdAt", "updatedAt"],
          },
        },
        {
          model: User,
          as: "seller",
          attributes: {
            exclude: ["password", "idUser", "createdAt", "updatedAt", "status"],
          },
        },
      ],
    });

    res.status(200).send({
      status: "Success",
      data: {
        transaction: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: "Get data Transactions Failed",
      message: "Server Error",
    });
  }
};
