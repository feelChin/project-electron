const _fetchApi = {};
let controller = new AbortController();

const _Http = (url, option, data) => {
  let [FETCH_TIMEOUT, didTimeout, timeout] = [10000, false, null];

  return new Promise((resolve, reject) => {
    _fetchApi.cancel = () => {
      controller.abort();
      controller = new AbortController();
    };

    timeout = setTimeout(() => {
      didTimeout = true;
      reject(new Error("请求超时"));
    }, FETCH_TIMEOUT);

    const { method, type, headers } = option;

    const options = {
      method,
      headers: headers || {},
      signal: controller.signal,
    };

    if (method === "get" || method === "delete") {
      if (data) {
        for (let [key, value] of Object.entries(data)) {
          url += `${url.indexOf("?") === -1 ? "?" : "&"}${key}=${value}`;
        }
      }
    }

    if (method === "post" || method === "put") {
      switch (type) {
        case "form":
          let formData = new FormData();

          for (let key of Object.keys(data)) {
            if (
              Object.prototype.toString.call(data[key]) === "[object Array]"
            ) {
              data[key].forEach((item) => {
                formData.append(key, item);
              });
            } else {
              formData.append(key, data[key]);
            }
          }
          options.body = formData;

          break;
        case "json":
          options.body = JSON.stringify(data);
          options.headers["Content-Type"] = "application/json";
          break;
        default:
          options.body = JSON.stringify(data);
          options.headers["Content-Type"] = "application/x-www-form-urlencoded";
      }
    }

    fetch(url, { ...options })
      .then((response) => {
        if (option && option.dataType === "text") {
          return response.text();
        } else {
          return response.json();
        }
      })
      .then((response) => {
        if (timeout) clearTimeout(timeout);
        if (response.code !== 200) {
          reject(response.msg || response.errmsg);
        }
        if (!didTimeout) {
          resolve(response);
        }
      })
      .catch((err) => {
        if (timeout) clearTimeout(timeout);
        if (didTimeout) return;
        reject(err);
      });
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (timeout) clearTimeout(timeout);

      if (String(err).indexOf("The user aborted a request.") > -1)
        return new Promise(() => {});

      throw err;
    });
};

const _fetchExample = () => {
  return _Http(`/example.json`, {
    method: "get",
  });
};

const _fetchVersion = () => {
  return _Http(
    `https://weal-api.akspeedy.com/api/v1/activity/time?act_id=2023017`,
    {
      method: "get",
    }
  );
};

const _fetchDownload = () => {
  return _Http(
    `https://api.dailiandashi.com/api/user/v1/version`,
    {
      method: "post",
      type: "json",
    },
    {
      ft: "person",
      ct: 1,
      cn: "PV00001",
      gray: 0,
    }
  );
};

export { _Http, _fetchApi, _fetchExample, _fetchVersion, _fetchDownload };
