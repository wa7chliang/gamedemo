const log = console.log.bind(console)

import { Game } from './game'
import { Scene } from './scene'
import { loadLevel } from './util'

function __main () {
  let game = Game()  
  var scene = Scene(game)

  document.querySelector('#id-input-speed').addEventListener('input', (e) => {
    var input = e.target
    window.fps = Number(input.value)
  })
  
  game.update = () => {
    scene.update()
  }

  window.gameOver = false

  game.draw = () => {
    scene.draw()    
  }
}

__main()
