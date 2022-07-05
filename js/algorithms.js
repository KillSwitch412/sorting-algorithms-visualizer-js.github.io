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

function mergeSort() {
    console.log('Merge Sort');
}