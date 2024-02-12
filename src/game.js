import process from 'process'
import readline from 'readline'
import sudokuGenerator from '../lib/sudoku-generator.js'

const DEFAULT_TIP = 'press <Enter> to submit your answer'

export default class game {
  rawGame = ''

  cacheGame = ''

  board = []

  // X, Y
  cursorPos = [0, 0]

  direction = 'WASD'

  intervalId = ''

  tip = DEFAULT_TIP

  generateGame(difficulty) {
    this.rawGame = sudokuGenerator.generate(difficulty)
    this.cacheGame = this.rawGame
  }

  formatNumberByPos(num, index) {
    if (this.rawGame[index] === '.') {
      return `\x1b[32m${num}\x1b[0m`
    }
    return num
  }

  drawGame() {
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)

    this.board = []
    const dividerLine = `+${Array(9).fill('---+').join('')}`

    // top line
    this.board.push(dividerLine)

    this.cacheGame.split('').forEach((number, index) => {
      if (index % 9 === 0) {
        this.board.push('|')
      }
      this.board[this.board.length - 1] += number === '.' ? '   |' : ` ${this.formatNumberByPos(number, index)} |`
      if (index % 9 === 8) {
        // cursor is at the current line
        if (Math.floor(index / 9) === this.cursorPos[1]) {
          const dividerLineWithCursor = dividerLine.split('')
          dividerLineWithCursor[4 * this.cursorPos[0] + 2] = '^'
          this.board.push(dividerLineWithCursor.join(''))
        } else {
          this.board.push(dividerLine)
        }
      }
    })

    this.board.forEach(line => {
      process.stdout.write(`${line}\n`)
    })

    process.stdout.write('\n' + this.tip)
  }

  checkEmptyPos() {
    const cursorIndex = this.cursorPos[1] * 9 + this.cursorPos[0]
    return this.rawGame[cursorIndex] === '.'
  }

  setNumber(num) {
    if (this.checkEmptyPos()) {
      const cursorIndex = this.cursorPos[1] * 9 + this.cursorPos[0]
      const newCacheGame = this.cacheGame.split('')
      newCacheGame[cursorIndex] = num
      this.cacheGame = newCacheGame.join('')
    }
  }

  moveCursor(direction) {
    switch (direction) {
      case 'up':
        this.cursorPos[1] = this.cursorPos[1] > 0 ? this.cursorPos[1] - 1 : this.cursorPos[1]
        break;
      case 'left':
        this.cursorPos[0] = this.cursorPos[0] > 0 ? this.cursorPos[0] - 1 : this.cursorPos[0]
        break;
      case 'down':
        this.cursorPos[1] = this.cursorPos[1] < 8 ? this.cursorPos[1] + 1 : this.cursorPos[1]
        break;
      case 'right':
        this.cursorPos[0] = this.cursorPos[0] < 8 ? this.cursorPos[0] + 1 : this.cursorPos[0]
        break;
    }
    this.drawGame()
  }

  listenKeyEvent() {
    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.setEncoding('utf8')

    process.stdin.on('data', key => {
      if (key === '\u0003') {
        process.exit()
      }

      if (/[1-9]/.test(key)) {
        this.setNumber(key)
        return
      }

      if (key === '\r' || key === '\n' || key === '\r\n') {
        this.submit()
      }

      if (this.direction === 'WASD') {
        switch (key) {
          case 'w':
            this.moveCursor('up')
            break
          case 'a':
            this.moveCursor('left')
            break
          case 's':
            this.moveCursor('down')
            break
          case 'd':
            this.moveCursor('right')
            break
        }
      } else {
        switch (key) {
          case 'k':
            this.moveCursor('up')
            break
          case 'h':
            this.moveCursor('left')
            break
          case 'j':
            this.moveCursor('down')
            break
          case 'l':
            this.moveCursor('right')
            break
        }
      }
    })
  }

  play() {
    this.listenKeyEvent()

    this.intervalId = setInterval(() => {
      this.drawGame()
    }, 100);
  }

  submit() {
    if (/\./.test(this.cacheGame)) {
      this.tip = 'You haven\'t finished the game yet'
      setTimeout(() => {
        this.tip = DEFAULT_TIP
      }, 1500)
      return
    }

    const res = sudokuGenerator.validate_board(this.cacheGame)
    if (!!res) {
      this.tip = 'You WON!'
    } else {
      this.tip = 'Incorrect answer'
      setTimeout(() => {
        this.tip = DEFAULT_TIP
      }, 1500)
    }
  }
}
