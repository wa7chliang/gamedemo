import ballURL from './ball.png'
import {imageFromPath} from './util'
// 球类
export function Ball () {
  let image = imageFromPath(ballURL)
  class Ball {
    constructor() {
      this.image = image
      this.x = 50
      this.y = 342
      this.speedX = 6
      this.speedY = 6
      this.fired = false
    }
    fire () {
      this.fired = true
    }
    move () {
      if (this.fired) {
        if (this.x < 0 || this.x + 8 > 550) {
          this.speedX *= -1
        }
        if (this.y < 0 || this.y + 8 > 400) {
          this.speedY *= -1
          if(this.y + 8 > 400) {
            gameOver = true
          }
        }
        this.x += this.speedX
        this.y += this.speedY
      }
    }
    rGo () {
      this.speedY *= -1
    }
    rGo2 () {
      this.speedY *= -1
      this.speedX *= -1
    }
    hasPoint (x, y) {
      var xIn = x >= this.x && x <= this.x + 8
      var yIn = y >= this.y && y <= this.y + 8
      return xIn && yIn
    }
  }
  return new Ball
}