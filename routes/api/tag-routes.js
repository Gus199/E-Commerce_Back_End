const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// find all tags and associated product data
router.get("/", async (req, res) => {
  try {
    const tagsData = await Tag.findAll({ include: [{ model: Product }] });
    if (!tagsData) {
      res.json(`No tags found`);
      return;
    }
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag (and associated product data) by its `id`
router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.json(`No tag found with that id`);
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    Tag.update(
      { tag_name: req.body.updated_tag_name },
      { where: { id: req.params.id } }
    );
    res
      .status(200)
      .json(
        `successfully updated tag ${req.params.id} to new name ${req.body.updated_tag_name}`
      );
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }

    res.status(200).json({
      data: tagData,
      message: `successfully deleted tag with id ${req.params.id}`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;