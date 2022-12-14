const router = require("express").Router();
const { Workout } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/workout", withAuth, async (req, res) => {
  Workout.findAll({
    attributes: [
      'id',
      'name',
      'body_part',
      'level',
      'repetitions',
      'sets',
      'video',
      'gif'
    ]
  })
  .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  // try {
  //   const newFavorite = await Workout.create({
  //     ...req.body,
  //     user_id: req.session.user_id,
  //   });

  //   res.status(200).json(newFavorite);
//   } catch (err) {
//     res.status(400).json(err);
//   }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const workoutData = await Workout.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!workoutData) {
      res.status(404).json({ message: "No workout found with this id!" });
      return;
    }

    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
