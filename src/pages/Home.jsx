import { useState } from "react"
import SimulationForm from "@/components/simulation-form"
import SimulationControls from "@/components/simulation-controls"
import SimulationCharts from "@/components/simulation-charts"
import SimulationResults from "@/components/simulation-results"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bug, Leaf, DollarSign, BarChart3 } from "lucide-react"
import { runSimulation } from "@/lib/simulation-engine"

export default function Home() {
  const [simulationData, setSimulationData] = useState(null)
  const [simulationState, setSimulationState] = useState(null)
  const [currentDay, setCurrentDay] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [simulationInterval, setSimulationInterval] = useState(null)
  const [comparisonResults, setComparisonResults] = useState(null)

  const startSimulation = () => {
    if (!simulationData) return

    // Reset current state
    setCurrentDay(0)

    // Initialize simulation
    const initialState = {
      day: 0,
      infectedHectares: simulationData.initialInfectedHectares,
      healthyPears: 0,
      infectedPears: 0,
      totalTreatmentCost: 0,
      moneyEarned: 0,
      moneyLost: 0,
      dailyData: [],
    }

    setSimulationState(initialState)
    setIsRunning(true)

    // Set up interval for day-by-day simulation
    const interval = setInterval(() => {
      setCurrentDay((prevDay) => {
        const nextDay = prevDay + 1

        if (nextDay >= simulationData.simulationDuration) {
          clearInterval(interval)
          setIsRunning(false)
          setSimulationInterval(null)
          return simulationData.simulationDuration
        }

        setSimulationState((prevState) => {
          if (!prevState) return null
          return runSimulation(prevState, simulationData, nextDay)
        })

        return nextDay
      })
    }, 1000) // 1 second per day

    setSimulationInterval(interval)
  }

  const pauseSimulation = () => {
    if (simulationInterval) {
      clearInterval(simulationInterval)
      setSimulationInterval(null)
    }
    setIsRunning(false)
  }

  const skipToEnd = () => {
    if (!simulationData || !simulationState) return

    pauseSimulation()

    let finalState = { ...simulationState }
    for (let day = currentDay + 1; day <= simulationData.simulationDuration; day++) {
      finalState = runSimulation(finalState, simulationData, day)
    }

    setSimulationState(finalState)
    setCurrentDay(simulationData.simulationDuration)
  }

  const nextDay = () => {
    if (!simulationData || !simulationState || currentDay >= simulationData.simulationDuration) return

    const nextDayState = runSimulation(simulationState, simulationData, currentDay + 1)
    setSimulationState(nextDayState)
    setCurrentDay((prevDay) => prevDay + 1)
  }

  const resetSimulation = () => {
    pauseSimulation()
    setCurrentDay(0)
    setSimulationState(null)
  }

  const handleFormSubmit = (data) => {
    setSimulationData(data)
    resetSimulation()

    // Run comparison simulations
    const withTreatmentData = { ...data, applyTreatment: true }
    const withoutTreatmentData = { ...data, applyTreatment: false }

    let withTreatmentState = {
      day: 0,
      infectedHectares: data.initialInfectedHectares,
      healthyPears: 0,
      infectedPears: 0,
      totalTreatmentCost: 0,
      moneyEarned: 0,
      moneyLost: 0,
      dailyData: [],
    }

    let withoutTreatmentState = { ...withTreatmentState }

    for (let day = 1; day <= data.simulationDuration; day++) {
      withTreatmentState = runSimulation(withTreatmentState, withTreatmentData, day)
      withoutTreatmentState = runSimulation(withoutTreatmentState, withoutTreatmentData, day)
    }

    setComparisonResults({
      withTreatment: withTreatmentState,
      withoutTreatment: withoutTreatmentState,
    })
  }

  return (
    <main className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Simulador de Plantación de Peras - Plaga Carpocapsa</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Parámetros de Simulación</CardTitle>
              <CardDescription>Ingrese los datos iniciales para la simulación</CardDescription>
            </CardHeader>
            <CardContent>
              <SimulationForm onSubmit={handleFormSubmit} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {simulationData ? (
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Simulación</CardTitle>
                    <div className="text-2xl font-bold">
                      Día: {currentDay} / {simulationData.simulationDuration}
                    </div>
                  </div>
                  <CardDescription>
                    {simulationData.applyTreatment
                      ? `Tratamiento aplicado: ${simulationData.chemicalName}`
                      : "Sin tratamiento aplicado"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SimulationControls
                    isRunning={isRunning}
                    onStart={startSimulation}
                    onPause={pauseSimulation}
                    onNextDay={nextDay}
                    onSkipToEnd={skipToEnd}
                    onReset={resetSimulation}
                    currentDay={currentDay}
                    totalDays={simulationData.simulationDuration}
                    disabled={!simulationData}
                  />
                </CardContent>
              </Card>

              {simulationState && (
                <Card>
                  <CardHeader>
                    <CardTitle>Visualización</CardTitle>
                    <CardDescription>Evolución de la plaga y resultados económicos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="pears">
                      <TabsList className="grid grid-cols-3 mb-4">
                        <TabsTrigger value="pears" className="flex items-center gap-2">
                          <Leaf className="h-4 w-4" /> Peras
                        </TabsTrigger>
                        <TabsTrigger value="hectares" className="flex items-center gap-2">
                          <Bug className="h-4 w-4" /> Hectáreas
                        </TabsTrigger>
                        <TabsTrigger value="money" className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" /> Economía
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="pears">
                        <SimulationCharts type="pears" simulationState={simulationState} currentDay={currentDay} />
                      </TabsContent>

                      <TabsContent value="hectares">
                        <SimulationCharts type="hectares" simulationState={simulationState} currentDay={currentDay} />
                      </TabsContent>

                      <TabsContent value="money">
                        <SimulationCharts type="money" simulationState={simulationState} currentDay={currentDay} />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}

              {currentDay === simulationData.simulationDuration && simulationState && comparisonResults && (
                <Card>
                  <CardHeader>
                    <CardTitle>Resultados Finales</CardTitle>
                    <CardDescription>Comparación de escenarios con y sin tratamiento</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SimulationResults
                      currentResults={simulationState}
                      comparisonResults={comparisonResults}
                      simulationData={simulationData}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="pt-6 text-center">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-medium">Ingrese los parámetros</h3>
                <p className="text-muted-foreground mt-2">
                  Complete el formulario y presione "Iniciar Simulación" para comenzar
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}
