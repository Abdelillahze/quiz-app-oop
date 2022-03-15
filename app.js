class Question {
  constructor(question, answers, trueAnswer) {
    this.question = question;
    this.answers = answers;
    this.trueAnswer = trueAnswer;
    this.easterEgg = false;
    this.parent = document.querySelector("section");
  }
  create() {
    // p
    // create Element
    let p = document.createElement("p");

    if (Math.random() * 100 < 1) {
      this.question =
        "ahla? (Easter egg ya jdddk 3ndk 1% bach tjibha ya boooot)";
      this.answers = ["ahla", ":)", ":(", "h̶͖͖̱̏̿͘͠h̵̛̛̜̩͕̆̊͂̈́̂͗̑"];
      this.easterEgg = true;
      this.trueAnswer = undefined;
    }

    let textNode = document.createTextNode(this.question);

    // add class
    p.classList.add("question");

    // append
    p.append(textNode);
    this.parent.append(p);

    // add as property
    this.questionElement = p;

    // answers
    // create ul
    let ul = document.createElement("ul");
    this.answersElements = [];
    let nameFunc = (n) => `li${n}`;
    for (let i = 0; i < this.answers.length; i++) {
      // create li and elements inside
      let li = document.createElement("li");
      let input = document.createElement("input");
      let label = document.createElement("label");
      let textNode = document.createTextNode(this.answers[i]);

      // add classes and attribute
      li.classList.add("answer");
      input.setAttribute("type", "radio");
      input.setAttribute("name", "answer");
      input.setAttribute("value", this.answers[i]);
      input.id = nameFunc(i + 1);
      label.setAttribute("For", nameFunc(i + 1));

      // append
      label.append(textNode);
      li.append(input);
      li.append(label);
      ul.append(li);

      // add as property
      this.answersElements.push(li);
    }
    this.parent.append(ul);
  }
  start() {
    let submitButton = document.querySelector(".submit");
    setInterval(() => {
      for (let el of this.answersElements) {
        let input = el.children[0];
        input.onchange = () => {
          this.playerAnswer = input.value;
        };
        el.onclick = () => {
          input.click();
        };
      }
    });
    return new Promise((resolve, reject) => {
      submitButton.onclick = () => {
        resolve(this.checkWin(this.playerAnswer));
      };
    });
  }
  checkWin(answer) {
    if (this.easterEgg === true) {
      let audio = new Audio("sounds/hh.mp3");
      audio.play();
      return true;
    }
    if (answer == this.trueAnswer) {
      return true;
    } else {
      return false;
    }
  }
}

class Quiz {
  constructor(quesitionsAndAnswers) {
    this.parent = document.querySelector(".quiz-app .container");
    this.quesitonsAndAnswers = quesitionsAndAnswers;
    this.questionsCount = this.quesitonsAndAnswers.length;
    this.correct = 0;
    this.inCorrect = 0;
    this.i = 0;
  }
  generate() {
    this.questions = [];
    for (let i = 0; i < this.quesitonsAndAnswers.length; i++) {
      let question = new Question(
        this.quesitonsAndAnswers[i].question,
        this.quesitonsAndAnswers[i].answers,
        this.quesitonsAndAnswers[i].trueAnswer
      );
      this.questions.push(question);
    }
  }
  async start() {
    let lis = document.querySelectorAll("footer ul li");
    // start function
    this.questions[this.i].create();
    this.questions[this.i].start();

    let response = await this.questions[this.i].start();

    if (response == true) {
      this.correct++;
      lis[this.i].classList.add("true");
    } else {
      this.inCorrect++;
      lis[this.i].classList.add("false");
    }
    this.clear();
    this.i++;
    if (this.i == this.questionsCount) {
      this.gameover();
    } else {
      this.start();
    }
  }
  displayInfo() {
    let ul = document.createElement("ul");
    for (let i = 0; i < this.questionsCount; i++) {
      let li = document.createElement("li");

      // append
      ul.append(li);
    }
    document.querySelector("footer").prepend(ul);
    document.querySelector(
      ".count"
    ).innerHTML = `Questions Count: ${this.questionsCount}`;
  }
  clear() {
    this.questions[this.i].questionElement.remove();
    this.questions[this.i].answersElements.forEach((e) => e.remove());
  }
  gameover() {
    while (this.parent.firstChild) {
      this.parent.removeChild(this.parent.firstChild);
    }
    let p = document.createElement("p");
    let span = document.createElement("span");
    let textNodeP = document.createTextNode(
      `${this.correct}/${this.questionsCount}`
    );
    let textNodeSpan = document.createTextNode(
      `${
        this.correct < this.questionsCount / 2
          ? " ,bot klb"
          : " ,S7iiiiit gifawi🥰"
      }`
    );

    p.classList.add("gameover");
    span.classList.add(this.correct < this.questionsCount / 2 ? "no" : "yes");
    span.append(textNodeSpan);
    p.append(textNodeP);
    p.append(span);
    this.parent.append(p);
  }
}

let quiz = new Quiz([
  {
    question: "What's spoder name ?",
    answers: ["Abdelillah", "Abdellah", "Abdillah", "Abdellilah"],
    trueAnswer: "Abdelillah",
  },
  {
    question: "Toxic ?",
    answers: ["zaid", "sami", "gmr", "no one"],
    trueAnswer: "zaid",
  },
  {
    question: "Bot ?",
    answers: ["pro bot", "AGB", "hayder", "dank memer"],
    trueAnswer: "hayder",
  },
  {
    question: "urarka ?",
    answers: ["trash", "love", "bota", "zawjat hayder"],
    trueAnswer: "trash",
  },
  {
    question: "Hu Tao <3",
    answers: ["love", "zawjat spoder", "bb", "monamor"],
    trueAnswer: "zawjat spoder",
  },
  {
    question: "hayder",
    answers: ["164", "165", "169", "spoder"],
    trueAnswer: "164",
  },
  {
    question: "omk junz 13 hit omk l3atibi and that's in amongus law page ....",
    answers: ["13", "14", "23", "24"],
    trueAnswer: "24",
  },
  {
    question: "The most requested game by Omar, gmr: ... taj rask",
    answers: ["zelda", "mine", "ori", "The forest"],
    trueAnswer: "zelda",
  },
]);

// function
quiz.generate();
quiz.displayInfo();
quiz.start();
