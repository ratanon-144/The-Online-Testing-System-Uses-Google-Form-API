const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const {
  User,
  Course,
  Quiz,
  Question,
  Answer,
  sequelize,
} = require("../models/dataset");
const { Sequelize, QueryTypes, json } = require("sequelize");
const path = require("path");
const Op = Sequelize.Op;
const formidable = require("formidable");
const jwt = require("../jwt");

// create course
router.post("/courses", jwt.verify, async (req, res) => {
  try {
    const { name, id_code } = req.body;
    // Check if the authenticated user is an instructor
    if (req.level !== "instructor") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Find the instructor with the given username
    const instructor = await User.findOne({
      where: { username: req.username, level: "instructor" },
    });
    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }
    // Create the new course and associate it with the instructor
    const course = await instructor.createCourse({ name, id_code });
    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// update course
router.put("/courses/:id", jwt.verify, async (req, res) => {
  try {
    const courseId = req.params.id;
    const { name, id_code } = req.body;
    const isAuthorized = req.username && req.level === "instructor";
    if (!isAuthorized) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const course = await Course.findOne({ where: { id: courseId } });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    const instructor = await User.findOne({
      username: req.username,
      level: "instructor",
    });
    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }
    await course.update({ name, id_code, id: instructor.id });
    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// get course by ID
router.get("/courses/:id", jwt.verify, async (req, res) => {
  try {
    // Check if the authenticated user is an instructor
    if (req.level !== "instructor") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const instructor = await User.findOne({
      where: { username: req.username, level: "instructor" },
    });
    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }
    const course = await Course.findOne({
      where: { id: req.params.id },
      include: [User],
    });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    if (course.Users[0].id !== instructor.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const courseId = {
      id: course.id,
      id_code: course.id_code,
      name: course.name,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    };
    res.status(200).json(courseId);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// list courses
router.get("/courses", jwt.verify, async (req, res) => {
  try {
    const instructor = await User.findOne({
      where: { username: req.username, level: "instructor" },
    });
    if (!instructor)
      return res.status(404).json({ error: "Instructor not found" });

    const courses = await instructor.getCourses();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/courses/:courseId", jwt.verify, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const isAuthorized = req.username && req.level === "instructor";
    if (!isAuthorized) return res.status(401).json({ message: "Unauthorized" });
    const course = await Course.findOne({
      where: { id: courseId },
      include: { model: Quiz, include: { model: Question, include: Answer } },
    });
    if (!course) return res.status(404).json({ error: "Course not found" });
    await Promise.all(
      course.Quizzes.map(async (quiz) => {
        await Promise.all([
          Answer.destroy({
            where: {
              QuestionId: {
                [Sequelize.Op.in]: quiz.Questions.map(
                  (question) => question.id
                ),
              },
            },
          }),
          Question.destroy({ where: { QuizId: quiz.id } }),
          quiz.destroy(),
        ]);
      })
    );
    await course.destroy();
    res
      .status(200)
      .json({
        message:
          "Course and associated quizzes, questions, and answers deleted successfully.",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
/// add user to courses
 router.post("/courses/:courseId/users", jwt.verify, async (req, res) => {
   try {
     const { courseId } = req.params;
     const { username } = req.body;
     const isAuthorized = req.username && req.level === "instructor";
     if (!isAuthorized) return res.status(401).json({ message: "Unauthorized" });
     const course = await Course.findOne({ where: { id: courseId } });
     if (!course) return res.status(404).json({ error: "Course not found" });
     const existingUser = await User.findOne({ where: { username } });
     if (existingUser) return res.status(409).json({ message: "User already exists" });
     const user = await User.create({ username });
     const role = user.level;
     await course.addUser(user);
     const message = role === "student" ? "Student" : "Instructor";
     res.status(201).json({ message: `${message} added to course` });
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: "Server error" });
   }
 });

 // Route to get a list of students and instructors for a course
router.get("/courses/:courseId/users", jwt.verify, async (req, res) => {
  try {
    const { courseId } = req.params;
    const isAuthorized = req.username && req.level === "instructor";
    if (!isAuthorized) return res.status(401).json({ message: "Unauthorized" });
    const course = await Course.findOne({
      where: { id: courseId },
      include: [
        {
          model: User,
          through: { attributes: [] },
          attributes: ["id", "username", "email", "level", "fullname"],
        },
      ],
    });
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course.Users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to get a list of instructor enrolled in a course
router.get("/courses/:courseId/question", jwt.verify, async (req, res) => {
  try {
    const { courseId } = req.params;
    const isAuthorized = req.username && req.level === "instructor";
    if (!isAuthorized)  return res.status(401).json({ message: "Unauthorized" });
    const course = await Course.findOne({
      where: { id: courseId },
      include: [
        {
          model: User,
          through: { attributes: [] },
        },
        {
          model: Quiz,
          attributes: ["id", "name", "CourseId"],
          include: [
            {
              model: Question,
              attributes: ["id", "title", "QuizId"],
              include: [
                { model: Answer, attributes: ["id", "body", "isCorrect"] },
              ],
            },
          ],
        },
      ],
    });
    if (!course) return res.status(404).json({ error: "Course not found" });     
    res.json({ questions: course.Quizzes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
 
 // Create a new quiz with the given name and associate it with the course
router.post("/courses/:courseId/quizzes", jwt.verify, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const isAuthorized = req.username && req.level === "instructor";
    if (!isAuthorized) return res.status(401).json({ message: "Unauthorized" });
    const quiz = await Quiz.create({ name: req.body.name,CourseId: courseId});
    const course = await Course.findOne({where: { id: courseId }});
    await course.addQuiz(quiz);
    const questions = req.body.questions;
    for (const questionData of questions) {
      const question = await Question.create({title: questionData.title,QuizId: quiz.id});
      const answers = questionData.answers;
      for (const answerData of answers) {
        await Answer.create({
          body: answerData.body,
          isCorrect: answerData.isCorrect,
          QuestionId: question.id,
        }); }}
    res.status(201).json({ quiz });
  } catch (error) {
     res.status(500).json({ message: "Server error" });
  }
});

// Update Quiz: Allow instructors to update the name and questions of a quiz
router.put("/courses/:courseId/quizzes/:quizId", jwt.verify, async (req, res) => {
  try {
    const { courseId, quizId } = req.params;
    const isAuthorized = req.username && req.level === "instructor";
    if (!isAuthorized) return res.status(401).json({ message: "Unauthorized" });
    const quiz = await Quiz.findOne({
      where: { id: quizId, CourseId: courseId },
      include: { model: Question, include: Answer },
    });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    if (req.body.name) { 
      quiz.name = req.body.name;
      await quiz.save();
    }
    const questions = req.body.questions;
    if (questions) {
      await Answer.destroy({
        where: {QuestionId: { [Sequelize.Op.in]:quiz.Questions.map((question) => question.id)}}});
      await Question.destroy({ where: { QuizId: quizId }});
      for (const questionData of questions) {
        const question = await Question.create({
          title: questionData.title,
          QuizId: quizId,
        });
        for (const answerData of questionData.answers) {
          await Answer.create({
            body: answerData.body,
            isCorrect: answerData.isCorrect,
            QuestionId: question.id,
          });
        }
      }
    }
    res.status(200).json({ message: `Updated quiz with ID: ${quizId}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


router.delete(
  "/courses/:courseId/quizzes/:quizId",
  jwt.verify,
  async (req, res) => {
    try {
      // Get the course ID and quiz ID from the request parameters
      const courseId = req.params.courseId;
      const quizId = req.params.quizId;

      // Check if the authenticated user is an instructor of the course
      // You can implement your own authentication system to check this
      const isAuthorized = req.username && req.level === "instructor";
      if (!isAuthorized) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Delete the quiz and its associated questions and answers
      // Find the quiz with the given ID

      const quiz = await Quiz.findOne({
        where: {
          id: quizId,
          CourseId: courseId,
        },
        include: {
          model: Question,
          include: Answer,
        },
      });

      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      const question = await Question.findOne({
        where: { QuizId: quiz.id },
      });

      await Answer.destroy({
        where: {
          QuestionId: {
            [Sequelize.Op.in]: quiz.Questions.map((question) => question.id),
          },
        },
      });

      await Question.destroy({
        where: {
          QuizId: quiz.id,
        },
      });
      // Delete the quiz
      await quiz.destroy();

      res.status(200).json({
        message:
          "Quiz and associated questions and answers deleted successfully.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);
// Define a route to get a list of quizzes
router.get("/quizzes", async (req, res) => {
  try {
    // Query the Quiz model to get a list of quizzes
    const quizzes = await Quiz.findAll();

    // Return the list of quizzes as a JSON response
    res.json({ quizzes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
