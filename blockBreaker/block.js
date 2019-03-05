import blockUrl from './block.png'
import {imageFromPath, testCollide} from './util'
// 砖块类
export function Block (position) {
  let p = position
  let image = imageFromPath(blockUrl)
  class Block {
    constructor() {
      this.image = image
      this.x = p[0]
      this.y = p[1]
      this.w = 50
      this.h = 20
      this.alive = true
      this.lifes = p[2] || 1
    }
    kill () {
      this.lifes--
      if(this.lifes < 1) {
        this.alive = false
      }
    }
    collide (ball) {
      return this.alive && testCollide(this, ball)
    }
  }
  return new Block
}