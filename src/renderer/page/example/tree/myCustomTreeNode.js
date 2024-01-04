class MyCustomTreeNode {
  static addNode(key, data) {
    data.forEach((item) => {
      if (item.key === key) {
        if (item.children) {
          item.children.push({
            value: "自定义标题",
            key: key + "-" + item.children.length,
            parentId: item.code,
            code: new Date().getTime(),
          });
        } else {
          item.children = [];
          item.children.push({
            value: "自定义标题",
            key: key + "-" + item.children.length,
            parentId: item.code,
            code: new Date().getTime(),
          });
        }
        return;
      }
      if (item.children) {
        MyCustomTreeNode.addNode(key, item.children);
      }
    });
  }

  static deleteNode(key, data) {
    data.forEach((item, index) => {
      if (item.key === key) {
        data.splice(index, 1);
        return;
      }
      if (item.children) {
        MyCustomTreeNode.deleteNode(key, item.children);
      }
    });
  }

  static editNode(key, data) {
    data.forEach((item) => {
      if (item.key === key) {
        item.isEditable = true;
      } else {
        item.isEditable = false;
      }
      if (item.children) {
        MyCustomTreeNode.editNode(key, item.children);
      }
    });
  }

  static saveNode(key, data, newValue) {
    data.forEach((item) => {
      if (item.key === key) {
        item.value = newValue;
        item.isEditable = false;
      }
      if (item.children) {
        MyCustomTreeNode.saveNode(key, item.children, newValue);
      }
    });
  }

  static findParent(key, data) {
    for (let i in data) {
      if (data[i].key === key) {
        return [data[i]];
      }
      if (data[i].children) {
        let result = MyCustomTreeNode.findParent(key, data[i].children);
        if (result) {
          return result.concat(data[i]);
        }
      }
    }
  }

  static insertNode(key, data) {
    const find = MyCustomTreeNode.findParent(key, data);
    const parent = find[1];
    if (parent) {
      const index = parent.children.findIndex((item) => {
        return item.key === find[0].key;
      });
      parent.children.splice(index + 1, 0, {
        value: "自定义标题",
        parentId: parent.code,
        code: new Date().getTime(),
      });
      parent.children.forEach((item, index) => {
        item.key = parent.key + "-" + index;
      });
    } else {
      const index = data.findIndex((item) => {
        return item.key === find[0].key;
      });
      data.splice(index + 1, 0, {
        value: "自定义标题",
        parentId: 0,
        code: new Date().getTime(),
      });
      data.forEach((item, index) => {
        item.key = 0 + "-" + index;
      });
    }
  }

  onAdd(key, data, callback) {
    MyCustomTreeNode.addNode(key, data);
    callback(data);
  }

  onDelete(key, data, callback) {
    MyCustomTreeNode.deleteNode(key, data);
    callback(data);
  }

  onEdit(key, data, callback) {
    MyCustomTreeNode.editNode(key, data);
    callback(data);
  }

  onSave(key, data, newValue, callback) {
    MyCustomTreeNode.saveNode(key, data, newValue);
    callback(data);
  }

  onInsert(key, data, callback) {
    MyCustomTreeNode.insertNode(key, data);
    callback(data);
  }
}

export default new MyCustomTreeNode();
