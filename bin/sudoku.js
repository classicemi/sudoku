#!/usr/bin/env node

import inquirer from 'inquirer'
import Game from '../src/game.js'

inquirer.prompt([
  {
    type: 'list',
    name: 'difficulty',
    message: 'Choose difficulty (from easy to difficult):',
    choices: [
      'Easy',
      'Medium',
      'Hard',
      'Very-hard',
      'Insane',
      'Inhuman',
    ]
  },
  {
    type: 'list',
    name: 'direction',
    message: 'Choose direction mode:',
    choices: [
      'WASD',
      'VIM',
    ]
  }
]).then(answer => {
  const { difficulty, direction } = answer
  const game = new Game({ direction })
  game.generateGame(difficulty.toLowerCase())
  game.play()
})

// const game = new Game()
