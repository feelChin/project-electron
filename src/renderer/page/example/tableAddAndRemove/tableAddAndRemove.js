import React, { useState, useEffect, useRef } from "react";
import style from "./index.module.scss";

let data = [];
const column = new Map([
  [
    "text",
    (data, index, cIndex) => {
      const option = {
        data,
        index,
        cIndex,
      };
      return <InputMap {...option} />;
    },
  ],
  [
    "number",
    (data, index, cIndex) => {
      const option = {
        data,
        index,
        cIndex,
      };
      return <InputNumberMap {...option} />;
    },
  ],
]);
const columnType = ["text", "number"];

function InputMap(props) {
  const { data, index, cIndex } = props;
  const inputRef = useRef(null);
  const initValue = data[index][cIndex];

  useEffect(() => {
    console.log(data);
    if (inputRef.current) {
      inputRef.current.value = initValue;
    }
  }, [data]);

  return (
    <input
      ref={inputRef}
      type="text"
      onChange={(e) => {
        const value = e.target.value;
        data[index][cIndex] = value;
      }}
    />
  );
}

function InputNumberMap(props) {
  const { data, index, cIndex } = props;
  const inputRef = useRef(null);
  const initValue = data[index][cIndex];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = initValue;
    }
  }, [data]);

  return (
    <input
      ref={inputRef}
      type="number"
      onChange={(e) => {
        const value = e.target.value;
        data[index][cIndex] = value;
      }}
    />
  );
}

function TableAddAndRemove() {
  const [init, setInit] = useState(true);
  const [row, setRow] = useState(1);

  function removeRow(index) {
    setRow((row) => row - 1);
    data.splice(index, 1);
  }

  function addRow() {
    setRow((row) => row + 1);
  }

  function renderTable() {
    const array = new Array(row).fill([]);

    const dataArray = [];
    array.forEach((item, index) => {
      const dataItem = data[index];

      if (dataItem) {
        dataArray.push(dataItem);
      } else {
        dataArray.push([]);
      }

      columnType.forEach((cItem, cIndex) => {
        if (dataItem && dataItem[cIndex]) {
          dataArray[index][cIndex] = dataItem[cIndex];
        } else {
          dataArray[index].push([]);
        }
      });
    });

    data = dataArray;

    return array.map(({}, index) => (
      <section className={style.rowItem} key={index}>
        {columnType.map((cItem, cIndex) => (
          <div key={cIndex} className={style.item}>
            {column.get(cItem)(data, index, cIndex)}
          </div>
        ))}
        {row > 1 && (
          <button
            onClick={() => {
              removeRow(index);
            }}
            className={style.remove}
          >
            -
          </button>
        )}
      </section>
    ));
  }

  useEffect(() => {
    if (init) {
      data = [];
      setInit(false);
    }
  }, []);

  return (
    <>
      <section className={style.tableAddAndRemoveWrapper}>
        <section className={style.rowItem}>
          <div className={style.item}>姓名</div>
          <div className={style.item}>年龄</div>
        </section>
        {renderTable()}
      </section>
      <div className={style.flex}>
        <button
          onClick={() => {
            addRow();
          }}
          className={style.add}
        >
          增加
        </button>
        <button
          onClick={() => {
            let text = "";
            data.forEach((item) => {
              text += `姓名： ${item[0]}   年龄： ${item[1]} \n`;
            });
            alert(text);
          }}
          className={style.add}
        >
          打印
        </button>
      </div>
    </>
  );
}

export default TableAddAndRemove;
