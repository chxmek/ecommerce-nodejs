exports.create = async (req, res) => {
  try {
    res.send("Hello Category");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.list = async (req, res) => {
  try {
    res.send("Hello List Category");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    res.send("Hello Remove Category : " + id);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
