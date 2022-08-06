const array = [];
let halt = false;
let arrayExists = false;
let alreadySorting = false;

// Generate and then display the array
function createArray() {
    arrayExists = true;
    generateArray();
    displayArray(array);
}

// Generates an array consisting of n random integers from 5 to 100 (inclusive),
// where n is determined by the slider input
function generateArray() {
    const length = document.getElementById("array_size").value;

    // Empty the array
    // Stop any current asynchronous sorting algorithm
    halt = true;
    array.splice(0, array.length);
    // Populate the array with random numbers
    for (let i = 0; i < length; i++) {
        array[i] = randomNumber();
    }
}

// Displays the array to the website
function displayArray(arr) {
    const arrayContainer = document.getElementById("array_container");
    const length = document.getElementById("array_size").value;
    arrayContainer.innerHTML = "";
    
    // Manipulate HTML to display array
    for (let i = 0; i < length; i++) {
        const arrayElement = document.createElement("div");
        arrayElement.classList.add("array_element");
        arrayElement.style.height = arr[i] + "%";
        arrayElement.style.width = arrayContainer.clientWidth / length + "px";
        arrayContainer.appendChild(arrayElement);
    }
}

// Generates a random integer between 5 and 100 (inclusive)
function randomNumber() {
    return Math.floor(Math.random() * 95) + 5;
}

// Halts execution for a set number of milliseconds
async function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

// Selection Sort
async function selectionSort() {
    // Ensure an array exists
    if (!arrayExists) {
        createArray();
    }

    // Do nothing if we are already sorting
    if (alreadySorting) {
        return;
    }

    const length = array.length;
    const speed = document.getElementById("sort_speed").value;
    halt = false;
    alreadySorting = true;
    // Iterate over the unsorted subarray
    for (let i = 0; i < length - 1; i++) {
        // Halt execution if a new array has been generated
        if (halt) {
            alreadySorting = false;
            return;
        }

        // Find the minimum element in the unsorted subarray
        let minIndex = i;
        for (let j = i + 1; j < length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        // Swap the minimum element in the unsorted subarray with the first element of the unsorted subarray
        let temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;

        // Display thge updated array to the user
        await sleep(500 - speed);
        displayArray(array);
    }

    alreadySorting = false;
}

// Insertion Sort
async function insertionSort() {
    // Ensure an array exists
    if (!arrayExists) {
        createArray();
    }

    // Do nothing if we are already sorting
    if (alreadySorting) {
        return;
    }

    const length = array.length;
    const speed = document.getElementById("sort_speed").value;
    halt = false;
    alreadySorting = true;
    // Iterate from the second element to the last element, inserting new elements into the sorted sub array
    for (let i = 1; i < length; i++) {
        if (halt) {
            alreadySorting = false;
            break; // Halt execution if a new array has been generated
        }

        let current = array[i];
        let prevIndex = i - 1;

        while (prevIndex >= 0 && array[prevIndex] > current) {
            // Move elements of the sorted array to greater indices if larger than current value
            array[prevIndex + 1] = array[prevIndex];
            prevIndex -= 1;
        }

        // Put the current value in the array at its proper location within the sorted sub array
        array[prevIndex + 1] = current;
        // Display this step to the user after the specified delay
        await sleep(500 - speed);
        displayArray(array);
    }

    alreadySorting = false;
}

// Bubble Sort
async function bubbleSort() {
    // Ensure an array exists
    if (!arrayExists) {
        createArray();
    }

    // Do nothing if we are already sorting
    if (alreadySorting) {
        return;
    }

    const length = array.length;
    const speed = document.getElementById("sort_speed").value;
    halt = false;
    let flag = false;
    alreadySorting = true;
    // Iterate over the array
    for (let i = 0; i < length - 1; i++) {
        flag = false;
        for (let j = 0; j < length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j + 1];
                array[j + 1] = array[j];
                array[j] = temp;
                flag = true;
            } else if (halt) { // Break execution if a new array has been generated
                alreadySorting = false;
                return;
            }

            // Display each step to the user
            await sleep(500 - speed);
            displayArray(array);
        }

        if (!flag) {
            break;
        }
    }

    alreadySorting = false;
}

