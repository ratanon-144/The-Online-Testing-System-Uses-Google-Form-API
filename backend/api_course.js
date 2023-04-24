const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User, Course, Quiz, Question, Answer ,sequelize }  = require("./models/dataset");
const {Sequelize,QueryTypes, json } = require("sequelize");
const path = require("path"); 
const Op = Sequelize.Op;
const formidable = require("formidable");
const jwt = require("./jwt");
const constants = require("./constant");

 
// create course
router.post("/courses",jwt.verify, async (req, res) => {
  try {
    const { name, id_code } = req.body;
    
    // Check if the authenticated user is an instructor
    if (req.level !== 'instructor') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Find the instructor with the given username
    const instructor = await User.findOne({ where: { username: req.username, level: "instructor" } });

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

 
// // Update Product
// router.put("/courses", jwt.verify, async (req, res) => {
//   try { 
//     var form = new formidable.IncomingForm();
//     form.parse(req, async (err, fields, files) => {
//          // Check if the authenticated user is an instructor
//     if (req.level !== "instructor") {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     // Find the course with the given id
//     const course = await Course.findOne({ where: { id: req.params.id } });

//     if (!course) {
//       return res.status(404).json({ error: "Course not found" });
//     }

//     // Check if the authenticated user is the instructor of the course
//     const instructor = await User.findOne({
//       where: { username: req.username, level: "instructor" },
//     });

//     if (!instructor || !(await instructor.hasCourse(course))) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//       let result = await course.update(fields, { where: { id: fields.id } });
      
//       res.json({
//         result: constants.kResultOk,
//         message: JSON.stringify(result),
//       });
//     });
//   } catch (err) {
//     res.json({ result: constants.kResultNok, message: JSON.stringify(err) });
//   }
// });
 


 // update course
router.put('/courses/:id', jwt.verify, async (req, res) => {
  try {
    const courseId = req.params.id;
    const { name, id_code } = req.body;

    // Check if the authenticated user is an instructor of the course
    // You can implement your own authentication system to check this
    const isAuthorized = req.username && req.level === 'instructor';
    if (!isAuthorized) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Find the course with the given ID
    const course = await Course.findOne({ where: { id: courseId } });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Find the instructor with the given ID
    const instructor = await User.findOne({ username: req.username, level: "instructor"  });
    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found' });
    }

    // Update the course name, id_code and instructor
    await course.update({ name, id_code, id:instructor.id });

    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// get course by ID
router.get("/courses/:id", jwt.verify, async (req, res) => {
  try {
    let courseId ={};
    // Check if the authenticated user is an instructor
    if (req.level !== 'instructor') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
 
    // Find the instructor with the given username
    const instructor = await User.findOne({ where: { username: req.username, level: "instructor" } });

    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    // Get the course with the given ID associated with the instructor
    const course = await Course.findOne({ where: { id: req.params.id }, include: [User] });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if the authenticated user is the instructor who created the course
    if (course.Users[0].id !== instructor.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    courseId =  {
      id: course.id,
      id_code: course.id_code,
      name: course.name,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt
    }
    res.status(200).json(courseId);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});



// list courses
router.get("/courses",jwt.verify, async (req, res) => {
  try {
    // Check if the authenticated user is an instructor
    if (req.level !== 'instructor') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
 
    // Find the instructor with the given username
    const instructor = await User.findOne({ where: { username: req.username, level: "instructor" } });

    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    // Get all the courses associated with the instructor
    const courses = await instructor.getCourses();

    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

 

// delete course
router.delete('/courses/:courseId', jwt.verify, async (req, res) => {
  try {
    
    // Get the course ID from the request parameters
    const courseId = req.params.courseId;

    // Check if the authenticated user is an instructor of the course
    // You can implement your own authentication system to check this
    const isAuthorized = req.username && req.level === 'instructor';
    if (!isAuthorized) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Find the course with the given ID
    const course = await Course.findOne({
      where: { id: courseId },
      include: {
        model: Quiz,
        include: {
          model: Question,
          include: Answer
        }
      }
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Delete all quizzes, questions, and answers associated with the course
    for (const quiz of course.Quizzes) {
      await Answer.destroy({
        where: {
          QuestionId: {
            [Sequelize.Op.in]: quiz.Questions.map(question => question.id)
          }
        }
      });

      await Question.destroy({
        where: {
          QuizId: quiz.id
        }
      });

      await quiz.destroy();
    }

    // Delete the course
    await course.destroy();

    res.status(204).json({ message: 'Course and associated  Quiz , questions and answers deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


/// Create the add students to course ||instructor 
router.post("/courses/:courseId/students",jwt.verify, async (req, res) => {

  try {
    const { courseId } = req.params;
    const { username } = req.body;
  
        // Check if the authenticated user is an instructor of the course
    // You can implement your own authentication system to check this
    const isAuthorized = req.username && req.level === 'instructor';
    if (!isAuthorized) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Find the course with the given ID
    const course = await Course.findOne({ where: { id: courseId } });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Find the student with the given email
    const student = await User.findOne({ where: { username, level: "student" } });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Associate the student with the course
     await course.addUser(student);
    //await course.bulkCreate(course);

    res.status(201).json({ message: "Student added to course" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


/// Create the add instructor to course ||instructor 
router.post("/courses/:courseId/instructors", jwt.verify,async (req, res) => {
  try { 
     const { courseId } = req.params;
      const { username } = req.body;
        // Check if the authenticated user is an instructor of the course
    // You can implement your own authentication system to check this
    const isAuthorized = req.username && req.level === 'instructor';
    if (!isAuthorized) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Find the course with the given ID
    const course = await Course.findOne({ where: { id: courseId } });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Find the instructor with the given email
    const instructor = await User.findOne({ where: { username, level: "instructor" } });

    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    // Associate the instructor with the course
    await course.addUser(instructor);

    res.status(201).json({ message: "Instructor added to course" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
 
// Route to get a list of students enrolled in a course
router.get("/courses/:courseId/students",jwt.verify, async (req, res) => {
  try {
    const { courseId } = req.params;
     // Check if the authenticated user is an instructor of the course
    // You can implement your own authentication system to check this
    const isAuthorized = req.username && req.level === 'instructor';
    if (!isAuthorized) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Find the course with the given ID
    const course = await Course.findOne({
      where: { id: courseId },
      include: [
        {
          model: User,
          through: { attributes: [] }, // don't include Enrollment attributes
          where: { level: "student" }, // only include students
        }
      ],
    });
    
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const students = course.Users;

    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to get a list of instructors for a course
router.get("/courses/:courseId/instructors",jwt.verify, async (req, res) => {
  try {
    const { courseId } = req.params;

    // Check if the authenticated user is an instructor of the course
    // You can implement your own authentication system to check this
    const isAuthorized = req.username && req.level === 'instructor';
    if (!isAuthorized) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Find the course with the given ID
    const course = await Course.findOne({
      where: { id: courseId },
      include: [
        {
          model: User,
          through: { attributes: [] }, // don't include Enrollment attributes
          where: { level: "instructor" }, // only include instructors
        }
      ],
    });
    
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const instructors = course.Users;

    res.json(instructors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// Route to get a list of instructor enrolled in a course  
router.get("/courses/:courseId/question",jwt.verify, async (req, res) => {
  try {
    const { courseId } = req.params;
     // Check if the authenticated user is an instructor of the course
    // You can implement your own authentication system to check this
    const isAuthorized = req.username && req.level === 'instructor';
    if (!isAuthorized) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Find the course with the given ID
    const course = await Course.findOne({
      where: { id: courseId },
      include: [
        {
          model: User,
          through: { attributes: [] }, // don't include Enrollment attributes
              
        },
        {
          model: Quiz,
          include: [
            {
              model: Question,
              include: [Answer],
            },
          ],
        },
      ],
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }  
    res.json({questions:course.Quizzes});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/// Create a new quiz with the given name and associate it with the course
router.post('/courses/:courseId/quizzes', jwt.verify,async (req, res) => {
  try {
    // Get the course ID from the request parameters
    const courseId = req.params.courseId;
    // Check if the authenticated user is an instructor of the course
    // You can implement your own authentication system to check this
    const isAuthorized = req.username && req.level === 'instructor';
    if (!isAuthorized) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Create the quiz with the given name and course ID
    const quiz = await Quiz.create({
      name: req.body.name,
      CourseId: courseId
    });

    // Get the course associated with the quiz
    const course = await Course.findOne({
      where: { id: courseId }
    });

    // Associate the quiz with the course
    await course.addQuiz(quiz);

    // Add questions and answers to the quiz
    const questions = req.body.questions;
    for (const questionData of questions) {
      // Create the question
      const question = await Question.create({
        title: questionData.title,
        QuizId: quiz.id
      });

      // Add answers to the question
      const answers = questionData.answers;
      for (const answerData of answers) {
        await Answer.create({
          body: answerData.body,
          isCorrect: answerData.isCorrect,
          QuestionId: question.id
        });
      }
    }

    res.status(201).json({ quiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Update Quiz: Allow instructors to update the name and questions of a quiz
router.put('/courses/:courseId/quizzes/:quizId', jwt.verify, async (req, res) => {
  try {
    // Get the course ID and quiz ID from the request parameters
    const courseId = req.params.courseId;
    const quizId = req.params.quizId;

    // Check if the authenticated user is an instructor of the course
    // You can implement your own authentication system to check this
    const isAuthorized = req.username && req.level === 'instructor';
    if (!isAuthorized) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Find the quiz associated with the course
    const quiz = await Quiz.findOne({
      where: {
        id: quizId,
        CourseId: courseId
      },
      include: {
        model: Question,
        include: Answer
      }
    });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Update the quiz name if provided
    if (req.body.name) {
      quiz.name = req.body.name;
      await quiz.save();
    }

    // Update the questions and answers if provided
    const questions = req.body.questions;
    if (questions) {
      // Delete existing questions and answers
      await Answer.destroy({
        where: {
          QuestionId: {
            [Sequelize.Op.in]: quiz.Questions.map(question => question.id)
          }
        }
      });

      await Question.destroy({
        where: {
          QuizId: quizId
        }
      });

      // Create new questions and answers
      for (const questionData of questions) {
        const question = await Question.create({
          title: questionData.title,
          QuizId: quizId
        });

        for (const answerData of questionData.answers) {
          await Answer.create({
            body: answerData.body,
            isCorrect: answerData.isCorrect,
            QuestionId: question.id
          });
        }
      }
    }

    res.status(200).json({ quiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});




router.delete('/courses/:courseId/quizzes/:quizId', jwt.verify, async (req, res) => {
  try {
    // Get the course ID and quiz ID from the request parameters
    const courseId = req.params.courseId;
    const quizId = req.params.quizId;

    // Check if the authenticated user is an instructor of the course
    // You can implement your own authentication system to check this
    const isAuthorized = req.username && req.level === 'instructor';
    if (!isAuthorized) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Delete the quiz and its associated questions and answers
   // Find the quiz with the given ID
 
   const quiz = await Quiz.findOne({
    where: {
      id: quizId,
      CourseId: courseId
    },
    include: {
      model: Question,
      include: Answer
    }
  });
 
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    const question = await  Question.findOne({
      where: {QuizId: quiz.id }
    });
 
   await Answer.destroy({
    where: {
      QuestionId: {
        [Sequelize.Op.in]: quiz.Questions.map(question => question.id)
      }
    }
  });
    
    await Question.destroy({
      where: {
        QuizId: quiz.id
      }
    });
    // Delete the quiz
     await quiz.destroy();


    res.status(200).json({ message: 'Quiz and associated questions and answers deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Define a route to get a list of quizzes
router.get('/quizzes', async (req, res) => {
  try {
    // Query the Quiz model to get a list of quizzes
    const quizzes = await Quiz.findAll();

    // Return the list of quizzes as a JSON response
    res.json({ quizzes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
 

module.exports = router;
