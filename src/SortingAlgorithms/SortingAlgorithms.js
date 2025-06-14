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
    const animations = [];
    const arrayCopy = array.slice();
    quickSortHelper(arrayCopy, 0, arrayCopy.length - 1, animations);
    return animations;
}

function quickSortHelper(array, low, high, animations) {
    if (low < high) {
        const pivotIndex = partition(array, low, high, animations);
        quickSortHelper(array, low, pivotIndex - 1, animations);
        quickSortHelper(array, pivotIndex + 1, high, animations);
    }
}

function partition(array, low, high, animations) {
    const pivot = array[high]; // Choose the last element as pivot
    let i = low - 1; // Index of smaller element
    
    for (let j = low; j < high; j++) {
        animations.push([j, high]);
        animations.push([j, high]); 
        
        if (array[j] < pivot) {
            i++;
            if (i !== j) {
                animations.push([i, j, array[j], array[i]]);
                const temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
    }
    
    if (i + 1 !== high) {
        animations.push([i + 1, high, array[high], array[i + 1]]);
        const temp = array[i + 1];
        array[i + 1] = array[high];
        array[high] = temp;
    }
    
    return i + 1; // Return the pivot index
}
/* ---------------------- Heap Sort ---------------------- */
export function getHeapSortAnimations(array) {
    const animations = [];
    const arrayCopy = array.slice();
    const n = arrayCopy.length;
    
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arrayCopy, n, i, animations);
    }
   
    for (let i = n - 1; i > 0; i--) {
        animations.push([0, i]); 
        animations.push([0, i]); 
        animations.push([0, i, arrayCopy[i], arrayCopy[0]]); 
        
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
        animations.push([left, largest]); 
        animations.push([left, largest]);
        
        if (array[left] > array[largest]) {
            largest = left;
        }
    }
    
    if (right < heapSize) {
        animations.push([right, largest]); 
        animations.push([right, largest]); 
        
        if (array[right] > array[largest]) {
            largest = right;
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