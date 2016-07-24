function Filter( data, fn ) {
  var newArr = [];

    for (var key in data) {
      if (data.hasOwnProperty(key) && fn(data[key])) {
          newArr.push(data[key]);
      }
    }
  return newArr;
}

export default Filter;
