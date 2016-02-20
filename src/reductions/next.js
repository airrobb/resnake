function next(state) {
  switch(state.get('direction')) {
    case 'UP':
      return moveSnake(state, -30)
    case 'DOWN':
      return moveSnake(state, 30)
    case 'LEFT':
      return moveSnake(state, -1)
    case 'RIGHT':
      return moveSnake(state, 1)
  }
}

export default next

function moveSnake(state, change) {
  const currentHead = state.get('snake').get(0)
  const nextHead = currentHead + change
  if(nextHead < 0 ||
    nextHead > 900 ||
    (currentHead % 30 === 0 && change === -1) ||
    ((currentHead + 1) % 30 === 0 && change === 1))
  {
    return state.set('playing', false).set('gameover', true)
  } else {
    return checkSnake(checkFood(state.set('snake', state.get('snake').unshift(nextHead))))
  }
  return state
}

function checkFood(state) {
  if(state.get('food') === state.get('snake').first()){
    let newFood = generateFood()
    while(state.get('snake').indexOf(newFood) !== -1) {
      newFood = generateFood()
    }
    return state.set('length', state.get('length') + 4)
                .set('food', newFood)
                .set('score', state.get('score') + 1)
  }
  return state
}

function generateFood() {
  return parseInt(Math.random() * 899)
}

function checkSnake(state) {
  if(state.get('snake').indexOf(state.get('snake').first()) !==
  state.get('snake').lastIndexOf(state.get('snake').first())){
    return state.set('playing', false)
                .set('gameover', true)
                .set('snake', state.get('snake').pop())
  } else if (state.get('snake').size > state.get('length')){
    return state.set('snake', state.get('snake').pop())
  }
  return state
}
