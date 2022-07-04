
// * for dis-abling a selected button, and changing its style
function selectBtn() {
    let element = document.getElementById('bubble-sort-btn');
    element.classList.add('disabled');
    element.classList.remove('btn-secondary');
    element.classList.remove('active');
    element.classList.add('btn-outline-light');
    element.style.boxShadow = "none";
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