class CanvasHelper {
  static initCanvas () {
    this.canvas = document.getElementById('main-canvas')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
    }, false)

    window.addEventListener('mousemove', (e) => CanvasHelper.drawClipPath(e, this.canvas, this.ctx), false)

    this.canvas.addEventListener('click', (e) => {
      e.preventDefault()
      const a = document.createElement('a')
      a.href = '#minesweeper'
      a.target = '_self'
      a.click()
      a.remove()
    }, false)
  }

  static drawBoard(canvas, ctx) {
    ctx.strokeStyle = "white"
    ctx.lineWidth = 2
    const lineCount = 20
    const delta = canvas.height / lineCount
    ctx.beginPath()
    
    for(let i = 0; i <= canvas.height; i += delta) {
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
    }

    for(let i = 0; i <= canvas.width; i += delta) {
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
    }

    ctx.closePath()
    ctx.stroke()
  }

  static drawClipPath(e, canvas, ctx) {
    const rect = canvas.getBoundingClientRect()
    const mouse = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()

    // Draw mouse clip
    ctx.beginPath()
    ctx.arc(mouse.x, mouse.y, 50, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.clip()

    CanvasHelper.drawBoard(canvas, ctx)

    // Apply clip
    ctx.restore()
  }

  static load() {
    console.log("Minesweeper init")
  }
}
