import { formatLocale as d3FormatLocale } from 'd3-format';
import { timeFormatLocale as d3TimeFormatLocale } from 'd3-time-format';
import deFormat from '../locales/de/format.json';
import deTimeFormat from '../locales/de/timeFormat.json';
import enFormat from '../locales/en/format.json';
import enTimeFormat from '../locales/en/timeFormat.json';
import esFormat from '../locales/es/format.json';
import esTimeFormat from '../locales/es/timeFormat.json';
import frFormat from '../locales/fr/format.json';
import frTimeFormat from '../locales/fr/timeFormat.json';
import itFormat from '../locales/it/format.json';
import itTimeFormat from '../locales/it/timeFormat.json';
import jaFormat from '../locales/ja/format.json';
import jaTimeFormat from '../locales/ja/timeFormat.json';
import ptFormat from '../locales/pt/format.json';
import ptTimeFormat from '../locales/pt/timeFormat.json';
import zhFormat from '../locales/zh/format.json';
import zhTimeFormat from '../locales/zh/timeFormat.json';

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
      case 'fr':
        return frFormat;
      case 'it':
        return itFormat;
      case 'ja':
        return jaFormat;
      case 'pt':
        return ptFormat;
      case 'zh':
        return zhFormat;
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
      case 'fr':
        return frTimeFormat;
      case 'it':
        return itTimeFormat;
      case 'ja':
        return jaTimeFormat;
      case 'pt':
        return ptTimeFormat;
      case 'zh':
        return zhTimeFormat;
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
