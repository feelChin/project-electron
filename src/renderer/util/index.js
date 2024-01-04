export const getParam = (data, result = "") => {
  const url = window.location.href;

  if (url.indexOf(data) === -1) {
    return null;
  }

  let params = url.split("?");

  if (params[1].indexOf("&") > -1) {
    params = params[1].split("&");
  }

  try {
    params.forEach((item) => {
      if (item.indexOf(data + "=") > -1) {
        result = item.replace(data + "=", "");
        throw Error();
      }
    });
  } catch {}

  return result;
};
