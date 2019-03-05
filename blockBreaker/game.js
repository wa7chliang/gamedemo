export function Game () {
  let g = {
    actions: {},
    keydowns: {},
  }
  const canvas = document.querySelector('#my-canvas')
  const context = canvas.getContext('2d')
  g.canvas = canvas
  g.context = context
  // draw
  g.drawImage = (images) => {
    g.context.drawImage(images.image, images.x, images.y)
  }
  // events
  window.addEventListener('keydown', (event) => {
    g.keydowns[event.key] = true
  })
  window.addEventListener('keyup', (event) => {
    g.keydowns[event.key] = false
  })
  g.registerAction = (key, cb) => {
    g.actions[key] = cb
  }

  window.fps = 60

  function runloop() {
    // events
    let actions = Object.keys(g.actions)
    actions.forEach((item) => {
      let key = item
      if (g.keydowns[key]) {
        // 按下注册的键就会执行回调函数
        g.actions[key]()
      }
    })
    // update
    g.update()
    // clear
    context.clearRect(0, 0, canvas.width, canvas.height)  //重绘
    // draw
    g.draw()
    setTimeout(() => {
      runloop()
    }, 1000/window.fps)
  }

  // timer
  setTimeout(() => {
    runloop()
  }, 1000/window.fps)

  return g
}