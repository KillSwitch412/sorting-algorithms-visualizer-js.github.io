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

let numbers = generateRandomArray(150);

function generateRandomArray(size) {
    let array = [];

    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 500) + 1);
    }

    return array;
}

displayArray();

// * display array to screen
function displayArray() {
    
    let test_data_container = document.getElementById('test-data-container');

    for (let i = 0; i < numbers.length; i++) {

        let new_data_node = `<div id="tst-d${i}" class="test-data">
        <div class="tooltiptext">${numbers[i]}</div>
        </div>`;

        test_data_container.innerHTML += new_data_node;
        document.getElementById(`tst-d${i}`).style.height = numbers[i] + 'px';

    }

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