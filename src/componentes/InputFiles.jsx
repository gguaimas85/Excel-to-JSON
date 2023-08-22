import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import readXlsxFile from "read-excel-file";
import { addData } from "../redux/dataSlice";

export default function InputFiles() {
  const [dataExcel, setDataExcel] = useState({
    input1: [],
    input2: [],
    input3: [],
  });

  const dispatch = useDispatch();

  const totalData = useSelector((state) => state.dataExcelJSON);
  console.log("desde redux", totalData);

  //Carga de archivos excel a JSON
  const uploadExcel = async (event) => {
    event.preventDefault();

    let fileName = event.target.id;

    const input = document.getElementById(fileName);

    await readXlsxFile(input.files[0]).then((data) => {
      let jsonObject = [];
      let headers = [];

      data.map((row, i) => {
        if (i === 0) {
          const newRow = row.map((el) =>
            el.replace(".", " ").split(" ").join("")
          );
          headers = newRow;
        }

        if (i > 0) {
          let temp = {};

          for (let j = 0; j < row.length; j++) {
            temp[headers[j]] = row[j];
          }

          jsonObject.push(temp);
        }
      });

      setDataExcel({ ...dataExcel, [fileName]: jsonObject });
      dispatch(addData({fileName, jsonObject}));
    });
  };

  // const empty = Object.values(dataExcel).map((value) => {
  //   if (value.length === 0) {
  //     return true;
  //   }
  // });

  // console.log(empty);

  // if (!empty.includes(true)) {
  //   console.log("sin elementos vacios");
  //   dispatch(addData(dataExcel));
  // }

  return (
    <div>
      <div className="container py-4">
        <div className="row mb-4">
          <div className="col-3 col-md-4">
            <label>Stock 1</label>
            <input
              type="file"
              id="input1"
              className="form-control"
              onChange={uploadExcel}
            />
          </div>
          <div className="col-3 col-md-4">
            <label>Stock 2</label>
            <input
              type="file"
              id="input2"
              className="form-control"
              onChange={uploadExcel}
            />
          </div>
          <div className="col-3 col-md-4">
            <label>Stock 3</label>
            <input
              type="file"
              id="input3"
              className="form-control"
              onChange={uploadExcel}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
