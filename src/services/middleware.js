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

  const arrObj2 = arrObj.reduce((acc, current) => {
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

  return arrObj2;
};

const mergeStock = (array2, array3) => {
  const arrObj = array2.concat(array3);

  const arrObj1 = arrObj.reduce((acc, current) => {
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

  arrObj1.map((el) => {
    if (el.GeneralStock != undefined) {
      console.log("Ver estado del General Stock", el.GeneralStock);
      el.GeneralStock = unifiedLocations(el.GeneralStock);
    }
  }); 

  return arrObj1;
};

const unifiedLocations = (array) => {
  const locations = array.reduce((acc, current) => {
    const foundItem = acc.find(
      (element) => element.idFabricacion == current.idFabricacion
    );

    if (foundItem) {
      foundItem.Ubicaciones = foundItem.Ubicaciones
        ? [
            ...foundItem.Ubicaciones,
            {
              Vencimiento: current.Vencimiento,
              CantidadUbicacion: current.CantidadUbicacion,
              Ubicacion: current.Ubicacion,
            },
          ]
        : [
            {
              Vencimiento: current.Vencimiento,
              CantidadUbicacion: current.CantidadUbicacion,
              Ubicacion: current.Ubicacion,
            },
          ];
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

export const objectGeneralStock = (dataObject) => {
  const { input1, input2, input3 } = dataObject;

  const minMaxObj = mergeOneTwo(input1, input2);

  const dataReduceId = reduceID(input3);

  const generalData = mergeStock(minMaxObj, dataReduceId);

  return generalData;
};
