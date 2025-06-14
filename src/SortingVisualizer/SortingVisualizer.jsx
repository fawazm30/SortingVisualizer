import React from 'react';
import {getMergeSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js'; //import the sorting algorithms
import {getQuickSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import {getHeapSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import {getBubbleSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import './SortingVisualizer.css';


const ANIMATION_SPEED_MS = 1; //speed of the animation in milliseconds
const NUMBER_OF_ARRAY_BARS = 310; //number of bars in the array
const PRIMARY_COLOR = 'blue'; //color of the bars
const SECONDARY_COLOR = 'red'; //color of the bars when they are being compared


export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { //an array stored in the state
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray(); //reset the array when the component mounts
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 700));
        }
        this.setState({ array });
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array); //get the animations for the merge sort
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i]; //get the indices of the bars being compared
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color; //change the color of the bars being compared
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`; //change the height of the bar after comparison
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }
    quickSort() {
        const animations = getQuickSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            if (animations[i][2] === "compare" || animations[i][2] === "revert") {
                const [barOneIdx, barTwoIdx, action] = animations[i];
                const color = action === "compare" ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    arrayBars[barOneIdx].style.backgroundColor = color;
                    arrayBars[barTwoIdx].style.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else if (animations[i][4] === "swap") {
                const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = animations[i];
                setTimeout(() => {
                    arrayBars[barOneIdx].style.height = `${barOneHeight}px`;
                    arrayBars[barTwoIdx].style.height = `${barTwoHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        setTimeout(() => {
            this.setAllBarsToPrimary();
        }, animations.length * ANIMATION_SPEED_MS);
    }
    heapSort() {
        const animations = getHeapSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            if (animations[i][2] === "compare" || animations[i][2] === "revert") {
                const [barOneIdx, barTwoIdx, action] = animations[i];
                const color = action === "compare" ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    arrayBars[barOneIdx].style.backgroundColor = color;
                    arrayBars[barTwoIdx].style.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else if (animations[i][4] === "swap") {
                const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = animations[i];
                setTimeout(() => {
                    arrayBars[barOneIdx].style.height = `${barOneHeight}px`;
                    arrayBars[barTwoIdx].style.height = `${barTwoHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        setTimeout(() => {
            this.setAllBarsToPrimary();
        }, animations.length * ANIMATION_SPEED_MS);
    }
    bubbleSort() {
        const BUBBLE_SORT_SPEED = 0.1;
        const animations = getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            if (animations[i][2] === "compare" || animations[i][2] === "revert") {
                const [barOneIdx, barTwoIdx, action] = animations[i];
                const color = action === "compare" ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    arrayBars[barOneIdx].style.backgroundColor = color;
                    arrayBars[barTwoIdx].style.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else if (animations[i][4] === "swap") {
                const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = animations[i];
                setTimeout(() => {
                    arrayBars[barOneIdx].style.height = `${barOneHeight}px`;
                    arrayBars[barTwoIdx].style.height = `${barTwoHeight}px`;
                }, i * BUBBLE_SORT_SPEED);
            }
        }
        setTimeout(() => {
            this.setAllBarsToPrimary();
        }, animations.length * BUBBLE_SORT_SPEED);
    }

    setAllBarsToPrimary() {
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
        }
    }

    render() {
        const { array } = this.state; //destructure the array from the state

        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div className="array-bar" key={idx} style={{ backgroundColor: PRIMARY_COLOR, height: `${value}px` }}>
                    </div>
                ))}
                <div className="button-bar">
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                </div>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {  //function to generate a random number between min and max
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] != arrayTwo[i]) {
            return false;
        }
    }
    return true;
}
