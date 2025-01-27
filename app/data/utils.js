export const range = (start, end, step = 1) => {
    let output = [];
    if (typeof end === 'undefined') {
      end = start;
      start = 0;
    }
    for (let i = start; i < end; i += step) {
      output.push(i);
    }
    return output;
  };

export const isNumber = ((string) => {
  const num = Number(string);
  const isNum = Number.isInteger(num)
  return isNum
});