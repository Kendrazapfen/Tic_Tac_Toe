let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'circle';

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Gewinnkombinationen
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Gewinnkombinationen
    [0, 4, 8], [2, 4, 6]             // Diagonale Gewinnkombinationen
];

function init() {
    render();
}

function render() {
    let content = document.getElementById('content');
    let table = '<table>';

    for (let i = 0; i < 3; i++) {
        table += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let value = fields[index];
            let symbol = '';
            if (value === 'circle') {
                symbol = generateCircleSVG();
            } else if (value === 'cross') {
                symbol = generateCrossSVG();
            }
            table += `<td onclick="handleClick(this, ${index})">${symbol}</td>`;
        }
        table += '</tr>';
    }

    table += '</table>';
    content.innerHTML = table;
}

function generateCircleSVG() {
    const color = '#00B0EF';
    const width = 70;
    const height = 70;

    return `<svg width="${width}" height="${height}">
              <circle cx="35" cy="35" r="30" stroke="${color}" stroke-width="5" fill="none">
                <animate attributeName="stroke-dasharray" from="0 188.5" to="188.5 0" dur="0.3s" fill="freeze" />
              </circle>
            </svg>`;
}

function generateCrossSVG() {
    const color = '#FFC000';
    const width = 70;
    const height = 70;

    return `<svg width="${width}" height="${height}">
              <line x1="5" y1="5" x2="65" y2="65" stroke="${color}" stroke-width="5">
                <animate attributeName="stroke-dasharray" from="0 76" to="76 0" dur="0.3s" fill="freeze" />
              </line>
              <line x1="5" y1="65" x2="65" y2="5" stroke="${color}" stroke-width="5">
                <animate attributeName="stroke-dasharray" from="0 76" to="76 0" dur="0.3s" fill="freeze" />
              </line>
            </svg>`;
}

function handleClick(cell, index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        cell.onclick = null;
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
        if (isGameFinished()) {
            const winCombination = getWinningCombination();
            drawWinningLine(winCombination);
        }

    }
}

function isGameFinished() {
    return fields.every((field) => field !== null) || getWinningCombination() !== null;
}

function getWinningCombination() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
            return winningCombinations[i];
        }
    }
    return null;
}

function drawWinningLine(combination) {
    const lineColor = '#ffffff';
    const lineWidth = 5;
    const startCell = document.querySelectorAll(`td`)[combination[0]];
    const endCell = document.querySelectorAll(`td`)[combination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();
    const contentRect = document.getElementById('content').getBoundingClientRect();
    const lineLength = Math.sqrt(
        Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
    );
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);

    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
    line.style.left = `${startRect.left + startRect.width / 2}px`;

    
    line.style.transform = `rotate(${lineAngle}rad)`;
    line.style.transformOrigin = `top left`;
    document.getElementById('content').appendChild(line);
}

function resetGame() {
    fields = Array(9).fill(null);
    currentPlayer = 'circle';
    render();
}
