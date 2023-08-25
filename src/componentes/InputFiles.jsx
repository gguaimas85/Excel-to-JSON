import { useDispatch } from "react-redux";
import readXlsxFile from "read-excel-file";
import { addData } from "../redux/dataSlice";

export default function InputFiles() {
  const dispatch = useDispatch();

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

      dispatch(addData({ fileName, jsonObject }));
    });
  };

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
