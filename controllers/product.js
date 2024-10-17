const prisma = require("../config/prisma");

exports.create = async (req, res) => {
  try {
    const { title, description, price, quantity, categoryId, images } =
      req.body;
    const product = await prisma.product.create({
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        images: {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
        },
      },
    });
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.list = async (req, res) => {
  try {
    const { count } = req.params;
    const product = await prisma.product.findMany({
      take: parseInt(count), // show response by following count
      orderBy: { createdAt: "desc" }, // sort by createdAt (the latest comes first)
      include: {
        category: true,
        images: true,
      },
    });
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.update = async (req, res) => {
  try {
    // const product = await prisma.product.findMany();
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    res.send("Remove");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.listBy = async (req, res) => {
  try {
    res.send("listBy");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.searchFilters = async (req, res) => {
  try {
    const product = await prisma.product.findMany();
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
