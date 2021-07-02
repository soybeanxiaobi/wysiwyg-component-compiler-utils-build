// 数字转货币
const numberToCurrency = (number, symbol, places, thousand, decimal) => {
  let tNumber = number || 0;
  const tPlace = Math.abs(places);
  places = !isNaN(tPlace) ? places : 2;
  symbol = symbol !== undefined ? symbol : '¥';
  thousand = thousand || ',';
  decimal = decimal || '.';
  const negative = tNumber < 0 ? '-' : '';
  tNumber = Math.abs(+number || 0).toFixed(places)
  const i = parseInt((tNumber), 10) + '';
  let j = i.length;
  j = j > 3 ? j % 3 : 0;

  return (
    symbol +
    negative +
    (j ? i.substr(0, j) + thousand : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) +
    (places
      ? decimal +
      Math.abs(number - i)
        .toFixed(places)
        .slice(2)
      : '')
  );
};

// 日期裁剪
const sliceData = (data, start, end) => {
  if (typeof data === 'undefined' || !data.length) return '';
  return data.slice(start, end);
};

const cent2yuan = value => {
  return (value / 100).toFixed(2);
};

const moneyCent = value => {
  if (!value) return value;
  return Number(cent2yuan(value));
};

export { numberToCurrency, sliceData, cent2yuan, moneyCent };

export default {
  numberToCurrency,
  sliceData,
  cent2yuan,
  moneyCent
};
