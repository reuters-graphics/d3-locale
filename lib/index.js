import { formatLocale as d3FormatLocale } from 'd3-format';
import { timeFormatLocale as d3TimeFormatLocale } from 'd3-time-format';
import deFormat from '../locales/de/format.json';
import deTimeFormat from '../locales/de/timeFormat.json';
import enFormat from '../locales/en/format.json';
import enTimeFormat from '../locales/en/timeFormat.json';
import esFormat from '../locales/es/format.json';
import esTimeFormat from '../locales/es/timeFormat.json';

class D3Locale {
  constructor(locale = 'en') {
    this._locale = locale;
  }

  get locale() {
    return this._locale;
  }

  set locale(locale) {
    this._locale = locale;
  }

  get formatSpecifier() {
    switch (this._locale) {
      case 'es':
        return esFormat;
      case 'de':
        return deFormat;
      default:
        return enFormat;
    }
  }

  get formatLocale() {
    return d3FormatLocale(this.formatSpecifier);
  }

  get format() {
    return this.formatLocale.format;
  }

  get timeFormatSpecifier() {
    switch (this._locale) {
      case 'es':
        return esTimeFormat;
      case 'de':
        return deTimeFormat;
      default:
        return enTimeFormat;
    }
  }

  get timeFormatLocale() {
    return d3TimeFormatLocale(this.timeFormatSpecifier);
  }

  get formatTime() {
    return this.timeFormatLocale.format;
  }
}

export default D3Locale;
