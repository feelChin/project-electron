import React, { useState, useEffect } from "react";
import EditInput from "./editInput";
import MyCustomTreeNode from "./myCustomTreeNode.js";
import treeData from "./data";
import { Tree } from "antd";
import style from "./index.module.scss";

const { TreeNode } = Tree;

function Index() {
  const [treeList, setTreeList] = useState([]);
  const [initData, setInitData] = useState([]);
  const [changeTree, setChangeTree] = useState(false);
  const [saveDta, setSaveDta] = useState({
    add: [],
    remove: [],
    edit: [],
  });

  useEffect(() => {
    const parse1 = JSON.parse(JSON.stringify(treeData));
    const parse2 = JSON.parse(JSON.stringify(treeData));
    setTreeList(parse1);
    setInitData(parse2);
  }, []);

  useEffect(() => {
    console.log(saveDta);
  }, [saveDta]);

  function flatData(data, result = []) {
    data.forEach((item) => {
      result.push(item);
      if (item.children) {
        flatData(item.children, result);
      }
    });
    return result;
  }

  function handleSaveButton() {
    const saveArray = flatData(treeList);
    const removeAddArray = flatData(treeList);
    const initArray = flatData(initData);
    const addResult = [];
    const editResult = [];

    function filterFnAdd() {
      saveArray.forEach((item) => {
        let bool = false;
        initArray.forEach((initItem) => {
          if (item.code === initItem.code) bool = true;
        });
        if (!bool) {
          const data = {
            value: item.value,
            code: item.code,
            key: item.key,
            parentId: item.parentId,
          };
          addResult.push(data);
        }
      });
    }

    function filterFnEdit() {
      saveArray.forEach((item) => {
        let bool = false;
        initArray.forEach((initItem) => {
          if (item.code === initItem.code && item.value !== initItem.value)
            bool = true;
        });
        if (bool) {
          const data = {
            value: item.value,
            code: item.code,
            key: item.key,
            parentId: item.parentId,
          };
          editResult.push(data);
        }
      });
    }

    function filterFnRemoveAddResult() {
      addResult.forEach((item) => {
        removeAddArray.forEach((initItem, index) => {
          if (item.code === initItem.code) {
            removeAddArray.splice(index, 1);
          }
        });
      });
    }

    function filterFnRemoveResult() {
      removeAddArray.forEach((item) => {
        initArray.forEach((initItem, index) => {
          if (item.code === initItem.code) {
            initArray.splice(index, 1);
          }
        });
      });
    }

    filterFnAdd();
    filterFnEdit();
    filterFnRemoveAddResult();
    filterFnRemoveResult();

    setSaveDta({
      add: [...addResult],
      edit: [...editResult],
      remove: [...initArray],
    });

    alert(
      `新增了${addResult.length}项 \n 删除了${initArray.length}项 \n 修改了${editResult.length}项 \n`
    );
  }

  function renderTreeNodes(data) {
    return data.map((item) => {
      item.title = (
        <section className={style.item}>
          {item.isEditable ? (
            <div className={style.title}>
              <EditInput
                value={item.value}
                callback={(value) => {
                  MyCustomTreeNode.onSave(item.key, treeList, value, (data) => {
                    setTreeList([...data]);
                  });
                }}
              />
            </div>
          ) : (
            <>
              <div className={style.title}>{item.value}</div>
              <div className={style.menu}>
                <div
                  onClick={() => {
                    MyCustomTreeNode.onEdit(item.key, treeList, (data) => {
                      setTreeList([...data]);
                    });
                    if (!changeTree) setChangeTree(true);
                  }}
                >
                  修
                </div>
                <div
                  onClick={() => {
                    MyCustomTreeNode.onAdd(item.key, treeList, (data) => {
                      setTreeList([...data]);
                    });
                    if (!changeTree) setChangeTree(true);
                  }}
                >
                  增
                </div>
                <div
                  onClick={() => {
                    MyCustomTreeNode.onDelete(item.key, treeList, (data) => {
                      setTreeList([...data]);
                    });
                    if (!changeTree) setChangeTree(true);
                  }}
                >
                  删
                </div>
                <div
                  onClick={() => {
                    MyCustomTreeNode.onInsert(item.key, treeList, (data) => {
                      setTreeList([...data]);
                    });
                    if (!changeTree) setChangeTree(true);
                  }}
                >
                  插
                </div>
              </div>
            </>
          )}
        </section>
      );

      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }

      return <TreeNode title={item.title} key={item.key} />;
    });
  }

  return (
    <section className={style.tree}>
      {treeList.length && (
        <Tree
          className={style.treeWrapper}
          style={{
            height: "80vh",
            overflow: "auto",
          }}
          defaultExpandedKeys={["0-1-0"]}
        >
          {renderTreeNodes(treeList)}
        </Tree>
      )}

      {changeTree && (
        <button
          onClick={() => {
            handleSaveButton();
          }}
        >
          保存列表
        </button>
      )}
    </section>
  );
}

export default Index;
