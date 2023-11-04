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
            let symbol ='';
            if (value === 'circle') {
                symbol = generateCircleSVG();
            } else if (value === 'cross') {
                symbol = generateCrossSVG();
            }
            table +=`<td onclick="handleClick(this, ${index})">${symbol}</td>`;
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

function handleClick(index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        cell.onclick = null;
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
    }
}


