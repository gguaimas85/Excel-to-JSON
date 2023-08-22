import "./App.css";
import InputFiles from "./componentes/InputFiles";
import TableData from "./componentes/TableData";

function App() {
  return (
    <div className="mx-5">
      <h1 className="d-flex justify-content-center">Excel a JSON</h1>

      <InputFiles />
      <TableData />
    </div>
  );
}

export default App;
