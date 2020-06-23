function Deck () {
  this.faces = ['c','d','h','s'];
  this.deck = [];
  for(const face of this.faces){
    for(let i = 2; i <= 13; i++){
      this.deck.push(face + i);
    }
  }
  this.shuffle();
}

Deck.prototype.draw = function () {
  return this.deck.pop();
}

Deck.prototype.count = function () {
  return this.deck.length;
}
Deck.prototype.shuffle = function() {
  let currentIndex = this.deck.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = this.deck[currentIndex];
    this.deck[currentIndex] = this.deck[randomIndex];
    this.deck[randomIndex] = temporaryValue;
  }
}

module.exports = Deck;
