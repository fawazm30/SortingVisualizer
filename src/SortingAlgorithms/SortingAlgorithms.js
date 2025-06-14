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
    const pivot = array[high]; // Choose the last element as pivot
    let i = low - 1; // Index of smaller element
    
    for (let j = low; j < high; j++) { // Loop through the array from low to high
        animations.push([j, high]); // Highlight the current element and the pivot
        animations.push([j, high]); // Highlight the current element and the pivot again to revert color
        
        if (array[j] < pivot) { // If the current element is smaller than the pivot
            i++; // Increment the index of the smaller element
            if (i !== j) { // If i is not equal to j, we need to swap
                animations.push([i, j, array[j], array[i]]); // Record the swap animation
                const temp = array[i]; // Swap the elements
                array[i] = array[j]; // Assign the current element to the smaller index
                array[j] = temp; // Assign the smaller element to the current index
            }
        }
    }
    
    if (i + 1 !== high) { // If the pivot is not already in the correct position
        animations.push([i + 1, high, array[high], array[i + 1]]); // Record the swap animation
        const temp = array[i + 1]; // Swap the pivot with the element at i + 1
        array[i + 1] = array[high]; // Assign the pivot to the smaller index
        array[high] = temp; // Assign the smaller element to the pivot index
    }
    
    return i + 1; // Return the pivot index
}
/* ---------------------- Heap Sort ---------------------- */
export function getHeapSortAnimations(array) {
    const animations = []; // This will hold the animations for the heap sort
    const arrayCopy = array.slice(); // Create a copy of the array to avoid mutating the original array
    const n = arrayCopy.length; // Get the length of the array
    
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) { // Build the heap
        heapify(arrayCopy, n, i, animations); // Call heapify to build the heap
    }
   
    for (let i = n - 1; i > 0; i--) { // Extract elements from the heap
        animations.push([0, i]); // Highlight the root and the last element
        animations.push([0, i]); // Highlight the root and the last element again to revert color
        animations.push([0, i, arrayCopy[i], arrayCopy[0]]); // Record the swap animation

        const temp = arrayCopy[0]; // Swap the root with the last element
        arrayCopy[0] = arrayCopy[i]; // Assign the last element to the root
        arrayCopy[i] = temp; // Assign the root to the last element
        
        heapify(arrayCopy, i, 0, animations); // Call heapify to maintain the heap property after the swap
    }
    
    return animations;
}

function heapify(array, heapSize, rootIndex, animations) { // This function maintains the heap property for the subtree rooted at rootIndex
    let largest = rootIndex; // Initialize largest as root
    let left = 2 * rootIndex + 1; // Left child index
    let right = 2 * rootIndex + 2; // Right child index
    
    if (left < heapSize) { // Check if left child exists
        animations.push([left, largest]); // Highlight the left child and the largest element
        animations.push([left, largest]); // Highlight the left child and the largest element again to revert color

        if (array[left] > array[largest]) { // If the left child is larger than the root
            largest = left; // Update largest to left child's index
        }
    }
    
    if (right < heapSize) { // Check if right child exists
        animations.push([right, largest]); // Highlight the right child and the largest element
        animations.push([right, largest]); // Highlight the right child and the largest element again to revert color
        
        if (array[right] > array[largest]) { // If the right child is larger than the current largest
            largest = right; // Update largest to right child's index
        }
    }
    
    if (largest !== rootIndex) {
        animations.push([rootIndex, largest]); 
        animations.push([rootIndex, largest]); 
        animations.push([rootIndex, largest, array[largest], array[rootIndex]]); 
        
        const temp = array[rootIndex];
        array[rootIndex] = array[largest];
        array[largest] = temp;
        
        heapify(array, heapSize, largest, animations);
    }
}
/* ---------------------- Bubble Sort ---------------------- */
export function getBubbleSortAnimations(array) {
    const animations = [];
    const arrayCopy = array.slice();
    const n = arrayCopy.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            animations.push([j, j + 1]);
            animations.push([j, j + 1]); 
            
            if (arrayCopy[j] > arrayCopy[j + 1]) {
                animations.push([j, j + 1, arrayCopy[j + 1], arrayCopy[j]]);
                
                const temp = arrayCopy[j];
                arrayCopy[j] = arrayCopy[j + 1];
                arrayCopy[j + 1] = temp;
            }
        }
    }
    
    return animations;
}