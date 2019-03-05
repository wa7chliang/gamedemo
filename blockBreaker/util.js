import { levels } from './level'
import { Block } from './block'

export function imageFromPath (path) {
  let img = new Image()
  img.src = path
  return img
}

export function testCollide (a, b) {
  // 碰不上的情况只有4种 b1<t2,l1>r2,t1>b2,r1<l2
  let t1 = a.y
  let l1 = a.x
  let r1 = a.x + a.image.width
  let b1 = a.y + a.image.height
  let t2 = b.y
  let l2 = b.x
  let r2 = b.x + b.image.width
  let b2 = b.y + b.image.height
  // 碰到true,碰不到false
  if (b1 < t2 || l1 > r2 || t1 > b2 || r1 < l2) {
    return false
  } else {
    return true
  }
}

 // 载入游戏关卡
 export function loadLevel(n) {
  n = n - 1
  var level = levels[n]
  let blocks = []
  for (let i = 0;i < level.length; i++) {
    let p = level[i]
    let block = Block(p)
    block.x = p[0]
    block.y = p[1]
    blocks.push(block)
  }
  return blocks
}