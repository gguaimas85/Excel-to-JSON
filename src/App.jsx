import readXlsxFile from "read-excel-file";
import "./App.css";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

function App() {
  const componentRef = useRef();
  const [dataExcel, setDataExcel] = useState({
    input1: [],
    input2: [],
    input3: [],
  });

  const TABLE_HEADERS = [
    "ID",
    "Producto",
    "Cliente",
    "Minimo",
    "Maximo",
    "Cantidad",
    "Ubicacion",
  ];

  const uploadExcel = async (event) => {
    event.preventDefault();

    let fileName = event.target.id;

    const input = document.getElementById(fileName);

    await readXlsxFile(input.files[0]).then((data) => {
      let jsonObject = [];
      let headers = [];

      data.map((row, i) => {
        if (i === 0) headers = row;

        if (i > 0) {
          let temp = {};

          for (let j = 0; j < row.length; j++) {
            temp[headers[j]] = row[j];
          }

          jsonObject.push(temp);
        }
      });

      setDataExcel({ ...dataExcel, [fileName]: jsonObject });
    });
  };

  function reduceId() {
    dataExcel.input3.map((el) => (el.ID = el.ID.slice(0, 1)));
  }

  if (dataExcel.input3.length > 0) {
    reduceId();
  }

  console.log("Informacion 1", dataExcel.input1);
  console.log("Informacion 2", dataExcel.input2);
  console.log("Informacion 3", dataExcel.input3);

  const objectList1 = [...dataExcel.input1, ...dataExcel.input2];

  const arrayFinal = (array) => {
    const arrObj = array.reduce((acc, current) => {
      const foundItem = acc.find(
        (element) =>
          element.ID == current.ID && element.Cliente == current.Cliente
      );

      let cantidad = 0;
      let fecha = "";

      if (current.Cantidad != undefined) cantidad = parseInt(current.Cantidad);
      if (current.Vencimiento != undefined) fecha = current.Vencimiento;

      if (foundItem) {
        foundItem.Stock = foundItem.Stock
          ? [...foundItem.Stock, { Vencimiento: fecha, cantidad: cantidad }]
          : [
              {
                Vencimiento: fecha,
                cantidad: cantidad,
              },
            ];
      } else {
        acc.push({
          ID: current.ID,
          Producto: current.Producto,
          Cliente: current.Cliente,
          Minimo: current.Minimo,
          Maximo: current.Maximo,
          Stock: [{ Vencimiento: fecha, cantidad: cantidad }],
        });
      }

      return acc;
    }, []);

    return arrObj;
  };

  const objectFinal = arrayFinal(objectList1);

  const objectList2 = [...objectFinal, ...dataExcel.input3];

  console.log("parcial", objectList2);

  const arrayFinal2 = (array) => {
    const arrObj1 = array.reduce((acc, current) => {
      const foundItem = acc.find(
        (element) =>
          element.ID == current.ID && element.Cliente === current.Cliente 
      );

      let cantidad = 0;

      if (current.Cantidad != undefined) cantidad = parseInt(current.Cantidad);

      if (foundItem) {
        foundItem.Stock = foundItem.Stock
          ? [
              ...foundItem.Stock,
              {
                Vencimiento: current.Vencimiento,
                cantidad: cantidad,
                Ubicacion: current.Ubiacacion,
              },
            ]
          : [
              {
                Vencimiento: current.Vencimiento,
                Cantidad: cantidad,
                Ubicacion: current.Ubiacacion,
              },
            ];
      } else {
        acc.push({
          ID: current.ID,
          Producto: current.Producto,
          Cliente: current.Cliente,
          Minimo: current.Minimo,
          Maximo: current.Maximo,
          Stock: [
            {
              Vencimiento: current.Vencimiento,
              cantidad: cantidad,
              Ubicacion: current.Ubiacacion,
            },
          ],
        });
      }

      return acc;
    }, []);

    return arrObj1;
  };

  const objectFinal2 = arrayFinal2(objectList2);

  console.log("final", objectFinal2);

  const printTable = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "product-data",
  });

  return (
    <div className="mx-5">
      <h1 className="d-flex justify-content-center">Excel a JSON</h1>

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

      <div className="d-flex justify-content-between mb-2">
        <h3>Detalle de informacion</h3>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={printTable}
        >
          Imprimir
        </button>
      </div>

      <table ref={componentRef} className="table " id="data-table">
        <thead>
          <tr className="table-width">
            {TABLE_HEADERS.map((element) => (
              <th scope="col" key={element}>
                {element}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {objectFinal2.map((data, index) => {
            const total = data.Stock.map((el) => el.cantidad).reduce(
              (acc, current) => acc + current
            );

            const totalVencimiento = data.Stock.filter(
              (el) => el.Vencimiento != undefined
            );

            return (
              <tr key={index}>
                <th scope="row">{data.ID}</th>
                <td>{data.Producto}</td>
                <td>{data.Cliente}</td>
                <td>{data.Minimo}</td>
                <td>{data.Maximo}</td>
                <td>{total === 0 ? "" : total}</td>
                {totalVencimiento.map((data, i) => (
                  <td key={i} colSpan={data.length}>
                    {data.Ubicacion}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
