import { Chance } from "chance";
import { LifeEventPopup } from "./events/life-event.view";
import { Money } from "../items/money.model";
import NPC from "../npcs/npc.model.js";
import { NewFriendPopup } from "../relationships/popups/new-friend.view";
import { NewSchoolPopup } from "../education/popups/new-school.view";
import OpenAI from "openai";
import { YearlySalaryIncome } from "../work/full-time/popups/salary.view";
import express from "express";
import { getPlayerById } from "../player/players.data.js";

const chance = new Chance();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const lifeRouter = express.Router();

const openAiPrompt = (
  age
) => `You are an AI designed to create random life events for a game. The events should be engaging and appropriate for the character's age. Each event should include a unique category, title, description, and 2-4 selectable options with corresponding responses. Consider the character's developmental stage, interests, and typical life experiences at each age. Below are the details:

1. **Category:** The context of the event (e.g., Education, Family, Social, Career, Health, etc.).
2. **Title:** A short, descriptive title for the event.
3. **Description:** A brief scenario that the character encounters.
4. **Options:** 2-4 choices the player can make, each with a unique outcome.
5. **Responses:** Consequences of each choice, impacting the character's attributes or relationships.

**Age-Based Guidelines:**

- **Age 1-5:** Focus on early childhood experiences like playing, making friends, starting school, and exploring.
- **Age 6-12:** Include school activities, hobbies, family events, and early social interactions.
- **Age 13-18:** Cover teenage experiences such as high school, friendships, first jobs, and personal growth.
- **Age 19-25:** Address young adulthood, including college, careers, relationships, and independence.
- **Age 26-40:** Focus on career advancements, family life, health, and major life decisions.
- **Age 41-60:** Include midlife experiences, such as career changes, family dynamics, health, and personal achievements.
- **Age 61+:** Cover later life events like retirement, hobbies, family, and health challenges.

**Examples:**

- **Age 4:**
  {
    "age": 4,
    "category": "Social",
    "title": "Playground Fun",
    "description": "You are at the playground and see a group of kids playing tag.",
    "options": [
      {
        "option": "Join the game",
        "response": "You make new friends and have a great time."
      },
      {
        "option": "Watch from a distance",
        "response": "You feel a bit left out but enjoy observing."
      },
      {
        "option": "Play on the swings instead",
        "response": "You have fun on your own and feel relaxed."
      }
    ]
  }

- **Age 16:**
{
  "age": 16,
  "category": "Education",
  "title": "Exam Stress",
  "description": "You have a big exam coming up, but you also have a party invitation for the same night.",
  "options": [
    {
      "option": "Study for the exam",
      "response": "You ace the exam but miss out on the party."
    },
    {
      "option": "Go to the party",
      "response": "You have a great time but perform poorly on the exam."
    },
    {
      "option": "Try to balance both",
      "response": "You enjoy the party and manage to pass the exam, but you are exhausted."
    }
  ]
}

{
  "age": <age>,
  "category": "<category>",
  "title": "<title>",
  "description": "<description>",
  "options": [
    {
      "option": "<option 1>",
      "response": "<response 1>"
    },
    {
      "option": "<option 2>",
      "response": "<response 2>"
    }
  ]
}

Do not include any additional formattings in the content response, just pure JSON format and data.

The character age is ${age} years old.`;

async function generateNewLifeEvent(player, currentAge) {
  console.log(player.lifeChoices);

  try {
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: openAiPrompt(currentAge),
            },
          ],
        },
      ],
      temperature: 1.25,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0.25,
      presence_penalty: 0.25,
    });

    const aiMessage = aiResponse.choices[0].message;
    console.log(aiMessage.content);

    const json = JSON.parse(aiMessage.content);

    player.lifeChoices.push({
      id: crypto.randomUUID(),
      showAtAge: currentAge,
      heading: json.title,
      data: json,
      body: (
        <>
          <p class="text-white">{json.description}</p>
          <p class="text-white">What will you choose?</p>
        </>
      ),
      choices: json.options.map((o) => o.option),
      view: LifeEventPopup,
      select: (choice) => {
        const selectedOption = json.options.find(o => o.option === choice);
        return selectedOption?.response;
      },
      selected: null,
    });
  } catch (e) {
    console.error(e);
  }
}

