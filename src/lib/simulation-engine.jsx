

export function runSimulation(prevState, data, currentDay) {
  // Calculate new infected hectares (exponential growth)
  let newInfectedHectares = prevState.infectedHectares

  // Apply spread rate (reduced by chemical efficiency if treatment is applied)
  const effectiveSpreadRate = data.applyTreatment
    ? data.dailySpreadRate * (1 - data.chemicalEfficiency)
    : data.dailySpreadRate

  // Calculate new infections (exponential growth)
  newInfectedHectares = Math.min(data.hectares, newInfectedHectares * (1 + effectiveSpreadRate))

  // Calculate healthy hectares
  const healthyHectares = data.hectares - newInfectedHectares

  // Calculate daily pear production
  const totalPlantsHealthy = healthyHectares * data.plantsPerHectare
  const totalPlantsInfected = newInfectedHectares * data.plantsPerHectare

  // Each plant produces pearsPerPlant pears
  const potentialHealthyPears = totalPlantsHealthy * data.pearsPerPlant
  const potentialInfectedPears = totalPlantsInfected * data.pearsPerPlant

  // Infected hectares lose 80% of production
  const actualHealthyPears = potentialHealthyPears
  const actualInfectedPears = potentialInfectedPears * 0.8 // 80% loss

  // Calculate money earned and lost
  const dailyMoneyEarned = (potentialHealthyPears + potentialInfectedPears * 0.2) * data.pearPrice
  const dailyMoneyLost = actualInfectedPears * data.pearPrice

  // Calculate treatment cost if applied
  const dailyTreatmentCost = data.applyTreatment ? data.hectares * data.treatmentCostPerHectare : 0

  // Update cumulative values
  const newHealthyPears = prevState.healthyPears + (potentialHealthyPears + potentialInfectedPears * 0.2)
  const newInfectedPears = prevState.infectedPears + actualInfectedPears
  const newTotalTreatmentCost = prevState.totalTreatmentCost + dailyTreatmentCost
  const newMoneyEarned = prevState.moneyEarned + dailyMoneyEarned
  const newMoneyLost = prevState.moneyLost + dailyMoneyLost

  // Create daily data entry
  const dailyData= {
    day: currentDay,
    infectedHectares: newInfectedHectares,
    healthyHectares: healthyHectares,
    healthyPears: potentialHealthyPears + potentialInfectedPears * 0.2,
    infectedPears: actualInfectedPears,
    moneyEarned: dailyMoneyEarned,
    moneyLost: dailyMoneyLost,
    treatmentCost: dailyTreatmentCost,
  }

  // Update state with new values
  return {
    ...prevState,
    day: currentDay,
    infectedHectares: newInfectedHectares,
    healthyPears: newHealthyPears,
    infectedPears: newInfectedPears,
    totalTreatmentCost: newTotalTreatmentCost,
    moneyEarned: newMoneyEarned,
    moneyLost: newMoneyLost,
    dailyData: [...prevState.dailyData, dailyData],
  }
}
