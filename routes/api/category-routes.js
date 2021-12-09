const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// find all categories and associated products
router.get("/", async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      include: [{ model: Product }],
    });
    if (!categoriesData) {
      res.json("No categories found");
      return;
    }
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value and include it's associated products
router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(400).json("Category ID not found");
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a category by its `id` value

router.put("/:id", (req, res) => {
  try {
    Category.update(
      { category_name: req.body.updated_category_name },
      { where: { id: req.params.id } }
    );
    res.status(200).json(`successfully updated category ${req.params.id} to new name ${req.body.updated_category_name}`
      );
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json({
      data: categoryData,
      message: `successfully deleted category with id ${req.params.id}`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;