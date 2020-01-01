import React, { Component } from "react";
import Nav from "../Nav";
import Header from "../Header";
import Container from "../Container";
import ClickItem from "../ClickItem";
import Footer from "../Footer";
import data from "../../data.json";

let topScore = 0;

class Game extends Component {
  state = {
    data: data,
    score: 0,
    shake: false
  };

  componentDidMount() {
    this.setState({ data: this.shuffleData(this.state.data) });
  }

  handleCorrectGuess = newData => {
    let newScore = this.state.score + 1;

    if (newScore > topScore) {
      topScore++;
    }

    newData = this.shuffleData(newData);
    this.setState({
      data: newData,
      score: newScore,
      shake: false
    });
  };

  handleIncorrectGuess = data => {

    this.setState({
      data: this.resetData(data),
      score: 0,
      shake: true
    });
  };

  resetData = data => {
    const resetData = data.map(item => ({ ...item, clicked: false }));
    return this.shuffleData(resetData);
  };

  shuffleData = data => {
    let i = data.length - 1;
    while (i > 0) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = data[i];
      data[i] = data[j];
      data[j] = temp;
      i--;
    }
    return data;
  };

  handleItemClick = id => {
    let guessedCorrectly = false;
    const newData = this.state.data.map(item => {
      const newItem = { ...item };
      if (newItem.id === id) {
        if (!newItem.clicked) {
          newItem.clicked = true;
          guessedCorrectly = true;
        }
      }
      return newItem;
    });
    guessedCorrectly
      ? this.handleCorrectGuess(newData)
      : this.handleIncorrectGuess(newData);
  };

  render() {
    return (
      <div>
        <Nav score={this.state.score} topScore={topScore} />
        <Header />
        <Container>
          {this.state.data.map(dataItem => (
            <ClickItem
              handleClick={this.handleItemClick}
              id={dataItem.id}
              key={dataItem.id}
              image={dataItem.image}
              shake={this.state.shake}
            />
          ))}
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Game;