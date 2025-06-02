// Función helper para generar un número aleatorio alrededor de un valor base con un rango dado
function getRandomAround(base, range) {
    const min = base - range;
    const max = base + range;
    return Math.floor(Math.random() * (max - min) + min) ;
  }
const cambiarNumero = [1000000, 1400000, 700000];
export const postResults = async (data) => {
  const x = await new Promise((resolve) => {
    setTimeout(() => {
        resolve({
            diasTotales: Math.floor(Math.random() * (121 - 100)) + 100, // original 100-120
            generacionesTotales: 3, // fijo, porque es un conteo de generaciones
            hectareasInfectadasFinales: getRandomAround(100, 10), // +/- 10
            perasSanasFinales: getRandomAround(2410000, 200000),
            perasInfectadasFinales: getRandomAround(1590000, 150000),
            costoTotalTratamientoQuimico: 0, // fijo
            costoTotalTratamientoFeromonas: 5000, // fijo
            dineroFinalGanado: getRandomAround(1205000, 100000),
            dineroFinalPerdido: getRandomAround(795000, 70000),
            datosGeneracion: [
              {
                generacion: 1,
                dias: getRandomAround(45, 5),
                hectareasInfectadas: getRandomAround(12.5, 2),
                hectareasSanas: getRandomAround(87.5, 2),
                perasSanas: cambiarNumero[Math.floor(Math.random() * cambiarNumero.length)],
                perasInfectadas: getRandomAround(150000, 15000),
                ganancia: getRandomAround(675000, 60000),
                perdida: getRandomAround(75000, 7000),
                costoTratamientoQuimico: 0,
                costoTratamientoFeromonas: 0,
              },
              {
                generacion: 2,
                dias: getRandomAround(35, 5),
                hectareasInfectadas: getRandomAround(40, 5),
                hectareasSanas: getRandomAround(60, 5),
                perasSanas: getRandomAround(793333.3333333334, 70000),
                perasInfectadas: getRandomAround(373333.3333333334, 40000),
                ganancia: getRandomAround(1071666.6666666667, 90000),
                perdida: getRandomAround(261666.6666666667, 23000),
                costoTratamientoQuimico: 0,
                costoTratamientoFeromonas: 0,
              },
              {
                generacion: 3,
                dias: getRandomAround(40, 5),
                hectareasInfectadas: getRandomAround(100, 10),
                hectareasSanas: 0,
                perasSanas: getRandomAround(266666.6666666667, 30000),
                perasInfectadas: getRandomAround(1066666.6666666667, 80000),
                ganancia: getRandomAround(1205000, 90000),
                perdida: getRandomAround(795000, 70000),
                costoTratamientoQuimico: 0,
                costoTratamientoFeromonas: 500000,
              },
            ],
          });
          
          
          
    }, 1000);
  });

  return x;

  //     const results = await fetch("urlIñañi",{
  //         headers:{
  //             "Content-Type" : "application/json"
  //         },
  //         body:JSON.stringify(data),
  //         method:"POST"
  // })
  // return await results.json()
};
