![](badge.svg)

# @reuters-graphics/d3-locale

Easy translation for d3 charting.

Covers the following locales:

- `en`: US English
- `de`: German
- `es`: Spanish
- `fr`: French
- `it`: Italian
- `ja`: Japanese
- `pt`: Portuguese
- `zh`: Chinese

### Install

```
yarn add @reuters-graphics/d3-locale d3-format d3-time-format
```

### Use

```javascript
import D3Locale from '@reuters-graphics/d3-locale';

const locale = new D3Locale('de');

// Use it alone...
locale.format(',')(23000);
// '23.000'
locale.formatTime('%B %d')(new Date('2020-07-13'));
// 'Juli 13'

// ... or with an axis
d3.axisBottom(xScale)
  .tickFormat(locale.formatTime('%b. %d, %Y'));

// Can also override a part of a locale specifier...
locale.format('$')(12.2)
// R$12,2
locale.formatSpecifier = { currency: ['', '€'] };
locale.format('$')(12.2)
// '12,2€'
```

### Extra features

#### AP-style dates

You can set the formatter to use AP-style month abbreviations in English.

```javascript
const locale = new D3Locale('en');
locale.apStyle();
locale.formatTime('%b %d, %Y')(new Date('2020-03-13'));
// March 13, 2020
locale.formatTime('%b %d, %Y')(new Date('2020-01-13'));
// Jan. 13, 2020
```

#### Time multiformat

By default, d3 time scales use a [multi-scale time format](https://github.com/d3/d3-time-format#d3-time-format). You can recreate this using your locale and pass it to an axis' `tickFormat` method.

```javascript
const locale = new D3Locale('en');

const timeScale = d3.timeScale().domain([ /* ... */ ]);

d3.axisBottom(timeScale)
  .tickFormat(locale.timeMultiFormat());

// Example formats...
locale.timeMultiFormat()(new Date('2020-01-01'));
// 2020
locale.timeMultiFormat()(new Date('2020-02-01'));
// February
locale.timeMultiFormat()(new Date('2020-02-02'));
// Feb 02
```

You can also customize the component formatters used in the multi-scale time formatter. For example, our preferred formatter for AP-style date series:

```javascript
locale.apStyle();
locale.timeMultiFormat({ month: '%b', week: '%b %-e' })(new Date('2020-01-01'));
// 2020
locale.timeMultiFormat({ month: '%b', week: '%b %-e' })(new Date('2020-02-01'));
// Feb.
locale.timeMultiFormat({ month: '%b', week: '%b %-e' })(new Date('2020-02-02'));
// Feb. 2
```

#### Japanese/Chinese myriad groupings

There is special handling for decimal notation with an SI prefix (`s` format) in Japanese and Chinese in order to handle grouping by [myriads](https://en.wikipedia.org/wiki/Japanese_numerals#Large_numbers) rather than thousands.

```javascript
const locale = new D3Locale('ja');
locale.format(',s')(16000);
// 1.6万
locale.format(',s')(25000000);
// 2,500万
locale.format('$,s')(1233000);
// 123.3万円
```
