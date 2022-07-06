// ! ---------- STARTING POINT ---------- 
// ! ---------- STARTING POINT ---------- 


let algorithmMap = {
    1: 'Bubble Sort',
    2: 'Selection Sort',
    3: 'Insertion Sort',
    4: 'Merge Sort',
    5: 'Quick Sort',
    6: 'Heap Sort',
}

// * default selected algorithm
let selectedAlgo = 1;

// * selecting bubble sort as default algorithn
selectAlgorithm(selectedAlgo);

let defaultSize = 60;
let defaultMin = 1;
let defaultMax = 100;
var pauseDuration = 10;

// * generating and displaying new random array at every refresh
let generatedData = generateRandomArray(defaultSize, defaultMin, defaultMax);
var numbers = generatedData['array'];
var largest = generatedData['largest'];
var smallest = generatedData['smallest'];

displayArray(numbers, largest, smallest, defaultMin, defaultMax);















// ! ---------- ARRAY GENERATING, EXECUTING SPEED AND DISPLAY RELATED FUNCTIONS ---------- 
// ! ---------- ARRAY GENERATING, EXECUTING SPEED AND DISPLAY RELATED FUNCTIONS ---------- 

// ! THE MAIN FUNCTION FOR GENERATING THE ARRAY
// * returns array, largest num, smallest num
function generateRandomArray(size = defaultSize, min = defaultMin, max = defaultMax) {
    let array = [];
    let largest = 0;
    let smallest = max;

    for (let i = 0; i < size; i++) {
        let randomVal = (Math.random() * max) + min;

        // * if val greater than max
        // ? sometimes happens due to rounding
        randomVal = randomVal > max ? randomVal -= min : randomVal;

        array.push(randomVal);

        if (randomVal > largest) {
            largest = array[i];
        }

        if (randomVal < smallest) {
            smallest = randomVal;
        }
    }

    console.log(`generated random array of size ${size}`)

    return {
        'array': array,
        'largest': largest,
        'smallest': smallest,
    };
}

// * called when user sets (new array size)
// * the ways it works is that, 
// * if user provided new size, the min and max equals default value
// * 
function setArrayAndValueConstraintsAndDisplay(size = defaultSize, min = defaultMin, max = defaultMax) {

    // * generating new array with new constraints
    generatedData = generateRandomArray(size, min, max);
    numbers = generatedData['array'];
    largest = generatedData['largest'];
    smallest = generatedData['smallest'];

    clearScreen();
    displayArray(numbers, largest, smallest, min, max);

    // * setting new values
    defaultSize = size;
    defaultMin = min;
    defaultMax = max;

}

// * called when user sets (new array size)
// * using the form, by entering their custom value
function generateArrayWithCustomSize() {
    let customSize = document.getElementById('custom-size-input').value;

    if (customSize < 1 || customSize > 200) {
        return;
    }

    setArrayAndValueConstraintsAndDisplay(size = customSize);
}

// ! clears playground
function clearScreen() {
    let test_data_container = document.getElementById('test-data-container');
    test_data_container.innerHTML = " ";
}

// ! to change pause duration
function setPauseDuration(ms) {
    pauseDuration = ms;
    document.getElementById('pause-duration').innerHTML = pauseDuration;
}

// ! this function displays the array visualy on the screen
// * with largest value taking 550px,
// * and all others relative to it
function displayArray(array, largest, smallest, min, max) {

    // * adapting width of the bars
    let padding = getAppropriatePadding(array.length);

    // * playground
    let test_data_container = document.getElementById('test-data-container');

    for (let i = 0; i < array.length; i++) {

        let new_data_node = `<div id="tst-d${i}" class="test-data">
        <div class="tooltiptext">${array[i].toFixed(1)}</div>
        </div>`;

        test_data_container.innerHTML += new_data_node;

        let height_relative_to_largest = (array[i] / largest) * 550;

        document.getElementById(`tst-d${i}`).style.height = height_relative_to_largest + 'px';
        document.getElementById(`tst-d${i}`).style.padding = padding;
    }

    // * displaying other data
    document.getElementById('array-size').innerHTML = array.length;
    document.getElementById('value-range').innerHTML = `Between ${min} to ${max}`;
    document.getElementById('largest-value').innerHTML = largest.toFixed(1);
    document.getElementById('smallest-value').innerHTML = smallest.toFixed(1);
    document.getElementById('pause-duration').innerHTML = pauseDuration;

}

// * used for getting the padding that is applied to the bars
// * for their width
// * less bars => thick bars
// * more bars => thin bars
function getAppropriatePadding(size) {

    if (size <= 10) {
        return "0px 38px"
    } else if (size <= 15) {
        return "0px 32px"
    } else if (size <= 20) {
        return "0px 28px"
    } else if (size <= 25) {
        return "0px 23px"
    } else if (size <= 30) {
        return "0px 18px"
    } else if (size <= 40) {
        return "0px 14px"
    } else if (size <= 60) {
        return "0px 9px"
    } else if (size <= 80) {
        return "0px 6px"
    } else if (size <= 100) {
        return "0px 5px"
    } else if (size <= 120) {
        return "0px 4px"
    } else if (size <= 150) {
        return "0px 3px"
    } else {
        return "0px 2px"
    }

}

// * to pause the program 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}






















// ! ---------- ALGORITHM RELATED FUNCTIONS ---------- 
// ! ---------- ALGORITHM RELATED FUNCTIONS ---------- 


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


