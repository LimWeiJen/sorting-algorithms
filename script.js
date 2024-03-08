let array = [];

document.addEventListener('DOMContentLoaded', () => {
  const sorts = document.querySelectorAll('.link');
  sorts.forEach(sort => {
    sort.addEventListener('click', (e) => {
      localStorage.setItem('sort', e.target.textContent);
      window.location.href = "canvas.html";
    })
  })
})

const generateArray = () => {
  const numbers = [];
  for (let i = 1; i <= 200; i++) numbers.push(i);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers
}

const renderArray = (arr) => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');

  ctx?.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = 3;
  const barSpacing = 2;
  const maxHeight = canvas.height - 20;
  const maxValue = Math.max(...array);

  const totalWidth = (barWidth + barSpacing) * arr.length;
  const startX = (canvas.width - totalWidth) / 2;

  for (let i = 0; i < arr.length; i++) {
    const barHeight = (arr[i] / maxValue) * maxHeight;
    const x = startX + i * (barWidth + barSpacing);
    const y = canvas.height - barHeight;
    ctx?.fillRect(x, y, barWidth, barHeight);
  }
}

const delay = (delay) => {
  return new Promise(resolve => setTimeout(resolve, delay));
}


// Function to sort an array using bubble sort algorithm
async function bubbleSort(arr) {
    const n = arr.length;

    // Iterate through the array
    for (let i = 0; i < n - 1; i++) {
        // Inner loop to traverse the array and compare adjacent elements
        for (let j = 0; j < n - i - 1; j++) {
            // If the current element is greater than the next element, swap them
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                // Render the array and wait for a delay
                renderArray(arr);
                await delay(1);
            }
        }
    }
    // Return the sorted array
    return arr;
}

// Function to sort an array using selection sort algorithm
async function selectionSort(arr) {
    const n = arr.length;

    // Iterate through the array
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        // Find the index of the minimum element in the unsorted part of the array
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // If the minimum element is not at its correct position, swap it
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            // Render the array and wait for a delay
            renderArray(arr);
            await delay(100);
        }
    }
}

// Function to sort an array using insertion sort algorithm
async function insertionSort(arr) {
    const len = arr.length;
    for (let i = 1; i < len; i++) {
        let key = arr[i];
        let j = i - 1;
        // Move elements of arr[0..i-1], that are greater than key, to one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            // Render the array and wait for a delay
            renderArray(arr);
            await delay(1);
            j--;
        }
        arr[j + 1] = key;
        // Render the array and wait for a delay
        renderArray(arr);
        await delay(1);
    }
    // Return the sorted array
    return arr;
}

// Function to sort an array using merge sort algorithm
async function mergeSort(arrs) {

  // Function to merge two subarrays of arr[]
  async function merge(arr, start, mid, end) {
    let start2 = mid + 1;

    if (arr[mid] <= arr[start2]) {
        return;
    }

    while (start <= mid && start2 <= end) {
        if (arr[start] <= arr[start2]) {
            start++;
        } else {
            let value = arr[start2];
            let index = start2;

            while (index !== start) {
                arr[index] = arr[index - 1];
                // Render the array and wait for a delay
                index--;
            }
            arr[start] = value;
            renderArray(arr);
            await delay(0.01);

            start++;
            mid++;
            start2++;
        }
    }
  }

  // Function to recursively sort the array
  async function sort(arr, start = 0, end = arr.length - 1) {
    if (start < end) {
        const mid = Math.floor((start + end) / 2);
        await sort(arr, start, mid);
        await sort(arr, mid + 1, end);
        await merge(arr, start, mid, end);
    }
  }

  await sort(arrs);
}


// Function to sort an array using quick sort algorithm
async function quickSort(arr) {
  // Function to partition the array and return the pivot index
  async function partition(ar, low, high) {
    let pivot = ar[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (ar[j] <= pivot) {
        i += 1;
        [ar[i], ar[j]] = [ar[j], ar[i]];
        // Render the array and wait for a delay
        renderArray(ar);
        await delay(1);
      }
    }
    [ar[i+1], ar[high]] = [ar[high], ar[i+1]];
    // Render the array and wait for a delay
    renderArray(ar);
    await delay(1);
    return i + 1
  }

  // Function to recursively sort the array
  async function sort(ar, low, high) {
    if (low < high) {
      let pivot_index = await partition(ar, low, high);
      await sort(ar, low, pivot_index - 1);
      await sort(ar, pivot_index + 1, high);
    }
  }

  await sort(arr, 0, arr.length - 1);
}

// Function to sort an array using heap sort algorithm
async function heapSort(arrs) {
  // Function to heapify a subtree rooted with node i
  async function heapify(arr, n, i) {
    let largest = i; // Initialize largest as root
    const left = 2 * i + 1; // Left child
    const right = 2 * i + 2; // Right child

    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // If largest is not root
    if (largest !== i) {
        // Swap root with largest
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        // Render the array and wait for a delay
        renderArray(arr);
        await delay(1);

        // Recursively heapify the affected sub-tree
        await heapify(arr, n, largest);
    }
  }

  // Function to perform heap sort
  async function heapSort(arr) {
    const n = arr.length;

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i);
    }

    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [arr[0], arr[i]] = [arr[i], arr[0]];
        // Render the array and wait for a delay
        renderArray(arr);
        await delay(1);

        // Call max heapify on the reduced heap
        await heapify(arr, i, 0);
    }
  }

  heapSort(arrs);
}

// Function to sort an array using radix sort algorithm
async function radixSort(arr) {
  // Function to get the digit of a number at a given place
  function getDigit(num, place) {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
  }

  // Helper function to count the number of digits in the maximum number
  function digitCount(num) {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
  }

  // In-place radix sort function
  const maxDigits = Math.max(...arr.map(digitCount));
  for (let k = 0; k < maxDigits; k++) {
      // Counting sort for each digit position
      const counts = Array.from({ length: 10 }, () => 0);
      for (let i = 0; i < arr.length; i++) {
          const digit = getDigit(arr[i], k);
          counts[digit]++;
      }
      for (let i = 1; i < counts.length; i++) {
          counts[i] += counts[i - 1];
      }
      const temp = [...arr];
      for (let i = arr.length - 1; i >= 0; i--) {
          const digit = getDigit(temp[i], k);
          arr[--counts[digit]] = temp[i];
          // Render the array and wait for a delay
          renderArray(arr);
          await delay(1);
      }
  }
}

// Function to sort an array using cocktail shaker sort algorithm
async function cocktailShakerSort(arr) {
    let swapped = true;
    let start = 0;
    let end = arr.length - 1;

    while (swapped) {
        // Reset the swapped flag
        swapped = false;

        // Forward pass (like bubble sort)
        for (let i = start; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                // Swap elements
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
                // Render the array and wait for a delay
                renderArray(arr);
                await delay(0.01);
            }
        }
        
        // If no swaps occurred, the array is sorted
        if (!swapped) break;

        // Update the end index
        end--;

        // Backward pass
        for (let i = end; i > start; i--) {
            if (arr[i] < arr[i - 1]) {
                // Swap elements
                [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
                swapped = true;
                // Render the array and wait for a delay
                renderArray(arr);
                await delay(0.01);
            }
        }

        // Update the start index
        start++;
    }
}

array = generateArray();
window[localStorage.getItem("sort")](array);
let code = window[localStorage.getItem("sort")].toString();
$('.title').text(localStorage.getItem("sort").toString().toUpperCase().replace("SORT", " SORT"));
$('code').text(code);