lifeRouter.post("/life-event", function (req, res) {
  const player = getPlayerById(req.session.playerId);

  if (player.dead) {
    req.session = null;
    return res.redirect("/game/start");
  }

  player.age += 1;

  generateNewLifeEvent(player, player.age + 1);

  for (const type of Object.keys(player.family)) {
    const members = player.family[type] ?? [];
    for (const person of members) {
      person.age += 1;
    }
  }

  const npcs = player.contacts
    .concat(player.education?.kindergarden?.students ?? [])
    .concat(player.education?.kindergarden?.faculty ?? [])
    .concat(player.education?.elementary?.students ?? [])
    .concat(player.education?.elementary?.faculty ?? [])
    .concat(player.education?.middleschool?.students ?? [])
    .concat(player.education?.middleschool?.faculty ?? [])
    .concat(player.education?.highschool?.students ?? [])
    .concat(player.education?.highschool?.faculty ?? [])
    .concat(player.education?.university?.students ?? [])
    .concat(player.education?.university?.faculty ?? [])
    .concat(
      player.jobs
        .filter((j) => j.type === "Full-Time")
        .flatMap((j) => j.employees) ?? []
    );

  for (const npc of npcs) {
    npc.age += 1;
  }

  player.storyLog.push(<b>----- Age {player.age} -----</b>);

  if (player.age === player.lifeSpan) {
    player.storyLog.push(<b>---- Death -----</b>);
    player.dead = true;
  }

  const faculity = () => {
    const teacher = new NPC({
      age: chance.integer({ min: 21, max: 65 }),
    });

    teacher.actions["ACT_UP"] = true;

    return teacher;
  };

  if (player.age === 2) {
    const student = () =>
      new NPC({
        age: chance.integer({ min: 2, max: 4 }),
      });

    player.education.kindergarden = {
      enrolled: true,
      popularity: chance.integer({ min: 0, max: 100 }),
      grades: chance.integer({ min: 0, max: 100 }),
      students: chance.n(student, 5),
      faculty: chance.n(faculity, 5),
    };

    player.lifeChoices.push({
      id: crypto.randomUUID(),
      name: "Kindergarden",
      type: "Public",
      level: "Kindergarden",
      years: 3,
      view: NewSchoolPopup,
      selected: null,
    });

    player.storyLog.push(`You started kindergarden.`);
  } else if (player.age === 3) {
    const friend = new NPC({
      age: chance.integer({ min: 2, max: 4 }),
    });

    friend.profession = null;
    friend.actions["BEFRIEND"] = false;
    friend.actions["UNFRIEND"] = true;
    friend.actions["ASK_OUT"] = true;

    player.lifeChoices.push({
      ...friend,
      view: NewFriendPopup,
      selected: null,
    });

    player.storyLog.push(`${friend.name} wants to become friends with you.`);
  } else if (player.age === 4) {
    player.lifeChoices.push({
      id: crypto.randomUUID(),
      heading: "Jump Around",
      body: (
        <>
          <p class="text-white">
            While at the park, you see many interesting things you want to jump
            in.
          </p>
          <p class="text-white">What will you choose?</p>
        </>
      ),
      choices: [
        "A lake",
        "A pile of horse droppings",
        "A huge puddle",
        "A pile of leaves",
      ],
      view: LifeEventPopup,
      select: (choice) => {
        console.log(choice);
      },
      selected: null,
    });
  } else if (player.age === 5) {
    if (player.education.kindergarden) {
      player.education.kindergarden.enrolled = false;
    }

    const student = () =>
      new NPC({
        age: chance.integer({ min: 4, max: 6 }),
      });

    player.education.elementary = {
      enrolled: true,
      popularity: chance.integer({ min: 0, max: 100 }),
      grades: chance.integer({ min: 0, max: 100 }),
      students: chance.n(student, 5),
      faculty: chance.n(faculity, 5),
    };

    player.lifeChoices.push({
      id: crypto.randomUUID(),
      name: "Elementary",
      type: "Public",
      level: "Elementary",
      years: 5,
      view: NewSchoolPopup,
      selected: null,
    });

    player.storyLog.push(`You started elementary.`);
  } else if (player.age === 10) {
    if (player.education.elementary) {
      player.education.elementary.enrolled = false;
    }

    const student = () =>
      new NPC({
        age: chance.integer({ min: 9, max: 12 }),
      });

    player.education.middleschool = {
      enrolled: true,
      grades: chance.integer({ min: 0, max: 100 }),
      popularity: chance.integer({ min: 0, max: 100 }),
      students: chance.n(student, 5),
      faculty: chance.n(faculity, 5),
    };

    player.lifeChoices.push({
      id: crypto.randomUUID(),
      name: "Middle School",
      type: "Public",
      level: "Middle School",
      years: 4,
      view: NewSchoolPopup,
      selected: null,
    });

    player.storyLog.push(`You started middle school.`);
  } else if (player.age === 14) {
    if (player.education.middleschool) {
      player.education.middleschool.enrolled = false;
    }

    const student = () =>
      new NPC({
        age: chance.integer({ min: 12, max: 18 }),
      });

    player.education.highschool = {
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
      ],
      grades: chance.integer({ min: 0, max: 100 }),
      popularity: chance.integer({ min: 0, max: 100 }),
      students: chance.n(student, 5),
      faculty: chance.n(faculity, 5),
    };

    player.lifeChoices.push({
      id: crypto.randomUUID(),
      name: "High School",
      type: "Public",
      level: "High School",
      years: 4,
      view: NewSchoolPopup,
      selected: null,
    });

    player.storyLog.push(`You started high school.`);
  } else if (player.age === 19) {
    if (player.education.highschool) {
      player.education.highschool.enrolled = false;

      player.storyLog.push(`You finished high school.`);
    }
  }

  if (
    player.jobs.filter((j) => j.type === "Full-Time" && j.quit !== true)
      .length > 0
  ) {
    const fullTimeJobs = player.jobs.filter(
      (j) => j.type === "Full-Time" && j.quit !== true
    );
    let income = new Money();

    for (const job of fullTimeJobs) {
      income = income.add(job.salary);
    }

    player.cash = player.cash.add(income);

    player.lifeChoices.push({
      id: crypto.randomUUID(),
      amount: income,
      view: YearlySalaryIncome,
      selected: null,
    });

    player.storyLog.push(`You made ${income.format()} at your job this year.`);
  }

  return res.redirect("/game");
});