// ! for starting the selected algorithm
async function startAlgo() {

    // * disable [start], [changeSize], [refresh] buttons
    let start_btn = document.getElementById('start-btn');
    let size_btn = document.getElementById('change-size-btn');
    let refresh_btn = document.getElementById('regen-btn');

    start_btn.classList.add('disabled');
    size_btn.classList.add('disabled');
    refresh_btn.classList.add('disabled');

    start_btn.classList.remove('btn-success');
    size_btn.classList.remove('btn-secondary');
    refresh_btn.classList.remove('btn-secondary');

    start_btn.classList.remove('active');
    size_btn.classList.remove('active');
    refresh_btn.classList.remove('active');

    start_btn.classList.add('btn-outline-success');
    size_btn.classList.add('btn-outline-secondary');
    refresh_btn.classList.add('btn-outline-secondary');

    start_btn.style.boxShadow = "none";

    // * start executing the selected algo
    switch (selectedAlgo) {
        case 1:
            await performBubbleSort(numbers);
            break;

        case 2:
            await performSelectionSort(numbers);
            break;

        case 3:
            break;

        case 4:
            break;

        case 5:
            break;

        case 6:
            break;
    }

    // * re-enable start button
    start_btn.classList.remove('disabled');
    size_btn.classList.remove('disabled');
    refresh_btn.classList.remove('disabled');

    start_btn.classList.remove('btn-outline-success');
    size_btn.classList.remove('btn-outline-secondary');
    refresh_btn.classList.remove('btn-outline-secondary');

    start_btn.classList.add('btn-success');
    size_btn.classList.add('btn-secondary');
    refresh_btn.classList.add('btn-secondary');

}


// ! ---------- BUBBLE SORT ----------
async function performBubbleSort(array) {

    let lastSorted = array.length - 1;
    let sorted = 1;

    for (let outerLoop = 0; outerLoop < array.length; outerLoop++) {

        let swapped = false;

        for (let i = 0; i < array.length - sorted; i++) {
            let data_node1 = document.getElementById(`tst-d${i}`);
            let data_node2 = document.getElementById(`tst-d${i + 1}`);

            let node1_height = data_node1.style.height;
            let node2_height = data_node2.style.height;

            let node1_innerHTML = data_node1.innerHTML;
            let node2_innerHTML = data_node2.innerHTML;

            // * change color to orange
            data_node1.style.backgroundColor = '#ffc107';
            data_node2.style.backgroundColor = '#ffc107';

            // * adding pause
            await sleep(pauseDuration);

            if (array[i] > array[i + 1]) {

                let temp = array[i];

                array[i] = array[i + 1];
                data_node1.style.height = node2_height;
                data_node1.innerHTML = node2_innerHTML;

                array[i + 1] = temp;
                data_node2.style.height = node1_height;
                data_node2.innerHTML = node1_innerHTML;

                swapped = true;

                // * change back to normal
                data_node1.style.backgroundColor = '#3CBEB4';
                data_node2.style.backgroundColor = '#3CBEB4';

            } else {
                data_node1.style.backgroundColor = '#6610f2';
                data_node2.style.backgroundColor = '#6610f2';
            }

        }

        // if not swapped
        if (!swapped) {
            break;
        }

        sorted = sorted + 1;

        document.getElementById(`tst-d${lastSorted}`).style.backgroundColor = "#6610f2";
        lastSorted = lastSorted - 1;
    }

}

async function performSelectionSort(array) {
    
    // stores the index of the last sorted number
    let lastSorted = -1;

    let smallestValIndex = 0;
    let smallestVal = array[smallestValIndex];

    for (let outerLoop = 0; outerLoop < array.length; outerLoop++) {
            
        smallestValIndex = outerLoop;
        smallestVal = array[smallestValIndex];

        for (let i = outerLoop; i < array.length; i++) {
            
            let current_node = document.getElementById(`tst-d${i}`);

            // * change color to orange
            current_node.style.backgroundColor = '#ffc107';

            // * finding smallest value
            if (array[i] < smallestVal) {
                
                // * change color of last smallest value to the normal color
                document.getElementById(`tst-d${smallestValIndex}`).style.backgroundColor = '#3CBEB4';

                // * new smllest value
                smallestVal = array[i];
                smallestValIndex = i;
                
                // * give purple to new smallest value
                current_node.style.backgroundColor = '#6610f2';

                // * adding pause
                await sleep(pauseDuration);
                continue;
            }
            
            // * adding pause
            await sleep(pauseDuration);

            // * change back to normal
            current_node.style.backgroundColor = '#3CBEB4';
        }

        lastSorted = lastSorted + 1;

        // * swapping heights 
        let data_node1 = document.getElementById(`tst-d${lastSorted}`);
        let node1_height = data_node1.style.height;
        let node1_innerHTML = data_node1.innerHTML;

        let data_node2 = document.getElementById(`tst-d${smallestValIndex}`);
        let node2_height = data_node2.style.height;
        let node2_innerHTML = data_node2.innerHTML;

        data_node1.style.height = node2_height;
        data_node1.innerHTML = node2_innerHTML;
        data_node1.style.backgroundColor = '#6610f2';

        data_node2.style.height = node1_height;
        data_node2.innerHTML = node1_innerHTML;
        if (node1_height != node2_height) {
            data_node2.style.backgroundColor = '#3CBEB4';
        }
        
        // * swapping array values
        let temp = array[lastSorted];
        array[lastSorted] = array[smallestValIndex];
        array[smallestValIndex] = temp;
    }

}