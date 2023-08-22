export const mergeStock = (array) => {
  const arrObj1 = array.reduce((acc, current) => {
    const foundItem = acc.find((element) => element.Ce == current.Ce);

    if (foundItem) {
      foundItem.Stock = foundItem.Stock
        ? [
            ...foundItem.Stock,
            {
              Vencimiento: current.IdFabricacion,
              cantidad: current.Cantidad,
              Ubicacion: current.Destino,
            },
          ]
        : [
            {
              Vencimiento: current.IdFabricacion,
              Cantidad: current.Cantidad,
              Ubicacion: current.Destino,
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
            Vencimiento: current.IdFabricacion,
            Cantidad: current.Cantidad,
            Ubicacion: [current.Destino],
          },
        ],
      });
    }

    return acc;
  }, []);

  return arrObj1;
};

export const mergeOneTwo = (array) => {
  const arrObj1 = array.reduce((acc, current) => {
    const foundItem = acc.find(
      (element) =>
        element.Material == current.Material &&
        element.Cliente === current.Cliente
    );

    let cantidad = 0;

    if (current.Cantidad != undefined) cantidad = parseInt(current.Cantidad);

    if (foundItem) {
      foundItem.Stock = foundItem.Stock
        ? [
            ...foundItem.Stock,
            {
              Vencimiento: current.IdFabricacion,
              cantidad: cantidad,
              Ubicacion: current.Destino,
            },
          ]
        : [
            {
              Vencimiento: current.IdFabricacion,
              Cantidad: cantidad,
              Ubicacion: current.Destino,
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
            Vencimiento: current.IdFabricacion,
            Cantidad: cantidad,
            Ubicacion: [current.Destino],
          },
        ],
      });
    }

    return acc;
  }, []);

  return arrObj1;
};
