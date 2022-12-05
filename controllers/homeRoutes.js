const router = require("express").Router();
const { Workout, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  //try {
  // Get all workouts and JOIN with user data
  //second await 18
  //const readerData = await Reader.findAll({
  // This will retrieve every Reader's associated LibraryCard data. In SQL, this would be a JOIN function.
  //   include: [{ model: LibraryCard }],
  // });
  const workoutData = await Workout.findAll({
    // where: {
    //   body_part: 'Back, Abs'
    // },
    include: [{ model: User }],
  });

  // Serialize data so the template can read it
  const workouts = await workoutData.map((workout) => workout.get({ plain: true }));
  //console.log(19, workouts)
  // Pass serialized data and session flag into template
  res.render("homepage", {
    workouts,
    logged_in: req.session.logged_in,
  });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

// router.get("/workout/:id", async (req, res) => {
//   try {
//     const workoutData = await Workout.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ["name"],
//         },
//       ],
//     });

//     const workout = workoutData.get({ plain: true });

//     res.render("workout", {
//       ...workout,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Workout }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

router.post('/testPost', async (req, res) => {
  console.log(req.body)
  const workoutData = await Workout.findAll({
    where: {
      body_part: req.body.body_part
    },
    include: [{ model: User }],
  });

  // Serialize data so the template can read it
  const workouts = await workoutData.map((workout) => workout.get({ plain: true }));
  //console.log(19, workouts)
  // Pass serialized data and session flag into template
  console.log(98, workouts)
  res.json(workouts)
})

module.exports = router;
