export function getMergeSortAnimations(array) {
    const animations = [];
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        animations.push([i ,j]); //values being compared
        animations.push([i ,j]); //values being compared, we push them a second time to revert their color.
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[i++]; //if the left value is smaller, we push it to the main array
        } else {
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++]; //if the right value is smaller, we push it to the main array
        }
    }
    while (i <= middleIdx) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}
/* ---------------------- Quick Sort ---------------------- */
export function getQuickSortAnimations(array) {
    const animations = []; // This will hold the animations for the quick sort
    const arrayCopy = array.slice(); // Create a copy of the array to avoid mutating the original array
    quickSortHelper(arrayCopy, 0, arrayCopy.length - 1, animations); // Call this function to perform the quick sort
    return animations; 
}

function quickSortHelper(array, low, high, animations) {
    if (low < high) { // Base case: if the low index is less than the high index
        const pivotIndex = partition(array, low, high, animations); // Partition the array and get the pivot index
        quickSortHelper(array, low, pivotIndex - 1, animations); // Recursively sort the left part of the array
        quickSortHelper(array, pivotIndex + 1, high, animations); // Recursively sort the right part of the array
    }
}

function partition(array, low, high, animations) {
    const pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) { // Loop through the array from low to high
        animations.push([j, high, "compare"]); // Compare current element with pivot
        animations.push([j, high, "revert"]); // Revert the color of the compared elements
        if (array[j] < pivot) { // If current element is less than pivot
            i++;
            if (i !== j) {
                animations.push([i, j, array[j], array[i], "swap"]); // Swap elements if current element is less than pivot
                const temp = array[i]; // Store the value of the element at index i
                array[i] = array[j];
                array[j] = temp;
            }
        }
    }
    if (i + 1 !== high) { // If the pivot is not already in the correct position
        animations.push([i + 1, high, "compare"]); // Compare pivot with the element at index i + 1
        animations.push([i + 1, high, "revert"]); // Revert the color of the compared elements
        animations.push([i + 1, high, array[high], array[i + 1], "swap"]); // Swap pivot with the element at index i + 1
        const temp = array[i + 1]; // Store the value of the element at index i + 1
        array[i + 1] = array[high];
        array[high] = temp;
    }
    return i + 1; // Return the index of the pivot element after partitioning
}
/* ---------------------- Heap Sort ---------------------- */
export function getHeapSortAnimations(array) {
    const animations = [];
    const arrayCopy = array.slice();
    const n = arrayCopy.length; // Get the length of the array
    
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) { // Build the heap (rearrange the array)
        heapify(arrayCopy, n, i, animations); // Start from the last non-leaf node and heapify each node
    }
    
    for (let i = n - 1; i > 0; i--) { // Extract elements from the heap one by one
        animations.push([0, i, "compare"]); // Compare the root of the heap with the last element
        animations.push([0, i, "revert"]); // Revert the color of the compared elements
        animations.push([0, i, arrayCopy[i], arrayCopy[0], "swap"]); // Swap the root of the heap with the last element
        
        const temp = arrayCopy[0]; // Store the value of the root of the heap
        arrayCopy[0] = arrayCopy[i]; // Move the last element to the root of the heap
        arrayCopy[i] = temp; // Swap the root of the heap with the last element
        
        heapify(arrayCopy, i, 0, animations); // Heapify the reduced heap
    }
    
    return animations;
}

function heapify(array, heapSize, rootIndex, animations) { // Function to maintain the heap property
    let largest = rootIndex; // Initialize largest as root
    let left = 2 * rootIndex + 1; // Left child index
    let right = 2 * rootIndex + 2; // Right child index
    
    if (left < heapSize) { // If left child exists
        animations.push([left, largest, "compare"]);
        animations.push([left, largest, "revert"]);
        if (array[left] > array[largest]) { // If left child is larger than root
            largest = left;
        }
    }
    if (right < heapSize) { // If right child exists
        animations.push([right, largest, "compare"]);
        animations.push([right, largest, "revert"]);
        if (array[right] > array[largest]) { // If right child is larger than largest so far
            largest = right;
        }
    }
    if (largest !== rootIndex) { // If the largest is not the root
        animations.push([rootIndex, largest, "compare"]);
        animations.push([rootIndex, largest, "revert"]);
        animations.push([rootIndex, largest, array[largest], array[rootIndex], "swap"]); // Swap the root with the largest element
        
        const temp = array[rootIndex]; // Store the value of the root
        array[rootIndex] = array[largest]; // Move the largest element to the root
        array[largest] = temp; // Swap the root with the largest element
        
        heapify(array, heapSize, largest, animations); // Recursively heapify the affected subtree
    }
}
/* ---------------------- Bubble Sort ---------------------- */
export function getBubbleSortAnimations(array) {
    const animations = [];
    const arrayCopy = array.slice();
    const n = arrayCopy.length;
    
    for (let i = 0; i < n - 1; i++) { // Loop through the array n-1 times
        for (let j = 0; j < n - i - 1; j++) { // Loop through the array from 0 to n-i-1
            animations.push([j, j + 1, "compare"]); // Compare adjacent elements
            animations.push([j, j + 1, "revert"]); // Revert the color of the compared elements
            
            if (arrayCopy[j] > arrayCopy[j + 1]) { // If the current element is greater than the next element
                animations.push([j, j + 1, arrayCopy[j + 1], arrayCopy[j], "swap"]); // Swap the elements

                const temp = arrayCopy[j]; // Store the value of the current element
                arrayCopy[j] = arrayCopy[j + 1]; // Move the next element to the current position
                arrayCopy[j + 1] = temp; // Swap the elements
            }
        }
    }
    
    return animations;
}