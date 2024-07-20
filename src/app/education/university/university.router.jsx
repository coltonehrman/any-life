import { Chance } from "chance";
import { CourseView } from "./courses/course.view.js";
import { CoursesView } from "./courses/courses.view.js";
import { FacultyView } from "./faculty/faculty.view.js";
import { Money } from "../../items/money.model.js";
import { StudentsView } from "./students/students.view";
import { UniversityView } from "./university.view.js";
import express from "express";
import { getPlayerById } from "../../player/players.data.js";
import { html } from "../../../utils.js";
import { universityStudent } from "../_utils/student.factory";

const chance = new Chance();

export const universityRouter = express.Router();

universityRouter.get("/", function (req, res) {
  const universityView = new UniversityView();
  const player = getPlayerById(req.session.playerId);

  return res.send(universityView.print({ player }));
});

universityRouter.post("/enroll", function (req, res) {
  const player = getPlayerById(req.session.playerId);
  const { major } = req.body;

  const faculity = () => ({
    id: crypto.randomUUID(),
    name: chance.name(),
    gender: chance.gender(),
    age: chance.integer({ min: 21, max: 65 }),
    relationship: chance.integer({ min: 0, max: 100 }),
    looks: chance.integer({ min: 0, max: 100 }),
    grades: chance.integer({ min: 0, max: 100 }),
    popularity: chance.integer({ min: 0, max: 100 }),
  });

  player.education.university = {
    enrolled: true,
    courses: [
      {
        course: "Math",
        progress: 0,
        level: 1,
      },
      {
        course: "Science",
        progress: 0,
        level: 1,
      },
      {
        course: "English",
        progress: 0,
        level: 1,
      },
      {
        course: "History",
        progress: 0,
        level: 1,
      },
      {
        course: major,
        progress: 0,
        level: 1,
      },
    ],
    popularity: chance.integer({ min: 0, max: 100 }),
    students: chance.n(universityStudent, 10),
    faculty: chance.n(faculity, 10),
  };

  const Result = () => (
    <div id="popup-result" style="display: flex;" class="popup-backdrop">
      <div class="popup-box">
        <h1>Scholar</h1>
        <p>You are now enrolled in university.</p>
      </div>

      <div class="popup-bottom-text">Tap anywhere to continue</div>
    </div>
  );

  return res.send(Result()._ssr);
});

universityRouter.post("/dropout", function (req, res) {
  const player = getPlayerById(req.session.playerId);

  player.education.university = null;

  return res.send(html`
    <div id="popup-result" style="display: flex;" class="popup-backdrop">
      <div class="popup-box">
        <h1>Drop out</h1>
        <p>You dropped out of college.</p>
      </div>

      <div class="popup-bottom-text">Tap anywhere to continue</div>
    </div>
  `);
});

universityRouter.get("/students", function (req, res) {
  const studentsView = new StudentsView();
  const player = getPlayerById(req.session.playerId);

  return res.send(studentsView.print({ player }));
});

universityRouter.get("/faculty", function (req, res) {
  const faculityView = new FacultyView();
  const player = getPlayerById(req.session.playerId);

  return res.send(faculityView.print({ player }));
});

universityRouter.get("/courses", function (req, res) {
  const coursesView = new CoursesView();
  const player = getPlayerById(req.session.playerId);

  if (!player.education) return res.redirect("/game/education");

  return res.send(coursesView.print({ player }));
});

universityRouter.get("/courses/:course", function (req, res) {
  const courseView = new CourseView();
  const player = getPlayerById(req.session.playerId);

  let course = player.education.university.courses.find(
    (c) => c.course === req.params.course
  );

  return res.send(
    courseView.print({
      player,
      course: req.params.course,
      disabled: course.done || player.timeTokens <= 0,
      progress: course.progress,
      level: course.level,
      courseHeadingText: req.params.course,
    })
  );
});

universityRouter.post("/courses/:course/tutor", function (req, res) {
  const player = getPlayerById(req.session.playerId);

  const course = player.education.university.courses.find(
    (c) => c.course === req.params.course
  );

  player.cash = player.cash.subtract(
    new Money({
      dollars: 50,
    })
  );

  course.progress += 20;

  if (course.progress >= 100) {
    course.progress = 0;
    course.level += 1;
  }

  if (course.level === 5) {
    course.done = true;
  }

  player.timeTokens -= 1;

  return res.send(html`
    <div id="popup-result" style="display: flex;" class="popup-backdrop">
      <div class="popup-box">
        <h1>Tutoring</h1>
        <p>
          You got help with a tutor in ${req.params.course} and gained 20%
          progress.
        </p>
        <p>You paid the tutor $50.00.</p>
      </div>

      <div class="popup-bottom-text">Tap anywhere to continue</div>
    </div>

    <div
      id="course-progress"
      hx-swap-oob="outerHTML:#course-progress"
      class="progress-fill"
      style="width: ${course.progress}%;"
    ></div>

    <span id="course-level" hx-swap-oob="outerHTML:#course-level"
      >Level ${course.level}</span
    >
  `);
});

universityRouter.post("/courses/:course/study", function (req, res) {
  const player = getPlayerById(req.session.playerId);

  const course = player.education.university.courses.find(
    (c) => c.course === req.params.course
  );

  course.progress += 10;

  if (course.progress >= 100) {
    course.progress = 0;
    course.level += 1;
  }

  player.timeTokens -= 1;

  return res.send(html`
    <div id="popup-result" style="display: flex;" class="popup-backdrop">
      <div class="popup-box">
        <h1>Study</h1>
        <p>You studied ${req.params.course} and gained 10% progress.</p>
      </div>

      <div class="popup-bottom-text">Tap anywhere to continue</div>
    </div>

    <div
      id="course-progress"
      hx-swap-oob="outerHTML:#course-progress"
      class="progress-fill"
      style="width: ${course.progress}%;"
    ></div>

    <span id="course-level" hx-swap-oob="outerHTML:#course-level"
      >Level ${course.level}</span
    >
  `);
});
