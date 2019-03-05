import { Ball } from './ball'
import { Paddle } from './paddle'
import { loadLevel } from './util'

export function Scene (game) {

  let paddle = Paddle()
  let ball = Ball()
  var paused = true
  var killBlock = 0
  window.winGame = false

  let blocks = loadLevel(1)
  var score = 0 //  分数

  game.registerAction('a', () => {
    paddle.moveLeft()
  })
  game.registerAction('d', () => {
    paddle.moveRight()
  })
  game.registerAction('f', () => {
    ball.fire()
  })
  game.registerAction('p', () => {
    paused = !paused
  })

  window.addEventListener('keydown', (event) => {
    if ('12'.includes(event.key)) {
      blocks = loadLevel(Number(event.key))
    }
  })

  var enableDrag = false
  // mouse event
  game.canvas.addEventListener('mousedown', (e) => {
    var x = e.layerX
    var y = e.layerY
    if (ball.hasPoint(x, y)) {
      // 点中开启拖拽状态
      enableDrag = true
    }
  })
  game.canvas.addEventListener('mousemove', (e) => {
    var x = e.layerX
    var y = e.layerY
    if (enableDrag) {
      ball.x = x
      ball.y = y
    }
  })
  game.canvas.addEventListener('mouseup', (e) => {
    var x = e.layerX
    var y = e.layerY
    enableDrag = false
  })

  class S {
    constructor() {
      this.game = game
    }
    draw () {
      if (gameOver) {
        game.context.font = "30px bold 黑体"
        game.context.fillText('游戏结束', 200, 200)
        return
      }
      if (winGame) {
        game.context.font = "30px bold 黑体"
        game.context.fillText('游戏胜利✌️', 200, 200)
        return
      }
      game.drawImage(paddle)
      game.drawImage(ball)
      for (let i = 0; i < blocks.length; i++) {
        let block = blocks[i]
        if (block.alive) {
          game.drawImage(block)
        }
      }
      // 绘制分数
      game.context.fillText('分数：' + score, 10, 380)
    }
    
    update () {
      if (!paused) {
        return
      }
      ball.move()
      // 判断相撞
      if (paddle.collide(ball)) {
        ball.y = 342
        if (ball.y + ball.image.height > paddle.y + 6) {
          ball.rGo2()
        } else {
          ball.rGo()
        }
      }
      for (let i = 0; i < blocks.length; i++) {
        let block = blocks[i]
        if (block.collide(ball)) {
          block.kill()
          killBlock++
          ball.rGo()
          score += 100
          if (killBlock == blocks.length) {
            winGame = true
          }
        }
      }
    }
  }

  return new S
}