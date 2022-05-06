/*global chrome*/

chrome.runtime.onInstalled.addListener(() => {
  console.log('Chrome extension successfully installed!');
  return;
});

// chrome.action.onClicked.addListener((tab) => {
//   const isLogin = localStorage.getItem('login');
//   chrome.windows.create({url: `${chrome.runtime.getURL('index.html')}/#/auth/welcome`, type: 'normal'});
// });