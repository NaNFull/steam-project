export function isAbsoluteURL(url: string) {
  return /^([a-z][\d+.a-z-]*:)?\/\//i.test(url);
}

export function combineURLs(baseURL: string, relativeURL: string) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
}

// ***Аналог path.join
export const pathJoin = (...parts: string[]): string => parts.map((part) => part.replaceAll(/^\/|\/$/g, '')).join('/');

export function buildPath(baseURL: string, requestedURL: string) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }

  return requestedURL;
}
