


// router.post("/login", async (req, res) => {
//   try {
//     let profile = {};  
//   const { username, password } = req.body;
//   let result = await User.findOne({ where: { username: username } });
//   const { level, title,firstname , lastname ,email } = result;
//   if (result != null) {
//     if (bcrypt.compareSync(password, result.password)) {
//       const payload = { username };
//       const token = jwt.sign(payload); 
//       profile ={
//         token:token,
//         username:username,
//         level: level,
//         title:  title, 
//         firstname: firstname ,
//          lastname: lastname,
//         email: email
//       } } else {
//       res.json({ result: constants.kResultNok, message: "Incorrect password" });
//     }
//   } else {
//     res.json({ result: constants.kResultNok, message: "Incorrect username" });
//   }res.json({ result: constants.kResultOk, message: {...profile}  });
// } catch (error) {
//     res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
//   }
// });
 