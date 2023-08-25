import { objectStock } from "./utils";

objectStock;

export const reduceID = (array) => {
  const objectReduceID = array.map((el) => {
    let reducedID = el.Codigo.slice(0, el.Codigo.length - 1);

    return { ...el, Codigo: reducedID };
  });

  return objectReduceID;
};

export const mergeStock = (array1, array2) => {
  const arrObj = array1.concat(array2);
  const arrObj1 = arrObj.reduce((acc, current) => {
    const foundItem = acc.find((element) => element.Codigo == current.Codigo);

    if (foundItem) {
      foundItem.Stock = foundItem.Stock
        ? [
            ...foundItem.Stock,
            {
              Vencimiento: current.Vencimiento,
              Cantidad: current.CantidadStock,
            },
          ]
        : [
            {
              Vencimiento: current.Vencimiento,
              Cantidad: current.CantidadStock,
            },
          ];
    } else {
      acc.push({
        Codigo: current.Material,
        TextobrevdeMaterial: current.TextobrevdeMaterial,
        Cliente: current.Ce,
        Minimo: current.Minimo,
        Maximo: current.Maximo,
        Finalidad: current.Almacen,
        StockTotal: current.Cantidad,
        idFabricacion: current.idFabricacion,
        Stock: [
          {
            Vencimiento: current.Vencimiento,
            Cantidad: current.CantidadStock,
            Ubicacion: [{ Direccion: current.Direccion }],
          },
        ],
      });
    }

    return acc;
  }, []);

  return arrObj1;
};

export const mergeOneTwo = (array1, array2) => {
  const arrObj = array1.concat(array2);

  const arrObj2 = arrObj.reduce((acc, current) => {
    const foundItem = acc.find(
      (element) =>
        element.Cliente === current.Ce && element.Material === current.Codigo && element.Almacen === current.Finalidad
    );

    if (foundItem) {
      foundItem.Finalidad = current.Almacen;
      foundItem.StockTotal = current.Cantidad;
      foundItem.Finalidad = current.Almacen;
      foundItem.GeneralStock = foundItem.GeneralStock
        ? [...foundItem.GeneralStock, { idFabricacion: current.idFabricacion }]
        : [{ idFabricacion: current.idFabricacion }];
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
