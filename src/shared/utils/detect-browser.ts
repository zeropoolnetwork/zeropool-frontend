export enum Browser {
  Chrome = 'Google Chrome or Chromium',
  Firefox = 'Mozilla Firefox',
  Edge = 'Microsoft Edge',
  Safari = 'Apple Safari',
  Opera = 'Opera',
  MIE = 'Microsoft Internet Explorer',
  SIE = 'Samsung Internet Explorer',
  Other = 'Unknown browser',
}

export const detectBrowser = (): Browser => {
  var sBrowser, sUsrAg = navigator.userAgent;
  
  if (sUsrAg.indexOf("Firefox") > -1) {
    sBrowser = Browser.Firefox;
  } else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
    sBrowser = Browser.SIE;
  } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
    sBrowser = Browser.Opera;
  } else if (sUsrAg.indexOf("Trident") > -1) {
    sBrowser = Browser.MIE;
  } else if (sUsrAg.indexOf("Edge") > -1) {
    sBrowser = Browser.Edge;
  } else if (sUsrAg.indexOf("Chrome") > -1) {
    sBrowser = Browser.Chrome;
  } else if (sUsrAg.indexOf("Safari") > -1) {
    sBrowser = Browser.Safari;
  } else {
    sBrowser = Browser.Other;
  }
  
  return sBrowser;
}