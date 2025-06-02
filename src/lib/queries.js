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
            totalDays: Math.floor(Math.random() * (121 - 100)) + 100, // original 100-120
            totalGenerations: 3, // fijo, porque es un conteo de generaciones
            finalInfectedHectares: getRandomAround(100, 10), // +/- 10
            finalHealthyPears: getRandomAround(2410000, 200000),
            finalInfectedPears: getRandomAround(1590000, 150000),
            finalTreatmentCost: 0, // fijo
            finalMoneyEarned: getRandomAround(1205000, 100000),
            finalMoneyLost: getRandomAround(795000, 70000),
            generationData: [
              {
                generation: 1,
                days: getRandomAround(45, 5),
                infectedHectares: getRandomAround(12.5, 2),
                healthyHectares: getRandomAround(87.5, 2),
                healthyPears: cambiarNumero[Math.floor(Math.random() * cambiarNumero.length)],
                infectedPears: getRandomAround(150000, 15000),
                cumulativeEarned: getRandomAround(675000, 60000),
                cumulativeLost: getRandomAround(75000, 7000),
                cumulativeTreatmentCost: 0,
              },
              {
                generation: 2,
                days: getRandomAround(35, 5),
                infectedHectares: getRandomAround(40, 5),
                healthyHectares: getRandomAround(60, 5),
                healthyPears: getRandomAround(793333.3333333334, 70000),
                infectedPears: getRandomAround(373333.3333333334, 40000),
                cumulativeEarned: getRandomAround(1071666.6666666667, 90000),
                cumulativeLost: getRandomAround(261666.6666666667, 23000),
                cumulativeTreatmentCost: 0,
              },
              {
                generation: 3,
                days: getRandomAround(40, 5),
                infectedHectares: getRandomAround(100, 10),
                healthyHectares: 0,
                healthyPears: getRandomAround(266666.6666666667, 30000),
                infectedPears: getRandomAround(1066666.6666666667, 80000),
                cumulativeEarned: getRandomAround(1205000, 90000),
                cumulativeLost: getRandomAround(795000, 70000),
                cumulativeTreatmentCost: 0,
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
