import React, { Component } from "react";

export default class Container extends Component {
  // Model
  constructor() {
    super();

    this.state = {
      introVid: 0,
      playState: "not playing",
      divStyle: {},
      option: "",
      equipment: ["sword", "rope", "flashlight", "pen", "hook"],
      userName: "",
      health: 100,
      message: ""
    };
    this.displayStartMenu = this.displayStartMenu.bind(this);
    this.startGame = this.startGame.bind(this);
    this.moveDiv = this.moveDiv.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeOption = this.changeOption.bind(this);
    this.enterGame = this.enterGame.bind(this);
    this.prepareToCheckAnswer = this.prepareToCheckAnswer.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
    this.addRunOption = this.addRunOption.bind(this);
  }

  // Update

  //displayStartMenu : State
  displayStartMenu() {
    return this.setState({ introVid: 10 });
  }

  //moveIcon : State
  moveDiv() {
    return this.setState({
      divStyle: {
        transform: "translateX(0)"
      }
    });
  }

  //changeName : Html Event -> State
  changeName(e) {
    const enterGame = document.querySelector(".enter-game");
    window.scrollTo(0, enterGame);
    return this.setState({ userName: e.target.value });
  }

  //changeOption : Html Event -> State
  changeOption(e) {
    const continueGame = document.querySelector(".continue-game");
    window.scrollTo(0, continueGame);
    return this.setState({ option: e.target.value });
  }

  //alertMessage : String -> State
  alertMessage(message) {
    return this.setState({ message: message });
  }

  //clearMessage : Html Event -> State
  clearMessage(e) {
    if (e.key === "Enter") {
      return this.setState({ message: "" });
    }
  }

  //prepareToCheckAnswer : Html Event -> String -> String -> String -> Func
  prepareToCheckAnswer(e, userInput, ans1, ans2) {
    let equipment = this.state.equipment,
      health = this.state.health,
      responses = R.pipe(
        this.ans1_response,
        this.ans2_response,
        this.wrongAns_response
      ).bind(this);
    //type answerData
    const answerData = {
      e,
      userInput: R.toLower(userInput),
      ans1,
      ans2,
      health,
      equipment,
      responses
    };

    return this.checkHealth(answerData);
  }

  //checkHealth : type answerData -> Func
  checkHealth(answerData) {
    const { health } = answerData;

    if (health === 0) {
      return this.gameOver();
    } else {
      return this.determineKeyUsed(answerData);
    }
  }

  //determineKeyUsed : type answerData -> Nothing ? Func
  determineKeyUsed(answerData) {
    const { e } = answerData;
    if (e.key !== "Enter") {
      return;
    } else {
      return this.testKey(answerData);
    }
  }

  //testKey : type answerData -> Func
  testKey(answerData) {
    const { userInput } = answerData,
      userInputTest = R.test(/[0-9]/);

    if (userInputTest(userInput)) {
      return this.alertMessage(
        `Did you mean the option ${userInput}? Try typing in the equipment involved`
      );
    } else {
      return this.testEquipment(answerData);
    }
  }

  //testEquipment : type answerData -> Func
  testEquipment(answerData) {
    const {
        e,
        userInput,
        equipment,
        responses,
        ans1,
        ans2,
        health
      } = answerData,
      isEquipment = R.contains(userInput),
      equipmentLength = equipment.length - 1;

    if (equipmentLength === 0) {
      return this.gameOver();
    } else if (isEquipment(equipment) === false) {
      this.setState({ option: "" });
      return this.alertMessage("You don't have that item. Try again");
    } else {
      return responses({ e, userInput, equipment, ans1, ans2, health });
    }
  }

  //updateEquipment : Array -> Html Event -> Obj
  updateEquipmentAndOption({ newEquipment, e }) {
    this.setState({ equipment: newEquipment, option: "" });
    this.enterGame(e);
    return { e: "done" };
  }

  //checkAnswer : Html Event -> String -> String -> Object
  checkAnswer(e, userInput, answer, equipment) {
    const checkEquipment = item => item !== answer,
      newEquipment = R.filter(checkEquipment, equipment);
    return { newEquipment, e };
  }

  //ans1_response : type answerData -> Obj ? type answerData
  ans1_response({ e, userInput, ans1, ans2, equipment, health }) {
    let evaluateAnswer = R.pipe(
      this.checkAnswer,
      this.updateEquipmentAndOption
    ).bind(this);

    if (e.key === "Enter" && userInput === ans1) {
      return evaluateAnswer(e, userInput, ans1, equipment);
    } else {
      return { e, userInput, ans1, ans2, equipment, health, evaluateAnswer };
    }
  }

