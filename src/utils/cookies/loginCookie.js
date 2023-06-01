export function setLoginCookie(value) {
  let cookie = `login=${JSON.stringify(value)};`;
  cookie += "path=/;";
  cookie += `max-age=${60 * 60 * 24 * 365};`; // um ano

  document.cookie = cookie;
}

export function clearLoginCookie() {
  let cookie = `login="";`;
  cookie += "path=/;";
  cookie += "max-age=1";

  document.cookie = cookie;
}
