export default function sendRequest(requestList, limits, callback) {
  let arr = [];
  let arr_count = 0;
  let key = -1;

  const len = requestList.length;
  const concurrentNum = Math.min(limits, len);

  const init = () => {
    let i = 0;
    while (i < concurrentNum) {
      i++;
      runTask();
    }
  };

  const runTask = () => {
    const task = requestList.shift();

    if (arr_count == len) {
      callback(arr);
      return;
    }

    if (!task) {
      return;
    }

    key++;

    const request = async (key) => {
      try {
        const res = await task();
        arr[key] = {
          status: true,
          result: res,
        };
      } catch (err) {
        arr[key] = {
          status: false,
          result: err,
        };
      } finally {
        arr_count++;
        runTask();
      }
    };

    request(key);
  };

  init();
}
