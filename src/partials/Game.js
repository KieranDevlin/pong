import Board from './board';
import Paddle from './paddle';
import Ball from './ball';
import Score from './score';
import { SVG_NS, KEYS } from '../settings';

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.boardGap = 10;

    this.board = new Board(this.width, this.height);
    this.gameElement = document.getElementById(this.element);

    this.score1 = new Score(this.width / 2 - 130, 50, 50);
    this.score2 = new Score(this.width / 2 + 100, 50, 50);

    this.player1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      (this.height - this.paddleHeight) / 2,
      KEYS.w,
      KEYS.s
    );

    this.player2 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.width - this.boardGap - this.paddleWidth,
      (this.height - this.paddleHeight) / 2,
      KEYS.up,
      KEYS.down
    );

    this.ball = new Ball(8, this.width, this.height);

    document.addEventListener('keydown', event => {
      switch (event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause;
          break;
      }
    });
  }

  render() {
    if (this.pause) {
      return;
    }
    this.gameElement.innerHTML = '';

    let svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttributeNS(null, 'width', this.width);
    svg.setAttributeNS(null, 'height', this.height);
    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);

    this.board.render(svg);
    this.player1.render(svg);
    this.player2.render(svg);
    this.ball.render(svg, this.player1, this.player2);
    // render and update the score component based on player score
    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);
  }
}
