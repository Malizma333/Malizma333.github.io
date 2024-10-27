class CanvasHelper {
  static MODES = {
    PREVIEW: 0,
    EXPAND: 1,
    GAME: 2,
    CONTRACT: 3
  }

  static gridSize = 100
  static pixelSize = 30
  static transitionDelta = 50

  static initCanvas () {
    this.canvas = document.getElementById('main-canvas')
    this.main = document.getElementById('main-content')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.mode = this.MODES.PREVIEW
    this.pathRadius = 50
    this.grid = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(0))
    this.previewSeenFlag = false

    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
      this.redraw()
    }, false)

    window.addEventListener('mousemove', (e) => {
      if (this.mode === this.MODES.PREVIEW) {
        this.redraw(e)
      }
    }, false)

    this.canvas.addEventListener('click', (e) => {
      if (this.mode === this.MODES.PREVIEW) {
        document.body.style['pointer-events'] = 'none'
        this.mode = this.MODES.EXPAND
        this.redraw(e)
      }

      if (this.mode === this.MODES.GAME) {
        this.redraw(e)
      }
    }, false)

    document.getElementById('back-button').addEventListener('click', (e) => {
      if (this.mode === this.MODES.GAME) {
        document.body.style['pointer-events'] = 'none'
        this.mode = this.MODES.CONTRACT
        this.redraw(e)
      }
    }, false)
  }

  static redraw (e) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    const rect = this.canvas.getBoundingClientRect()
    let mouse
    if (e) {
      mouse = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    switch (this.mode) {
      case this.MODES.PREVIEW: {
        if (mouse) {
          this.drawClipPath(mouse, this.canvas, this.ctx)
        }
        if (this.previewSeenFlag) {
          this.drawBoard(this.canvas, this.ctx)
        }
        break
      }

      case this.MODES.EXPAND: {
        if (mouse) {
          this.assignClick(mouse)
          this.transition(mouse)
        }
        break
      }

      case this.MODES.GAME: {
        if (mouse) {
          this.assignClick(mouse)
        }
        this.drawBoard(this.canvas, this.ctx)
        break
      }

      case this.MODES.CONTRACT: {
        this.drawBoard(this.canvas, this.ctx)
        this.reverseTransition(this.canvas, this.ctx)
      }
    }
  }

  static drawBoard (canvas, ctx) {
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 1
    const origin = [canvas.width / 2, canvas.height / 2]
    const dimensions = [
      Math.floor(canvas.width / (2 * this.pixelSize)) + 2,
      Math.floor(canvas.height / (2 * this.pixelSize)) + 2
    ]

    ctx.beginPath()

    for (let i = 0; i <= dimensions[1]; i++) {
      ctx.moveTo(origin[0] - dimensions[0] * this.pixelSize, origin[1] + i * this.pixelSize)
      ctx.lineTo(origin[0] + dimensions[0] * this.pixelSize, origin[1] + i * this.pixelSize)
      ctx.moveTo(origin[0] - dimensions[0] * this.pixelSize, origin[1] - i * this.pixelSize)
      ctx.lineTo(origin[0] + dimensions[0] * this.pixelSize, origin[1] - i * this.pixelSize)
    }

    for (let i = 0; i <= dimensions[0]; i++) {
      ctx.moveTo(origin[0] + i * this.pixelSize, origin[1] - dimensions[1] * this.pixelSize)
      ctx.lineTo(origin[0] + i * this.pixelSize, origin[1] + dimensions[1] * this.pixelSize)
      ctx.moveTo(origin[0] - i * this.pixelSize, origin[1] - dimensions[1] * this.pixelSize)
      ctx.lineTo(origin[0] - i * this.pixelSize, origin[1] + dimensions[1] * this.pixelSize)
    }

    ctx.closePath()
    ctx.stroke()

    if (this.mode === this.MODES.PREVIEW && !this.previewSeenFlag) return

    ctx.fillStyle = 'white'
    ctx.beginPath()

    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        if (this.grid[i][j] === 0) continue
        const target = [
          (i - this.gridSize / 2) * this.pixelSize + this.canvas.width / 2,
          (j - this.gridSize / 2) * this.pixelSize + this.canvas.height / 2
        ]
        ctx.rect(target[0], target[1], this.pixelSize, this.pixelSize)
      }
    }

    ctx.closePath()
    ctx.fill()
  }

  static drawClipPath (mouse, canvas, ctx) {
    ctx.save()
    ctx.beginPath()
    ctx.arc(mouse.x, mouse.y, this.pathRadius, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.clip()
    this.drawBoard(canvas, ctx)
    ctx.restore()
  }

  static transition (mouse) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.pathRadius += this.transitionDelta

    if (!this.previewSeenFlag) {
      this.drawClipPath(mouse, this.canvas, this.ctx)
    } else {
      this.drawBoard(this.canvas, this.ctx)
    }

    const target = Math.pow(this.canvas.width, 2) + Math.pow(this.canvas.height, 2)
    const progress = Math.pow(this.pathRadius, 2) / target
    this.main.style.marginTop = `-${progress * 110}vh`

    if (progress < 1) {
      window.requestAnimationFrame(() => this.transition(mouse))
    } else {
      this.mode = this.MODES.GAME
      this.previewSeenFlag = true
      document.body.style['pointer-events'] = 'auto'
    }
  }

  static reverseTransition () {
    this.pathRadius -= this.transitionDelta

    const target = Math.pow(this.canvas.width, 2) + Math.pow(this.canvas.height, 2)
    const progress = Math.pow(this.pathRadius, 2) / target
    this.main.style.marginTop = `-${progress * 110}vh`

    if (progress > 0) {
      window.requestAnimationFrame(() => this.reverseTransition())
    } else {
      this.main.style.marginTop = '0'
      this.mode = this.MODES.PREVIEW
      document.body.style['pointer-events'] = 'auto'
    }
  }

  static assignClick (mouse) {
    const index = [
      Math.floor((mouse.x - this.canvas.width / 2) / this.pixelSize) + this.gridSize / 2,
      Math.floor((mouse.y - this.canvas.height / 2) / this.pixelSize) + this.gridSize / 2
    ]

    if (index[0] < 0 || index[0] >= this.gridSize || index[1] < 0 || index[1] >= this.gridSize) {
      return
    }

    this.grid[index[0]][index[1]] = 1 - this.grid[index[0]][index[1]]
  }
}
