let graph = document.getElementById("CanvasGraph");
let gctx = graph.getContext("2d");

let x = 1; // Initial value for "yes"
let y = 1; // Initial value for "no"

// Function to redraw the graph
function drawGraph() {
    // Clear the canvas
    gctx.fillStyle = "#1f1f1f";
    gctx.fillRect(0, 0, graph.width, graph.height);

    // Yes bar ("x")
    gctx.fillStyle = "#489c2a";
    gctx.fillRect(75, 495 - (x * 450 / (x + y)), 50, (x / (x + y)) * 450);

    // No bar ("y")
    gctx.fillStyle = "#c71838";
    gctx.fillRect(150, 495 - (y * 450 / (x + y)), 50, (y / (x + y)) * 450);

    // Draw Y-Axis
    gctx.strokeStyle = "#ffffff";
    gctx.lineWidth = 2;
    gctx.beginPath();
    gctx.moveTo(50, 45);
    gctx.lineTo(50, 495);
    gctx.stroke();

    // Add Ticks and Labels for Percentages
    const percentages = [0, 25, 50, 75, 100];
    const axisLength = 450;
    gctx.textAlign = "right";
    gctx.fillStyle = "#ffffff";
    gctx.font = "12px Arial";

    percentages.forEach((percent) => {
        let yPos = 495 - (percent / 100) * axisLength;
        gctx.beginPath();
        gctx.moveTo(45, yPos);
        gctx.lineTo(50, yPos);
        gctx.stroke();
        gctx.fillText(`${percent}%`, 43, yPos + 3);
    });
}

// Initial draw of the graph
drawGraph();

// Event listeners for the "yes" and "no" buttons
document.getElementById("yes").addEventListener("click", function() {
    x++; // Increment "yes"
    drawGraph(); // Redraw the graph
});

document.getElementById("no").addEventListener("click", function() {
    y++; // Increment "no"
    drawGraph(); // Redraw the graph
});