  //ans2_response : type answerData -> Obj ? type answerData
  ans2_response({
    e,
    userInput,
    ans1,
    ans2,
    equipment,
    health,
    evaluateAnswer
  }) {
    if (e === "done") {
      return { e: "done" };
    } else if (e.key === "Enter" && userInput === ans2) {
      return evaluateAnswer(e, userInput, ans2, equipment);
    } else {
      return { e, userInput, ans1, ans2, equipment, health, evaluateAnswer };
    }
  }

  //wrongAns_response : type answerData -> Nothing ? Func
  wrongAns_response({ e, userInput, ans1, ans2, equipment, health }) {
    if (e === "done") {
      return;
    } else if (
      (e.key === "Enter" && userInput !== ans1) ||
      userInput !== ans2
    ) {
      const checkEquipment = item => item !== userInput,
        newEquipment = R.filter(checkEquipment, equipment);

      this.setState({
        equipment: newEquipment,
        option: "",
        health: health - 25
      });

      return this.alertMessage(
        `Wrong move! You now have ${health - 25}% health!`
      );
    } else {
      return;
    }
  }

  // addRunOption : State
  addRunOption() {
    const equipment = this.state.equipment;
    equipment.push("run");
    return this.setState({ equipment });
  }

  // Change Route Functions

  // startGame : Html Event -> Route
  startGame(e) {
    if (e.target.classList.contains("start-button")) {
      return this.context.router.push("/intro");
    } else if (e.target.classList.contains("credits-button")) {
      return this.context.router.push("/credits");
    }
  }

  //gameOver : Route
  gameOver() {
    alert("Game Over!!");

    this.setState({
      equipment: ["sword", "rope", "flashlight", "pen", "hook"],
      health: 100,
      userName: ""
    });

    return this.context.router.push("/");
  }

  enterGame(e) {
    //type Paths
    const Paths = {
      introPath: this.context.router.location.pathname === "/intro",
      scenario1Path: this.context.router.location.pathname === "/scenario-1",
      scenario2Path: this.context.router.location.pathname === "/scenario-2",
      scenario3Path: this.context.router.location.pathname === "/scenario-3",
      scenario4Path: this.context.router.location.pathname === "/scenario-4",
      e: e
    };

    if (e.key === "Enter") {
      this.moveToScenario1(Paths);
      this.moveToScenario2(Paths);
      this.moveToScenario3(Paths);
      this.moveToScenario4(Paths);
      this.rollCredits(Paths);
    }
  }

  //moveToScenario1 : type Paths ? Nothing
  moveToScenario1({ e, introPath }) {
    if (introPath && e.key === "Enter") {
      this.setState({ playState: "playing" });
      return this.context.router.push("/scenario-1");
    } else {
      return;
    }
  }

  //moveToScenario2 : type Paths ? Nothing
  moveToScenario2({ e, scenario1Path }) {
    if (scenario1Path && e.key === "Enter") {
      return this.context.router.push("/scenario-2");
    } else {
      return;
    }
  }

  //moveToScenario3 : type Paths ? Nothing
  moveToScenario3({ e, scenario2Path }) {
    if (scenario2Path && e.key === "Enter") {
      return this.context.router.push("/scenario-3");
    } else {
      return;
    }
  }

  //moveToScenario4 : type Paths ? Nothing
  moveToScenario4({ e, scenario3Path }) {
    if (scenario3Path && e.key === "Enter") {
      this.context.router.push("/scenario-4");
    } else {
      return;
    }
  }

  //rollCredits : type Paths -> Route ? Nothing
  rollCredits({ e, scenario4Path }) {
    if (scenario4Path && e.key === "Enter") {
      return this.context.router.push("/credits");
    } else {
      return;
    }
  }

  // View
  render() {
    const { children } = this.props,
      child = React.cloneElement(children, {
        introVid: this.state.introVid,
        playState: this.state.playState,
        divStyle: this.state.divStyle,
        option: this.state.option,
        equipment: this.state.equipment,
        userName: this.state.userName,
        health: this.state.health,
        message: this.state.message,
        displayStartMenu: this.displayStartMenu,
        startGame: this.startGame,
        moveDiv: this.moveDiv,
        changeName: this.changeName,
        changeOption: this.changeOption,
        enterGame: this.enterGame,
        prepareToCheckAnswer: this.prepareToCheckAnswer,
        clearMessage: this.clearMessage,
        addRunOption: this.addRunOption
      });

    return <div>{child}</div>;
  }
}

Container.contextTypes = {
  router: React.PropTypes.object
};
