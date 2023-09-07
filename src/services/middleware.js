import { objectStock } from "./utils";

const reduceID = (array) => {
  const objectReduceID = array.map((el) => {
    let reducedID = el.Codigo.slice(0, el.Codigo.length - 1);

    return { ...el, Codigo: reducedID };
  });

  return objectReduceID;
};

const mergeOneTwo = (array1, array2) => {
  const arrObj = array1.concat(array2);

  const finalObj = arrObj.reduce((acc, current) => {
    const foundItem = acc.find(
      (element) =>
        element.Cliente === current.Ce &&
        element.Material === current.Codigo &&
        element.Almacen === current.Finalidad
    );

    if (foundItem) {
      foundItem.Finalidad = current.Almacen;
      foundItem.GeneralStock = foundItem.GeneralStock
        ? [
            ...foundItem.GeneralStock,
            {
              idFabricacion: current.idFabricacion,
              Cantidad: current.Cantidad,
            },
          ]
        : [
            {
              idFabricacion: current.idFabricacion,
              Cantidad: current.Cantidad,
            },
          ];
    } else {
      acc.push({
        Codigo: current.Material,
        TextobrevdeMaterial: current.TextobrevdeMaterial,
        Cliente: current.Ce,
        Minimo: current.Minimo,
        Maximo: current.Maximo,
      });
    }

    return acc;
  }, []);

  return finalObj;
};

const mergeStock = (array2, array3) => {
  const arrObjStock = array2.concat(array3);

  const arrObj = arrObjStock.reduce((acc, current) => {
    const foundItem = acc.find(
      (element) =>
        element.Codigo == current.Codigo &&
        element.Stock === current.Stock &&
        element.Finalidad === current.Finalidad
    );

    if (foundItem) {
      foundItem.GeneralStock = foundItem.GeneralStock
        ? [
            ...foundItem.GeneralStock,
            {
              Vencimiento: current.Vencimiento,
              CantidadUbicacion: current.CantidadStock,
              idFabricacion: current.idFabricacion,
              Ubicacion: current.Direccion,
            },
          ]
        : [
            {
              Vencimiento: current.Vencimiento,
              CantidadUbicacion: current.CantidadStock,
              idFabricacion: current.idFabricacion,
              Ubicacion: current.Direccion,
            },
          ];
    } else {
      let stock = objectStock[current.Cliente];

      acc.push({
        Codigo: current.Codigo,
        TextobrevdeMaterial: current.TextobrevdeMaterial,
        Stock: stock,
        Minimo: current.Minimo,
        Maximo: current.Maximo,
        Finalidad: current.Finalidad,
        GeneralStock: current.GeneralStock,
      });
    }

    return acc;
  }, []);

  arrObj.map((el) => {
    if (el.GeneralStock) {
      el.GeneralStock = unifiedLocations(el.GeneralStock);

      sortVto(el.GeneralStock);

      //findUbications(el);
    }
  });

  return arrObj;
};

const unifiedLocations = (array) => {
  const locations = array.reduce((acc, current) => {
    const foundItem = acc.find(
      (element) => element.idFabricacion == current.idFabricacion
    );

    if (foundItem) {
      (foundItem.Vencimiento = current.Vencimiento),
        (foundItem.Ubicaciones = foundItem.Ubicaciones
          ? [
              ...foundItem.Ubicaciones,

              {
                CantidadUbicacion: current.CantidadUbicacion,
                Ubicacion: current.Ubicacion,
              },
            ]
          : [
              {
                CantidadUbicacion: current.CantidadUbicacion,
                Ubicacion: current.Ubicacion,
              },
            ]);
    } else {
      acc.push({
        idFabricacion: current.idFabricacion,
        Cantidad: current.Cantidad,
      });
    }

    return acc;
  }, []);

  return locations;
};

const sortVto = (array) => {
  array.sort((a, b) =>
    a.Vencimiento > b.Vencimiento
      ? -1
      : a.Vencimiento < b.Vencimiento
      ? 1
      : a.idFabricacion - b.idFabricacion
  );
};

const findUbications = (array) => {
  const { TextobrevdeMaterial, Stock } = array;

  let stock = array.GeneralStock;
  let ubications = [];
  let min = 200;
  let max = 500;
  let acc = 0;

  if (stock === undefined) return array;

  for (let i = 0; i < stock.length; i++) {
    if (stock[i].Ubicaciones) {
      for (let j = 0; j < stock[i].Ubicaciones.length; j++) {
        let tempQ = parseInt(stock[i].Ubicaciones[j].CantidadUbicacion);
        let tempU = stock[i].Ubicaciones[j].Ubicacion;

        if (tempU == "Dir1") {
          acc += tempQ;
        }

        if (acc < min && tempU != "Dir1") {
          ubications.push({
            Ubicacion: tempU,
            TextobrevdeMaterial,
            Stock,
            Cantidad: tempQ,
          });
          acc += tempQ;
        }

        if (acc > min && acc < max && tempU != "Dir1") {
          ubications.push({
            Ubicacion: tempU,
            TextobrevdeMaterial,
            Stock,
            Cantidad: tempQ,
          });
          acc += tempQ;
        }
      }
    }
  }

  return ubications;
};

export const objectGeneralStock = (dataObject) => {
  const { input1, input2, input3 } = dataObject;

  const minMaxObj = mergeOneTwo(input1, input2);

  const dataReduceId = reduceID(input3);

  const generalData = mergeStock(minMaxObj, dataReduceId);

  const objectUbications = generalData.map((el) => findUbications(el));

  return objectUbications;
};
