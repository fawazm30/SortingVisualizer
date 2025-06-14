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
    for (let j = low; j < high; j++) {
        animations.push([j, high, "compare"]);
        animations.push([j, high, "revert"]);
        if (array[j] < pivot) {
            i++;
            if (i !== j) {
                // Push swap with new heights
                animations.push([i, j, array[j], array[i], "swap"]);
                // Swap in underlying array
                const temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
    }
    if (i + 1 !== high) {
        animations.push([i + 1, high, "compare"]);
        animations.push([i + 1, high, "revert"]);
        animations.push([i + 1, high, array[high], array[i + 1], "swap"]);
        const temp = array[i + 1];
        array[i + 1] = array[high];
        array[high] = temp;
    }
    return i + 1;
}
/* ---------------------- Heap Sort ---------------------- */
export function getHeapSortAnimations(array) {
    const animations = [];
    const arrayCopy = array.slice();
    const n = arrayCopy.length;
    
    // Build max heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arrayCopy, n, i, animations);
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end (swap)
        animations.push([0, i]); // Comparison animation
        animations.push([0, i]); // Revert color
        animations.push([0, i, arrayCopy[i], arrayCopy[0]]); // Swap animation
        
        // Perform the swap
        const temp = arrayCopy[0];
        arrayCopy[0] = arrayCopy[i];
        arrayCopy[i] = temp;
        
        // Call heapify on the reduced heap
        heapify(arrayCopy, i, 0, animations);
    }
    
    return animations;
}

function heapify(array, heapSize, rootIndex, animations) {
    let largest = rootIndex; // Initialize largest as root
    let left = 2 * rootIndex + 1; // Left child
    let right = 2 * rootIndex + 2; // Right child
    
    // If left child is larger than root
    if (left < heapSize) {
        animations.push([left, largest]); // Compare left child with current largest
        animations.push([left, largest]); // Revert color
        
        if (array[left] > array[largest]) {
            largest = left;
        }
    }
    
    // If right child is larger than largest so far
    if (right < heapSize) {
        animations.push([right, largest]); // Compare right child with current largest
        animations.push([right, largest]); // Revert color
        
        if (array[right] > array[largest]) {
            largest = right;
        }
    }
    
    // If largest is not root
    if (largest !== rootIndex) {
        animations.push([rootIndex, largest]); // Comparison before swap
        animations.push([rootIndex, largest]); // Revert color
        animations.push([rootIndex, largest, array[largest], array[rootIndex]]); // Swap animation
        
        // Perform the swap
        const temp = array[rootIndex];
        array[rootIndex] = array[largest];
        array[largest] = temp;
        
        // Recursively heapify the affected sub-tree
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
            animations.push([j, j + 1, "compare"]);
            animations.push([j, j + 1, "revert"]); 
            
            if (arrayCopy[j] > arrayCopy[j + 1]) {
                animations.push([j, j + 1, arrayCopy[j + 1], arrayCopy[j], "swap"]);

                const temp = arrayCopy[j];
                arrayCopy[j] = arrayCopy[j + 1];
                arrayCopy[j + 1] = temp;
            }
        }
    }
    
    return animations;
}