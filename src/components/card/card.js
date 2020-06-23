import React, { Component } from 'react';
import './card.css';

const faceMap = {
  'c' : 'clubs',
  'd' : 'diamonds',
  's' : 'spades',
  'h' : 'hearts'
};

const valueMap = {
  '1' : 'ace',
  '11' : 'jack',
  '12' : 'queen',
  '13' : 'king'
};

export default class Card extends Component {

  constructor(props) {
    super(props);
    //load this once
    this.images = require.context('../../assets/cards',true);
    /*
    this.state = {
      price : null
    }

     */
  }
  render(){
    const that = this;
    const loadImage = function(value){
      if(value === 'back')
        return that.images('./back.png');
      else if(value === 'blank')
        return that.images('./blank.png');

      const face = faceMap[value[0]];
      const number = valueMap[value.substring(1,value.length)] ?
                     valueMap[value.substring(1,value.length)] : value.substring(1,value.length);
      return that.images('./' + number + '_of_' + face + '.png');
    };
    return (
      <div className={this.props.className}
           onClick={this.props.clickEvent}>
        <img alt="nada" src={loadImage(this.props.value)} />
      </div>
    );
  }
}
