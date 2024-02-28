let array: number[] = [];

document.addEventListener('DOMContentLoaded', () => {
  const sorts = document.querySelectorAll('.link');
  sorts.forEach(sort => {
    sort.addEventListener('click', (e: any) => {
      localStorage.setItem('sort', e.target!.textContent!);
      window.location.href = "canvas.html";
    })
  })
})

const generateArray = () => {
  const numbers: number[] = [];
  for (let i = 1; i <= 100; i++) numbers.push(i);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers
}

const renderArray = () => {
  const canvas = <HTMLCanvasElement>document.getElementById("canvas");
  const ctx = canvas.getContext('2d');

  ctx?.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = 5;
  const barSpacing = 2;
  const maxHeight = canvas.height - 20;
  const maxValue = Math.max(...array);

  const totalWidth = (barWidth + barSpacing) * array.length;
  const startX = (canvas.width - totalWidth) / 2;

  for (let i = 0; i < array.length; i++) {
    const barHeight = (array[i] / maxValue) * maxHeight;
    const x = startX + i * (barWidth + barSpacing);
    const y = canvas.height - barHeight;
    ctx?.fillRect(x, y, barWidth, barHeight);
  }
}

const delay = (delay: number): Promise<void> => {
  return new Promise<void>(resolve => setTimeout(resolve, delay));
}

const bubbleSort = async (arr: number[]) => {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        // Last i elements are already in place, so we can ignore them
        for (let j = 0; j < n - i - 1; j++) {
            // Swap if the element found is greater than the next element
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j+1]
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                array = arr;
                renderArray();
                await delay(1);
            }
        }
    }
    return arr;
}

const selectionSort = async (arr: number[]) => {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        // Find the index of the minimum element in the unsorted part of the array
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // Swap the minimum element with the first element of the unsorted part
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            array = arr;
            renderArray();
            await delay(1);
        }
    }
}

array = generateArray();
(window as any)[localStorage.getItem('sort')!](array);

