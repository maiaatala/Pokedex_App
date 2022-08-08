export const normalizeAPITexts = (text) => {
  let normalizedText = ""

  normalizedText = text
    .replace("\u000c", " ")
    .replace(/(\r\n|\n|\r)/gm, " ")
    .replace("POKéMON", "pokémon")
    .replace("  ", " ")

  return normalizedText
}

export function partition(arr, label, start = 0, end = arr.length - 1) {
  let pivot = arr[start][label]
  let swapIdx = start

  for (let i = start + 1; i <= end; i++) {
    if (arr[i][label] < pivot) {
      swapIdx = swapIdx + 1
      ;[arr[i], arr[swapIdx]] = [arr[swapIdx], arr[i]]
    }
  }

  ;[arr[swapIdx], arr[start]] = [arr[start], arr[swapIdx]]

  return swapIdx
}

//this is in ascending order, use array.prototype.reverse() to get descendeing order
//includes to search by pokemon and toString(gameIndex)
//binary search for the id in the pokemon page (i think the data comes ordered by id already)
//
export function quickSort(arr, label, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIndex = partition(arr, label, left, right)

    //left subarray
    quickSort(arr, label, left, pivotIndex - 1)

    //right subarray
    quickSort(arr, label, pivotIndex + 1, right)
  }

  return arr
}