// Globally called Quick Sort
function mainQuickSort() {
    halt = false;

    // Halt execution if already sorting
    if (alreadySorting) {
        return;
    }

    // Ensure an array exists
    if (!arrayExists) {
        createArray();
    }

    alreadySorting = true;
    quickSort(array, 0, array.length - 1);
    displayArray(array);
    alreadySorting = false;
}

// Recursively called Quick Sort
async function quickSort(arr, start, end) {
    const speed = document.getElementById("sort_speed").value;
    // Do nothing if end <= start
    if (end <= start) {
        return;
    }

    const length = array.length;
    let pivotIndex = partition(arr, start, end);

    if (halt) {
        alreadySorting = false;
        return;
    }

    quickSort(arr, start, pivotIndex - 1);

    // Display each step to the user
    await sleep(500 - speed);
    displayArray(array);

    quickSort(arr, pivotIndex + 1, end);
}

// Returns the index of the pivot for the array using the median of three rule
function pivot(array, start, end) {
    const threeVals = [array[0], array[(end + start) / 2], array[length - 1]];
    
    // Use differences to find the median
    let x = threeVals[0] - threeVals[1];
    let y = threeVals[1] - threeVals[2];
    let z = threeVals[0] - threeVals[2];

    if (x * y > 0) { 
        return length / 2;
    } else if (x * z > 0) {
        return end;
    }

    return start;
}

// Partitions the subarray from start to end, where all elements greater than the pivot are to the right of it and vice versa
// Geeksforgeeks.org/quick-sort was used as a guide for the partitioning algorithm
function partition(array, start, end) {
    let pivotIndex = pivot(array, start, end);
    let pivotValue = array[pivotIndex];
    // Move pivot to the end
    array[pivotIndex] = array[end];
    array[end] = pivotValue;

    let i = start - 1;
    for (let j = start; j <= end - 1; j++) {
        if (array[j] < pivotValue) {
            i++;
            temp = array[i];
            array[i] = array[j];
            array[j] = temp; 
        }
    }
    temp = array[i + 1];
    array[i + 1] = array[end];
    array[end] = temp; 
    return i + 1;
}

// Heap Sort
// Notes from CSC-207 class were used to create heap sort algorithm
async function heapSort() {
    halt = false;

    // Ensure an array exists
    if (!arrayExists) {
        createArray();
    }

    // Do nothing if we are already sorting
    if (alreadySorting) {
        return;
    }

    alreadySorting = true;
    const size = array.length;
    const speed = document.getElementById("sort_speed").value;
    // Build the binary heap using an array implementation (0-indexed, meaning 2i + 1 is the left child, 2i + 2 is the right child, and (i - 1) / 2 is the parent)
    for (let i = size / 2 - 1; i >= 0; i--) {
        heapify(array, size, i);

        if (halt) {
            alreadySorting = false;
            return;
        }
    }

    // Place elements in sorted place one by one
    for (let i = size - 1; i > 0; i--) {
        if (halt) {
            alreadySorting = false;
            return;
        }

        let temp = array[0]; // Get root
        array[0] = array[i]; // Swap root to the end of the array
        array[i] = temp;

        // Ensure the heap remains sorted
        heapify(array, i, 0);

        // Display the step to the user
        await sleep(500 - speed);
        displayArray(array);
    }
    
    alreadySorting = false;
}

// Transforms the array into a max-heap implemented as an array
function heapify(array, size, index) {
    let root = index;
    let left = 2 * index + 1;
    let right = 2 * index + 2;

    // If the left child is larger, swap with current value at index
    if (left < size && array[left] > array[root]) {
        root = left;
    }

    // If the right child is larger, swap with current value at index
    if (right < size && array[right] > array[root]) {
        root = right;
    }

    // Check if the root has been changed
    if (root != index) {
        let temp = array[index];
        array[index] = array[root];
        array[root] = temp;

        // Sort the affected sub-tree
        heapify(array, size, root);
    }
}