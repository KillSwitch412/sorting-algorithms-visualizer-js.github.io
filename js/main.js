let algorithms = {
    1: 'Bubble Sort',
    2: 'Heap Sort',
    3: 'Insertion Sort',
    4: 'Merge Sort',
}

// * default selected algorithm
let selectedAlgo = 1;

// * selecting bubble sort as default algorithn
selectAlgorithm(1);

// * for dis-abling a selected button, and changing its style
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
}

function bubbleSort(numbers) {
    for (let i = 0; i < numbers.length; i++) {
        let swapped = false;
        for (let j = 0; j < numbers.length - 1; j++) {
            if (numbers[j] > numbers[j + 1]) {
                let temp = numbers[j];
                numbers[j] = numbers[j + 1];
                numbers[j + 1] = temp;
                swapped = true;
            }
        }
        // if not swapped
        if (!swapped) {
            break;
        }
    }
}