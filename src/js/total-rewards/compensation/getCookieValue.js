import { CookieManager } from "../../app/cookieManager";

/**
 * Stores a specific cookie value to the data storage 
 * @param {onject} data endpoint data
 * @param {string} cookieName the cookie name you want to store
 * @returns an object with all the original data + the cookie value
 */
const getCookieValue = (data, cookieName) => {
  const hideData = CookieManager.getCookie(cookieName);
  const combinedData = {
      ...data,
      hideData
  };

  return combinedData;
}

export default getCookieValue;