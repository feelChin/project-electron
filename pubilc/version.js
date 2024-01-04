const fs = require("fs");

const data = { code: 200, data: new Date().getTime() };

fs.writeFile("./pubilc/version.json", JSON.stringify(data), (err) => {
  if (err) {
    console.log("写入版本信息失败");
    throw err;
  }
  console.log("写入版本信息成功");
});
