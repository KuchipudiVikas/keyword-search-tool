import { GOOGLE, ETSY } from "./constants";

export const getPageType = (url) => {
  console.log(url);
  if (url.includes("google")) {
    return GOOGLE;
  } else if (url.includes("etsy")) {
    return ETSY;
  }
};

export const getGoogleSuggestions = async (query) => {
  query = query.replace(" ", "%20");
  const textFile = await fetch(
    `https://suggestqueries.google.com/complete/search?client=chrome&q=${query}`
  );
  const text = await textFile.text();
  function sliceString(string) {
    const EndIndex = string.indexOf("]");
    let startIndex = 0;
    for (let i = 0; i < string.length; i++) {
      if (string[i] == "[") {
        startIndex = i;
        if (startIndex > 1) {
          break;
        }
      }
    }

    if (startIndex !== -1) {
      let temp = string.slice(startIndex + 1, EndIndex);
      let temp2 = temp.replace(/"/g, "");
      let wordArray = temp2.split(",");
      return wordArray;
    } else {
      return string;
    }
  }
  let res = sliceString(text);
  // console.log(res)
  return res;
};

export const openWindow = (domain, keyword) => {
  console.log("open window", domain, keyword);
  if (domain == "etsy") {
    window.open(`https://www.etsy.com/in-en/search?q=${keyword}`);
  } else if (domain == "google") {
    window.open(`https://www.google.com/search?q=${keyword}`);
  }
};
