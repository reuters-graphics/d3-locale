
const symbols = ['万', '億', '兆', '京', '垓', '𥝱', '穣', '溝', '澗', '正', '載', '極'];
const groupings = [1e4, 1e8, 1e12, 1e16, 1e20, 1e24, 1e28, 1e32, 1e36, 1e40, 1e44, 1e48];
symbols.reverse();
groupings.reverse();

export default (localeInstance) => {
  const format = localeInstance.formatLocale.format;
  const { currency } = localeInstance.formatSpecifier;

  const formatMyriad = (parsedNumber, formatter, includesCurrency) => {
    const divisors = groupings.filter(d => d <= parsedNumber);
    let formattedNumber = '';
    let subtraction = 0;
    for (const i in divisors) {
      const divisor = divisors[i];
      const symbol = symbols.slice(-divisors.length)[i];
      const remainder = (parsedNumber - subtraction) / divisor;
      if (remainder === 0) break;
      const number = Math.floor(remainder);
      formattedNumber += `${number}${symbol}`;
      subtraction += number * divisor;
    }
    if (parsedNumber - subtraction > 0) formattedNumber += (parsedNumber - subtraction);
    return includesCurrency ? currency[0] + formattedNumber + currency[1] : formattedNumber;
  };

  return (formatSpecifier) => {
    if (!formatSpecifier.includes('s')) return format(formatSpecifier);
    const includesCurrency = formatSpecifier.includes('$');
    formatSpecifier = formatSpecifier.replace('~s', '').replace('s', '').replace('$', '');
    return (number) => {
      if (number < 1e4) return format(formatSpecifier)(number);
      // We format and parse to handle significant digits formatters, like .2
      const formattedNumber = format(formatSpecifier)(number);
      const parsedNumber = parseFloat(formattedNumber.replace(/,/g, ''));

      return formatMyriad(parsedNumber, format(formatSpecifier), includesCurrency);
    };
  };
};
