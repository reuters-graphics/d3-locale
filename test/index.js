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
});
