console.log("Sending data...");

function sum(arr: Array<number>) {
  var _sum = arr.reduce(function (a, b) {
    return a + b;
  });

  return _sum;
}

function average(arr: Array<number>) {
  var _sum = sum(arr);
  var _avg = _sum / arr.length;

  return _avg;
}

var avg = average([1, 2, 3, 4, 5]);
console.log(avg);
