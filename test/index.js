const expect = require('expect.js');
const D3Locale = require('../dist');

const deTimeFormat = require('../locales/de/timeFormat.json');
const deFormat = require('../locales/de/format.json');

describe('Test D3Locale', function() {
  it('Should get format objects', async function() {
    const d3Locale = new D3Locale('de');
    expect(JSON.stringify(d3Locale.formatSpecifier)).to.be(JSON.stringify(deFormat));
    expect(JSON.stringify(d3Locale.timeFormatSpecifier)).to.be(JSON.stringify(deTimeFormat));
  });

  it('Should return a correct d3 locale', async function() {
    const locale = new D3Locale('de');
    expect(locale.format(',')(12000.12)).to.be('12.000,12');
  });

  it('Should return a correct d3 date locale', async function() {
    const locale = new D3Locale('de');
    const date = new Date('2020-07-13');
    expect(locale.formatTime('%b %d')(date)).to.be('Jul 13');
  });

  it('Should allow overriding specifiers', async function() {
    const locale = new D3Locale('pt');
    expect(locale.format('$')(12.2)).to.be('R$12,2');
    // Portuguese in Portugal
    locale.formatSpecifier = { currency: ['', '€'] };
    expect(locale.format('$')(12.2)).to.be('12,2€');
  });

  it('Should handle Japanese/Chinese myriad groupings with SI prefix', async function() {
    const locale = new D3Locale('ja');
    expect(locale.format(',')(1233)).to.be('1,233');
    expect(locale.format(',')(12330)).to.be('12,330');
    expect(locale.format('~s')(10000)).to.be('1万');
    expect(locale.format('s')(16000)).to.be('1万6000');
    expect(locale.format('~s')(12000000)).to.be('1200万');
    expect(locale.format('s')(1234500000000)).to.be('1兆2345億');
    expect(locale.format('.3s')(1234500000000)).to.be('1兆2300億');
    expect(locale.format(',~s')(25000000)).to.be('2500万');
    expect(locale.format('s')(102900000)).to.be('1億290万');
    expect(locale.format('s')(101018000)).to.be('1億101万8000');
    expect(locale.format('$~s')(1233000)).to.be('123万3000円');
    expect(locale.format('s')(1e16)).to.be('1京');
    expect(locale.format('s')(1e15)).to.be('1000兆');
    expect(locale.format('s')(1e12)).to.be('1兆');
    expect(locale.format('s')(102900000)).to.be('1億290万');
    expect(locale.format('s')(1234567891234)).to.be('1兆2345億6789万1230');
  });

  it('Should use AP-style dates when requested', async function() {
    const locale = new D3Locale('en');
    locale.apStyle();
    expect(locale.formatTime('%b %d, %Y')(new Date('2020-07-13'))).to.be('July 13, 2020');
    expect(locale.formatTime('%b %d, %Y')(new Date('2020-01-13'))).to.be('Jan. 13, 2020');
    expect(locale.formatTime('%b %d, %Y')(new Date('2020-09-13'))).to.be('Sept. 13, 2020');
  });
});
