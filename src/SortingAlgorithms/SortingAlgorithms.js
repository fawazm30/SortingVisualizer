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
    const animations = []; // This will hold the animations for the heap sort
    const arrayCopy = array.slice(); // Create a copy of the array to avoid mutating the original array
    const n = arrayCopy.length; // Get the length of the array
    
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) { // Build the heap
        heapify(arrayCopy, n, i, animations); // Call heapify to build the heap
    }
   
    for (let i = n - 1; i > 0; i--) {
        animations.push([0, i, "compare"]);
        animations.push([0, i, "revert"]);
        animations.push([0, i, array[i], array[0], "swap"]);
        // swap in arrayCopy
        const temp = arrayCopy[0];
        arrayCopy[0] = arrayCopy[i];
        arrayCopy[i] = temp;
        heapify(arrayCopy, i, 0, animations);
    }
    return animations;
}

function heapify(array, heapSize, rootIndex, animations) {
    let largest = rootIndex;
    let left = 2 * rootIndex + 1;
    let right = 2 * rootIndex + 2;

    if (left < heapSize) {
        animations.push([left, largest, "compare"]);
        animations.push([left, largest, "revert"]);
        if (array[left] > array[largest]) {
            largest = left;
        }
    }

    if (right < heapSize) {
        animations.push([right, largest, "compare"]);
        animations.push([right, largest, "revert"]);
        if (array[right] > array[largest]) {
            largest = right;
        }
    }

    if (largest !== rootIndex) {
        animations.push([rootIndex, largest, "compare"]);
        animations.push([rootIndex, largest, "revert"]);
        animations.push([rootIndex, largest, array[largest], array[rootIndex], "swap"]);
        // swap in array
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