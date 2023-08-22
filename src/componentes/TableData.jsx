import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function TableData() {
  const componentRef = useRef();

  const TABLE_HEADERS = [
    "ID",
    "Producto",
    "Cliente",
    "Minimo",
    "Maximo",
    "Cantidad",
    "Ubicacion",
  ];

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
        {/* <tbody>
          {mergeObjects.map((data, index) => {
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
        </tbody> */}
      </table>
    </div>
  );
}
