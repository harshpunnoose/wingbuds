/**
 * Helper to check if data is null or undefined.
 * @param data The data to be checked.
 */
export function isNullOrUndefined<T>(data: T): boolean {
  return isNull(data) || isUndefined(data) || data === '';
}

/**
 * Helper to check if data is null.
 * @param data The data to be checked.
 */
export function isNull<T>(data: T): boolean {
  return data === null;
}

/**
 * Helper to check if data is undefined.
 * @param data The data to be checked.
 */
export function isUndefined<T>(data: T): boolean {
  return typeof data === 'undefined' || typeof data === undefined;
}

/**
 * Helper for a sentence as input and returns
 * a new sentence with the first letter of each word capitalized. .
 * @param sentence The data to be checked.
 */
export function capitalizeFirstLetter(sentence: string): string {
  if (isNullOrUndefined(sentence)) {
    return sentence;
  }
  const words = sentence?.split(' ');
  const capitalizedWords = words?.map((word) => {
    return word?.charAt(0)?.toUpperCase() + word?.slice(1);
  });
  return capitalizedWords?.join(' ');
}

export function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function deleteAllCookies() {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
  }
}
