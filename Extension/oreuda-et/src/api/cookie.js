const setPageCookie = (position) => {
  window.chrome.cookies.set({
    url: process.env.REACT_APP_DOMAIN,
    name: "page",
    value: position,
  });
};

const setFolderIDCookie = (folderID) => {
  window.chrome.cookies.set({
    url: process.env.REACT_APP_DOMAIN,
    name: "folderID",
    value: folderID,
  });
};

const setColorCookie = (color) => {
  window.chrome.cookies.set({
    url: process.env.REACT_APP_DOMAIN,
    name: "color",
    value: color,
  });
};

const setFolderNameCookie = (folderName) => {
  window.chrome.cookies.set({
    url: process.env.REACT_APP_DOMAIN,
    name: "folderName",
    value: folderName,
  });
};

const removeFolderIdCookie = () => {
  window.chrome.cookies.remove({
    url: process.env.REACT_APP_DOMAIN,
    name: "folderID",
  });
};

const removeColorCookie = () => {
  window.chrome.cookies.remove({
    url: process.env.REACT_APP_DOMAIN,
    name: "color",
  });
};

const removeFolderNameCookie = () => {
  window.chrome.cookies.remove({
    url: process.env.REACT_APP_DOMAIN,
    name: "folderName",
  });
};

const removeATKCookie = () => {
  window.chrome.cookies.remove({
    url: process.env.REACT_APP_DOMAIN,
    name: "Authorization",
  });
};

const removeRTKCookie = () => {
  window.chrome.cookies.remove({
    url: process.env.REACT_APP_DOMAIN,
    name: "RefreshToken",
  });
};

export {
  setPageCookie,
  setFolderIDCookie,
  setColorCookie,
  setFolderNameCookie,
};
export {
  removeFolderIdCookie,
  removeColorCookie,
  removeFolderNameCookie,
  removeATKCookie,
  removeRTKCookie,
};
