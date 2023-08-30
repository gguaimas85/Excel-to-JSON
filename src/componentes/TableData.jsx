import { useRef } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { objectGeneralStock } from "../services/middleware";

export default function TableData() {
  const componentRef = useRef();

  const dataStock = useSelector((state) => state.dataExcelJSON);

  //console.log(dataStock);

  const TABLE_HEADERS = ["ID", "Producto", "Cliente", "Cantidad", "Ubicacion"];

  const restockObject = objectGeneralStock(dataStock);

  console.log(restockObject);

  const printTable = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "product-data",
  });

  return (
    <div>
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

      <div>
        <button type="button" className="btn btn-success me-2">
          Seco
        </button>
        <button type="button" className="btn btn-primary">
          Frio
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
          {restockObject.map((data, index) => {
            return (
              <tr key={index}>
                <th scope="row">{data.Codigo}</th>
                <td>{data.TextobrevdeMaterial}</td>
                <td>{data.Stock}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}