class CanvasHelper {
  static MODES = {
    PREVIEW: 0,
    EXPAND: 1,
    GAME: 2
  }

  static initCanvas () {
    this.canvas = document.getElementById('main-canvas')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.mode = this.MODES.PREVIEW
    this.pathRadius = 50
    this.pathRadiusDelta = 50

    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
      this.redraw()
    }, false)

    window.addEventListener('mousemove', () => {
      if (this.mode === this.MODES.PREVIEW) {
        this.redraw()
      }
    }, false)

    this.canvas.addEventListener('click', () => {
      if (this.mode !== this.MODES.PREVIEW) return
      document.querySelector('main').style['pointer-events'] = 'none'
      this.mode = this.MODES.EXPAND
      this.redraw()
    }, false)
  }

  static redraw () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    if (this.mode === this.MODES.PREVIEW) {
      const rect = this.canvas.getBoundingClientRect()
      const mouse = {
        x: window.event.clientX - rect.left,
        y: window.event.clientY - rect.top
      }
      this.drawClipPath(mouse, this.canvas, this.ctx)
    } else if (this.mode === this.MODES.EXPAND) {
      const rect = this.canvas.getBoundingClientRect()
      const mouse = {
        x: window.event.clientX - rect.left,
        y: window.event.clientY - rect.top
      }
      this.transition(mouse, this.canvas, this.ctx)
    } else {
      this.drawBoard(this.canvas, this.ctx)
    }
  }

  static drawBoard (canvas, ctx) {
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 1
    const sideLen = 30
    const origin = [canvas.width / 2, canvas.height / 2]
    const dimensions = [
      Math.floor(canvas.width / (2 * sideLen)) + 2,
      Math.floor(canvas.height / (2 * sideLen)) + 2
    ]

    ctx.beginPath()

    for (let i = 0; i <= dimensions[1]; i++) {
      ctx.moveTo(origin[0] - dimensions[0] * sideLen, origin[1] + i * sideLen)
      ctx.lineTo(origin[0] + dimensions[0] * sideLen, origin[1] + i * sideLen)
      ctx.moveTo(origin[0] - dimensions[0] * sideLen, origin[1] - i * sideLen)
      ctx.lineTo(origin[0] + dimensions[0] * sideLen, origin[1] - i * sideLen)
    }

    for (let i = 0; i <= dimensions[0]; i++) {
      ctx.moveTo(origin[0] + i * sideLen, origin[1] - dimensions[1] * sideLen)
      ctx.lineTo(origin[0] + i * sideLen, origin[1] + dimensions[1] * sideLen)
      ctx.moveTo(origin[0] - i * sideLen, origin[1] - dimensions[1] * sideLen)
      ctx.lineTo(origin[0] - i * sideLen, origin[1] + dimensions[1] * sideLen)
    }

    ctx.closePath()
    ctx.stroke()
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
    this.pathRadius += this.pathRadiusDelta
    this.drawClipPath(mouse, this.canvas, this.ctx)

    const target = Math.pow(this.canvas.width, 2) + Math.pow(this.canvas.height, 2)
    const progress = Math.pow(this.pathRadius, 2) / target
    document.querySelector('main').style.marginTop = `-${progress * 110}vh`

    if (progress < 1) {
      window.requestAnimationFrame(() => this.transition(mouse))
    } else {
      this.mode = this.MODES.GAME
    }
  }
}
