import UAParser from 'ua-parser-js';

window.ROOT = window.ROOT || {};
window.uaParser = new UAParser().getResult();
if (uaParser.browser.name) {
  uaParser.browser.name = uaParser.browser.name.replace(' ', '');
}
if (uaParser.os.name) {
  uaParser.os.name = uaParser.os.name.replace(' ', '');
}
if (uaParser.device.type) {
  uaParser.device.type = uaParser.device.type.replace(' ', '');
}
ROOT.uaParser = uaParser;

if (
  navigator.platform == 'MacIntel' &&
  navigator.userAgent.indexOf('Safari') != -1 &&
  navigator.userAgent.indexOf('Chrome') == -1
) {
  if (navigator.standalone !== undefined) {
    uaParser.os.name = 'iPadOS';
    uaParser.device.type = 'tablet';
  } else {
    // macOS Safari
  }
}

if (uaParser.device.type == 'tablet') {
  document.querySelector('html').classList.add('isTablet');
  ROOT.isTablet = true;
} else if (uaParser.device.type == 'mobile') {
  document.querySelector('html').classList.add('isMobile');
  ROOT.isMobile = true;
} else {
  document.querySelector('html').classList.add('isPc');
  ROOT.isPc = true;
}

if (uaParser.browser.name) {
  document.querySelector('html').classList.add(uaParser.browser.name);
}
if (uaParser.os.name) {
  document.querySelector('html').classList.add(uaParser.os.name);
}
if (uaParser.os.name && uaParser.os.version) {
  document
    .querySelector('html')
    .classList.add(uaParser.os.name + ~~uaParser.os.version);
}
if (uaParser.device.type) {
  document.querySelector('html').classList.add(uaParser.device.type);
}
