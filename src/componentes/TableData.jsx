import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { objectGeneralStock } from "../services/middleware";

export default function TableData() {
  const [dataTable, setDataTable] = useState()

  const componentRef = useRef();

  const dataStock = useSelector((state) => state.dataExcelJSON);

  const TABLE_HEADERS = ["Producto", "Cliente", "Lote", "Ubicacion"];

  const restockObject = objectGeneralStock(dataStock);

  const viewSector = (filter) => {

    setDataTable(restockObject.filter(el => el.sector === filter))

  }

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
        <button type="button" className="btn btn-success me-2" onClick={() => viewSector("Seco")}>
          Seco
        </button>
        <button type="button" className="btn btn-primary" onClick={() => viewSector("Frio")}>
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
          {!dataTable ? restockObject.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.TextobrevdeMaterial}</td>
                <td>{data.Stock}</td>
                <td>{data.Lote}</td>
                <td>{data.Ubicacion}</td>
              </tr>
            );
          }) : dataTable.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.TextobrevdeMaterial}</td>
                <td>{data.Stock}</td>
                <td>{data.Lote}</td>
                <td>{data.Ubicacion}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
