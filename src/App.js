import React, {} from 'react';
import './App.css';

import Card from './components/card/card.js';
import Log from './components/log/log.js';
import Deck from './components/deck/deck.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myHorse : undefined,  // user's horse
      score : { // init the scores
        'h' : 0,
        'c' : 0,
        'd' : 0,
        's' : 0
      },
      board : {}
    };

    this.myDeck = new Deck();
    this.initialCardsArr = ['h1','c1','d1','s1'];
    this.horseIndexMap = {
      'h' : 1,
      'c' : 2,
      'd' : 3,
      's' : 4
    }
    this.visited = {};
    this.started = false;
  }

  componentDidMount() {
    this.logMsg = 'loading ...';
    let board = this.state.board;
    //init starting horses
    for(let i = 1; i < 5; i++){
      const card = this.initialCardsArr[i-1];
      board['0_' + i] = <Card className={'card horse ' + card}
                              value={card}
                              key={card}
                              clickEvent={this.chooseHorse.bind(this,card)}>...</Card>;
    }
    //init links
    for(let i = 1; i < 9; i++) {
      board[i + '_0'] = <Card className={'card'}
                              value={'back'}
                              key={'back_i'}>...</Card>;
    }

    board['9_0'] = <Card className={'card'}
                         value={'back'}
                         key={'back_9'}>...</Card>;

    this.logMsg = 'Please pick your horse.';
    this.setState({
      board : board
    });
  }

  //user initially picks his/her horse
  chooseHorse = (value) => {
    this.logMsg = 'Horse picked : ' + value + '.';
    this.setState({
      myHorse: value
    });

    this.css = '.card.' + value + '{border:5px red solid; padding:0px;}';
    this.blank = <Card className={'card blank'}
                       value={'blank'}
                       key={'blank'}>...</Card>;;
  }

  //start the game
  start = () => {
    this.started = true;
    this.progress() // first run should be immediate

    const that = this;
    this.t = setInterval(function(){
      that.progress();
    },1000);
  }

  //progress simulator
  progress = () => {
    if(!this.state.myHorse){
      console.error('myHorse is null');
    }

    const drawn = this.myDeck.draw();
    const drawnFace = drawn.charAt(0);
    const score = Object.assign({},this.state.score);
    score[drawnFace]++;

    this.logMsg = 'Card drawn - ' + drawn + '.';
    //move cards
    const board = this.state.board;

    board['9_0'] = <Card className={'card'}
                         value={drawn}
                         key={'drawn'}>...</Card>;

    const i = this.horseIndexMap[drawnFace]
    const j = score[drawnFace];
    const card = board[(j-1) + '_' + i];
    board[j + '_' + i] = card;
    board[(j-1) + '_' + i] = this.blank;

    this.setState({
      score : score
    });

    //check L cards
    if(!this.visited[j]){
      this.visited[j] = 1;
    }
    else{
      this.visited[j]++;
    }

    //faltering logic
    if(this.visited[j] === 4){
      const drawnL = this.myDeck.draw();
      const drawnLFace = drawnL.charAt(0);

      this.logMsg = 'L Card drawn - ' + drawnL + '.';
      board[j + '_0'] = <Card className={'card ' + card}
                              value={drawnL}
                              key={drawnL}
                              clickEvent={this.chooseHorse.bind(this,card)}>...</Card>;

      //move back
      score[drawnLFace]--;
      const i_faltered = this.horseIndexMap[drawnLFace];
      const j_faltered = score[drawnLFace];
      const card_faltered = board[(j_faltered+1) + '_' + i_faltered];
      board[j_faltered + '_' + i_faltered] = card_faltered;
      board[(j_faltered+1) + '_' + i_faltered] = this.blank;
      this.setState({
        score : score
      });
    }

    //check winner
    if(score[drawnFace] >= 8){
      this.logMsg = 'Winner is ' + drawnFace + '.';
      clearTimeout(this.t);
      this.setState({
        myHorse: undefined
      });
    }
  }

  createBoard = () => {
    let table = [];
    for(let i = 0; i < 5; i++){
      let children = [];
      for (let j = 0; j < 10; j++) {
        children.push(
          <td key={'td_' + j + '_' + i}>{
            this.state.board[j + '_' + i]
          }</td>
        );
      }
      table.push(<tr key={'tr_' + i}>{children}</tr>)
    }

    return table;
  }

  render() {
    return (
      <div className="App">
        <React.Fragment>
          <table>
            <tbody>
              {this.createBoard()}
            </tbody>
          </table>
          <div className={'start-container'}>
            { (this.state.myHorse && !this.started) &&
              <button type="button"
                      onClick={this.start.bind(this)}>start</button>
            }
          </div>
          <Log value={this.logMsg}>...</Log>
          <style>{this.css}</style>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
