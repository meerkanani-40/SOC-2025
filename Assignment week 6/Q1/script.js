const btn = document.querySelector(".btn");

btn.addEventListener("click", generatePattern);

function generatePattern() {
    const num = parseInt(document.getElementById("number").value);
    const outputBox = document.getElementById("outputBox");

    if (isNaN(num) || num % 2 === 0 || num < 1) {
        outputBox.textContent = "Please enter a valid odd number greater than 0.";
        return;
    }

    let pattern = "";
    const mid = Math.floor(num / 2);

    // Top half
    for (let i = 0; i <= mid; i++) {
        pattern += "  ".repeat(i) + "* ".repeat(num - 2 * i) + "  ".repeat(i) + "\n";
    }

    // Bottom half
    for (let i = mid - 1; i >= 0; i--) {
        pattern += "  ".repeat(i) + "* ".repeat(num - 2 * i) + "  ".repeat(i) + "\n";
    }

    outputBox.textContent = pattern;
}