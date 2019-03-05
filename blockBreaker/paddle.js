import imgURL from './paddle.png'
import {testCollide, imageFromPath} from './util'
// 挡板类
export function Paddle () {
  let image = imageFromPath(imgURL)
  class Paddle {
    constructor() {
      this.image = image
      this.x = 50
      this.y = 350
      this.speed = 5
    }
    move (x) {
      if (x < 0) {
        x = 0
      }
      if (x > 550 - this.image.width) {
        x = 550 - this.image.width
      }
    }
    moveLeft () {
      this.x -= this.speed
      this.move(this.x - this.speed)
    }
    moveRight () {
      this.x += this.speed
      this.move(this.x + this.speed)
    }
    collide (ball) {
      return testCollide(this, ball)
    }
  }
  return new Paddle
}