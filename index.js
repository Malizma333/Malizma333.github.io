function showOverlay(panelId) {
  const overlay = document.getElementById("overlay")
  overlay.style["opacity"] = 1;
  overlay.style["pointerEvents"] = "all";
}

function hideOverlay() {
  const overlay = document.getElementById("overlay")
  overlay.style["opacity"] = 0;
  overlay.style["pointerEvents"] = "none";
}
