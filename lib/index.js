import deFormat from '../locales/de/format.json';
import deTimeFormat from '../locales/de/timeFormat.json';
import enFormat from '../locales/en/format.json';
import enTimeFormat from '../locales/en/timeFormat.json';
import esFormat from '../locales/es/format.json';
import esTimeFormat from '../locales/es/timeFormat.json';

class D3Locale {
  constructor(locale = 'en') {
    this.locale = locale;
  }

  get locale() {
    return this.locale;
  }

  set locale(locale) {
    this.locale = locale;
  }

  get format() {
    switch(this.locale) {
      case 'es':
        return esFormat;
      case 'de':
        return deFormat;
      default:
        return  enFormat;
    }
  }

  get timeFormat() {
    switch(this.locale) {
      case 'es':
        return esTimeFormat;
      case 'de':
        return deTimeFormat;
      default:
        return  enTimeFormat;
    }
  }
}

export default D3Locale;