lifeRouter.post("/life-event/:id", function (req, res) {
  const player = getPlayerById(req.session.playerId);
  const lifeChoice = player.lifeChoices.find((c) => c.id === req.params.id);
  const choice = req.body.choice;

  lifeChoice.selected = choice ?? true;

  const Response = ({ heading, body }) => (
    <div
      id="popup-result"
      style="display: flex;"
      class="popup-backdrop"
      onclick="window.reload()"
    >
      <div class="popup-box">
        <h1>{heading}</h1>
        <p>{body}</p>
      </div>

      <div class="popup-bottom-text">Tap anywhere to continue</div>
    </div>
  );

  let opts = {
    heading: "Good choice",
    body: "You had fun.",
  };

  if (lifeChoice.select) {
    const result = lifeChoice.select(choice);

    if (result) {
      opts.body = result;
    }

    return res.send(Response(opts)._ssr);
  } else {
    if (choice === "ACCEPT") {
      player.contacts.push({
        ...lifeChoice,
        relationship: chance.integer({ min: 75, max: 100 }),
        relation: "Friend",
        relationType: "FRIEND",
      });

      opts.heading = "New friend";
      opts.body = "You have become friends.";

      return res.send(Response(opts)._ssr);
    } else if (choice === "REJECT") {
      opts.heading = "No new friends";
      opts.body = `You rejected ${lifeChoice.name}.`;

      return res.send(Response(opts)._ssr);
    }
  }

  return res.end();
});
