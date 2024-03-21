let graph = document.getElementById("CanvasGraph")
let gctx = graph.getContext("2d")

gctx.fillStyle = "#1f1f1f";
gctx.fillRect(0, 0, graph.width, graph.height);

let x = 1
let y = 1

gctx.fillStyle = "#489c2a"
gctx.fillRect(75,495-(x*450/(x+y)),50,(x/(x+y))*450)

gctx.fillStyle = "#c71838"
gctx.fillRect(150,495-((y*450/(x+y))),50,(y/(x+y))*450)