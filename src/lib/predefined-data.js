// Datos predefinidos para las 3 generaciones de Carpocapsa
const GENERATION_CYCLES = [
    { generation: 1, days: 45, spreadMultiplier: 2.5 }, // Primera generación: 45 días, multiplicador 2.5x
    { generation: 2, days: 35, spreadMultiplier: 3.2 }, // Segunda generación: 35 días, multiplicador 3.2x
    { generation: 3, days: 40, spreadMultiplier: 2.8 }, // Tercera generación: 40 días, multiplicador 2.8x
  ]
  
  export function calculatePredefinedResults(data) {
    const generationData = []
    let currentInfectedHectares = data.initialInfectedHectares
    let cumulativeEarned = 0
    let cumulativeLost = 0
    let cumulativeTreatmentCost = 0
  
    // Calcular resultados para cada generación predefinida
    GENERATION_CYCLES.forEach((cycle) => {
      // Aplicar multiplicador de propagación (reducido por eficiencia química si hay tratamiento)
      const effectiveMultiplier = data.applyTreatment
        ? cycle.spreadMultiplier * (1 - data.chemicalEfficiency)
        : cycle.spreadMultiplier
  
      // Calcular nuevas hectáreas infectadas
      currentInfectedHectares = Math.min(data.hectares, currentInfectedHectares * effectiveMultiplier)
  
      // Calcular hectáreas sanas
      const healthyHectares = data.hectares - currentInfectedHectares
  
      // Calcular producción de peras para esta generación
      const totalPlantsHealthy = healthyHectares * data.plantsPerHectare
      const totalPlantsInfected = currentInfectedHectares * data.plantsPerHectare
  
      // Producción de peras por generación (normalizada por días del ciclo)
      const pearsPerGeneration = data.pearsPerPlant * (cycle.days / 120) // Normalizado a temporada completa
      const potentialHealthyPears = totalPlantsHealthy * pearsPerGeneration
      const potentialInfectedPears = totalPlantsInfected * pearsPerGeneration
  
      // Las hectáreas infectadas pierden 80% de su producción
      const actualHealthyPears = potentialHealthyPears
      const actualInfectedPears = potentialInfectedPears * 0.8 // 80% de pérdida
  
      // Calcular dinero ganado y perdido para esta generación
      const generationMoneyEarned = (potentialHealthyPears + potentialInfectedPears * 0.2) * data.pearPrice
      const generationMoneyLost = actualInfectedPears * data.pearPrice
  
      // Calcular costo de tratamiento si se aplica
      const generationTreatmentCost = data.applyTreatment
        ? data.hectares * data.treatmentCostPerHectare * (cycle.days / 30) // Costo proporcional a los días
        : 0
  
      // Actualizar valores acumulativos
      cumulativeEarned += generationMoneyEarned
      cumulativeLost += generationMoneyLost
      cumulativeTreatmentCost += generationTreatmentCost
  
      // Almacenar datos de la generación
      generationData.push({
        generation: cycle.generation,
        days: cycle.days,
        infectedHectares: currentInfectedHectares,
        healthyHectares: healthyHectares,
        healthyPears: potentialHealthyPears + potentialInfectedPears * 0.2,
        infectedPears: actualInfectedPears,
        cumulativeEarned,
        cumulativeLost,
        cumulativeTreatmentCost,
      })
    })
  
    // Calcular totales finales
    const totalDays = GENERATION_CYCLES.reduce((sum, cycle) => sum + cycle.days, 0)
    const finalHealthyPears = generationData.reduce((sum, gen) => sum + gen.healthyPears, 0)
    const finalInfectedPears = generationData.reduce((sum, gen) => sum + gen.infectedPears, 0)
  
    return {
      totalDays,
      totalGenerations: 3,
      finalInfectedHectares: currentInfectedHectares,
      finalHealthyPears,
      finalInfectedPears,
      finalTreatmentCost: cumulativeTreatmentCost,
      finalMoneyEarned: cumulativeEarned,
      finalMoneyLost: cumulativeLost,
      generationData,
    }
  }
  