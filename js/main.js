let algorithmMap = {
    1: 'Bubble Sort',
    2: 'Heap Sort',
    3: 'Insertion Sort',
    4: 'Merge Sort',
}

// * default selected algorithm
let selectedAlgo = 1;

// * selecting bubble sort as default algorithn
selectAlgorithm(selectedAlgo);

let generatedData = generateRandomArray(150, 1, 100);
var numbers = generatedData['array'];
var largest = generatedData['largest'];

function generateRandomArray(size, min, max) {
    let array = [];
    let largest = 0;

    for (let i = 0; i < size; i++) {
        let randomVal = (Math.random() * max) + min;

        // * if val greater than max
        // ? sometimes happens due to rounding
        randomVal = randomVal > max ? randomVal -= 1 : randomVal;

        array.push(randomVal);

        if (randomVal > largest) {
            largest = array[i];
        }
    }

    console.log(`generated random array of size ${size}`)

    return {
        'array': array,
        'largest': largest,
    };
}

displayArray(numbers, largest);

// * this function displays the array visualy on the screen
// * with largest value taking 550px,
// * and all others relative to it
function displayArray(array, largest) {

    let test_data_container = document.getElementById('test-data-container');

    for (let i = 0; i < array.length; i++) {

        let new_data_node = `<div id="tst-d${i}" class="test-data">
        <div class="tooltiptext">${array[i].toFixed(1)}</div>
        </div>`;

        test_data_container.innerHTML += new_data_node;

        let height_relative_to_largest = (array[i] / largest) * 550;

        document.getElementById(`tst-d${i}`).style.height = height_relative_to_largest + 'px';

    }

}

// * traverse through array
async function traverseArray(array) {
    for (let i = 0; i < array.length; i++) {
        let data_node = document.getElementById(`tst-d${i}`);

        // change color to black
        data_node.style.backgroundColor = '#1e1e1e';

        await sleep(30);

        // change back to normal
        data_node.style.backgroundColor = '#3CBEB4';
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// * for selecting and de-selecting an algorithm
function selectAlgorithm(algoNumber) {

    // * 1) first re-enable the previous selected Algorithm button
    let element = document.getElementById('algo-' + selectedAlgo);
    element.classList.remove('disabled');
    element.classList.remove('btn-outline-light');
    element.classList.add('btn-secondary');

    // * 2) disable button of the new selected algo
    element = document.getElementById('algo-' + algoNumber);
    element.classList.add('disabled');
    element.classList.remove('btn-secondary');
    element.classList.remove('active');
    element.classList.add('btn-outline-light');
    element.style.boxShadow = "none";

    // * 3) assign new algoritm number
    selectedAlgo = algoNumber;

    console.log(`selected algo-${algoNumber} (${algorithmMap[algoNumber]})`)
}

async function startAlgo() {

    // * disable start and reset button
    let start_btn = document.getElementById('start-btn');
    let reset_btn = document.getElementById('reset-btn');

    start_btn.classList.add('disabled');
    reset_btn.classList.add('disabled');

    start_btn.classList.remove('btn-success');
    reset_btn.classList.remove('btn-warning');

    start_btn.classList.remove('active');

    start_btn.classList.add('btn-outline-success');
    reset_btn.classList.add('btn-outline-warning');

    start_btn.style.boxShadow = "none";

    // * traverse array
    await traverseArray(numbers);

    // * re-enable start and reset button
    start_btn.classList.remove('disabled');
    reset_btn.classList.remove('disabled');

    start_btn.classList.remove('btn-outline-success');
    reset_btn.classList.remove('btn-outline-warning');

    start_btn.classList.add('btn-success');
    reset_btn.classList.add('btn-warning');

}