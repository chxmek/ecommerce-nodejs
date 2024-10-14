const prisma = require("../config/prisma");

exports.create = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const product = await prisma.product.create({
      where: {
        title: title,
        description: description,
        price: price,
        quantity: quantity,
        categoryId: categoryId,
        images: images,
      },
    });
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
