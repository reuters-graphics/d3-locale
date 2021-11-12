import {
  timeDay,
  timeHour,
  timeMinute,
  timeMonth,
  timeSecond,
  timeWeek,
  timeYear
} from 'd3-time';

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
import myriadFormatter from './formatters/myriad/index.js';
import ptFormat from '../locales/pt/format.json';
import ptTimeFormat from '../locales/pt/timeFormat.json';
import zhFormat from '../locales/zh/format.json';
import zhTimeFormat from '../locales/zh/timeFormat.json';

class D3Locale {
  constructor(locale = 'en') {
    this._locale = locale;
    this._formatSpecifier = {};
    this._timeFormatSpecifier = {};
    this._apStyleDates = false;
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
        return { ...esFormat, ...this._formatSpecifier };
      case 'de':
        return { ...deFormat, ...this._formatSpecifier };
      case 'fr':
        return { ...frFormat, ...this._formatSpecifier };
      case 'it':
        return { ...itFormat, ...this._formatSpecifier };
      case 'ja':
        return { ...jaFormat, ...this._formatSpecifier };
      case 'pt':
        return { ...ptFormat, ...this._formatSpecifier };
      case 'zh':
        return { ...zhFormat, ...this._formatSpecifier };
      default:
        return { ...enFormat, ...this._formatSpecifier };
    }
  }

  set formatSpecifier(specifier) {
    this._formatSpecifier = specifier;
  }

  get formatLocale() {
    return d3FormatLocale(this.formatSpecifier);
  }

  get format() {
    // Special casing for Japanese/Chinese myriads
    if (
      this.locale === 'ja' ||
      this.locale === 'zh'
    ) return myriadFormatter(this);
    return this.formatLocale.format;
  }

  get timeFormatSpecifier() {
    switch (this._locale) {
      case 'es':
        return { ...esTimeFormat, ...this._timeFormatSpecifier };
      case 'de':
        return { ...deTimeFormat, ...this._timeFormatSpecifier };
      case 'fr':
        return { ...frTimeFormat, ...this._timeFormatSpecifier };
      case 'it':
        return { ...itTimeFormat, ...this._timeFormatSpecifier };
      case 'ja':
        return { ...jaTimeFormat, ...this._timeFormatSpecifier };
      case 'pt':
        return { ...ptTimeFormat, ...this._timeFormatSpecifier };
      case 'zh':
        return { ...zhTimeFormat, ...this._timeFormatSpecifier };
      default:
        return { ...enTimeFormat, ...this._timeFormatSpecifier };
    }
  }

  set timeFormatSpecifier(specifier) {
    this._timeFormatSpecifier = specifier;
  }

  get timeFormatLocale() {
    return d3TimeFormatLocale(this.timeFormatSpecifier);
  }

  get formatTime() {
    return this.timeFormatLocale.format;
  }

  apStyle() {
    if (this._locale !== 'en') return;
    this._timeFormatSpecifier = {
      ...this._timeFormatSpecifier,
      ...{
        shortMonths: ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
      },
    };
  }

  timeMultiFormat({
    millisecond,
    second,
    minute,
    hour,
    day,
    week,
    month,
    year,
  } = {}) {
    const formatMillisecond = this.formatTime(millisecond || '.%L');
    const formatSecond = this.formatTime(second || ':%S');
    const formatMinute = this.formatTime(minute || '%I:%M');
    const formatHour = this.formatTime(hour || '%I %p');
    const formatDay = this.formatTime(day || '%a %d');
    const formatWeek = this.formatTime(week || '%b %d');
    const formatMonth = this.formatTime(month || '%B');
    const formatYear = this.formatTime(year || '%Y');
    return (date) =>
      (timeSecond(date) < date ? formatMillisecond :
        timeMinute(date) < date ? formatSecond :
          timeHour(date) < date ? formatMinute :
            timeDay(date) < date ? formatHour :
              timeMonth(date) < date ? (timeWeek(date) < date ? formatDay : formatWeek) :
                timeYear(date) < date ? formatMonth :
                  formatYear)(date);
  }
}

export default D3Locale;
