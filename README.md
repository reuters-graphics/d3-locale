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
$ yarn add @reuters-graphics/d3-locale d3-format d3-time-format
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
```
