
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, DollarSign, Bug, Leaf } from "lucide-react"



export default function SimulationResults({
  currentResults,
  comparisonResults,
  simulationData,
}) {
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(Math.round(num))
  }

  const formatCurrency = (num) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(num)
  }

  const calculatePercentageDifference = (a, b) => {
    if (b === 0) return 0
    return ((a - b) / b) * 100
  }

  const withTreatment = comparisonResults.withTreatment
  const withoutTreatment = comparisonResults.withoutTreatment

  // Calculate differences if both scenarios are available
  const healthyPearsDiff =
    withTreatment && withoutTreatment
      ? calculatePercentageDifference(withTreatment.healthyPears, withoutTreatment.healthyPears)
      : 0

  const netProfitWithTreatment = withTreatment ? withTreatment.moneyEarned - withTreatment.totalTreatmentCost : 0

  const netProfitWithoutTreatment = withoutTreatment ? withoutTreatment.moneyEarned : 0

  const profitDiff = calculatePercentageDifference(netProfitWithTreatment, netProfitWithoutTreatment)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 dark:bg-green-900/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Leaf className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                <h3 className="text-lg font-medium">Peras Cosechadas</h3>
              </div>
              <span className="text-2xl font-bold">{formatNumber(currentResults.healthyPears)}</span>
            </div>
            {healthyPearsDiff !== 0 && (
              <div className="mt-2 flex items-center text-sm">
                <span className={healthyPearsDiff > 0 ? "text-green-600" : "text-red-600"}>
                  {healthyPearsDiff > 0 ? (
                    <ArrowUpRight className="h-4 w-4 inline mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 inline mr-1" />
                  )}
                  {Math.abs(healthyPearsDiff).toFixed(1)}% vs. sin tratamiento
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-red-50 dark:bg-red-900/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bug className="h-5 w-5 mr-2 text-red-600 dark:text-red-400" />
                <h3 className="text-lg font-medium">Hectáreas Infectadas</h3>
              </div>
              <span className="text-2xl font-bold">{currentResults.infectedHectares.toFixed(1)}</span>
            </div>
            <div className="mt-2 text-sm">
              <span>{((currentResults.infectedHectares / simulationData.hectares) * 100).toFixed(1)}% del total</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-medium">Ganancia Neta</h3>
              </div>
              <span className="text-2xl font-bold">
                {formatCurrency(currentResults.moneyEarned - currentResults.totalTreatmentCost)}
              </span>
            </div>
            {profitDiff !== 0 && (
              <div className="mt-2 flex items-center text-sm">
                <span className={profitDiff > 0 ? "text-green-600" : "text-red-600"}>
                  {profitDiff > 0 ? (
                    <ArrowUpRight className="h-4 w-4 inline mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 inline mr-1" />
                  )}
                  {Math.abs(profitDiff).toFixed(1)}% vs. sin tratamiento
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Resumen con Tratamiento</h3>
            {withTreatment && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Peras cosechadas:</span>
                  <span className="font-medium">{formatNumber(withTreatment.healthyPears)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Peras perdidas:</span>
                  <span className="font-medium">{formatNumber(withTreatment.infectedPears)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hectáreas infectadas:</span>
                  <span className="font-medium">{withTreatment.infectedHectares.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dinero ganado:</span>
                  <span className="font-medium text-green-600">{formatCurrency(withTreatment.moneyEarned)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Costo tratamiento:</span>
                  <span className="font-medium text-red-600">{formatCurrency(withTreatment.totalTreatmentCost)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium">Ganancia neta:</span>
                  <span className="font-bold">
                    {formatCurrency(withTreatment.moneyEarned - withTreatment.totalTreatmentCost)}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Resumen sin Tratamiento</h3>
            {withoutTreatment && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Peras cosechadas:</span>
                  <span className="font-medium">{formatNumber(withoutTreatment.healthyPears)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Peras perdidas:</span>
                  <span className="font-medium">{formatNumber(withoutTreatment.infectedPears)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hectáreas infectadas:</span>
                  <span className="font-medium">{withoutTreatment.infectedHectares.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dinero ganado:</span>
                  <span className="font-medium text-green-600">{formatCurrency(withoutTreatment.moneyEarned)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Costo tratamiento:</span>
                  <span className="font-medium">$0</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium">Ganancia neta:</span>
                  <span className="font-bold">{formatCurrency(withoutTreatment.moneyEarned)}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
        <h3 className="text-lg font-medium mb-2 flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-amber-600" />
          Conclusión Económica
        </h3>
        {withTreatment && withoutTreatment && (
          <p>
            {netProfitWithTreatment > netProfitWithoutTreatment ? (
              <>
                Aplicar el tratamiento <strong>{simulationData.chemicalName}</strong> resultó ser{" "}
                <strong>más rentable</strong> que no aplicar ningún tratamiento. La diferencia en ganancia neta fue de{" "}
                {formatCurrency(netProfitWithTreatment - netProfitWithoutTreatment)}, lo que representa un{" "}
                <strong>{Math.abs(profitDiff).toFixed(1)}%</strong> de mejora en la rentabilidad.
              </>
            ) : netProfitWithTreatment < netProfitWithoutTreatment ? (
              <>
                No aplicar tratamiento resultó ser <strong>más rentable</strong> que aplicar el tratamiento{" "}
                <strong>{simulationData.chemicalName}</strong>. La diferencia en ganancia neta fue de{" "}
                {formatCurrency(netProfitWithoutTreatment - netProfitWithTreatment)}, lo que representa un{" "}
                <strong>{Math.abs(profitDiff).toFixed(1)}%</strong> de ahorro.
              </>
            ) : (
              <>
                Aplicar el tratamiento <strong>{simulationData.chemicalName}</strong> resultó económicamente{" "}
                <strong>equivalente</strong> a no aplicar tratamiento.
              </>
            )}
          </p>
        )}
      </div>
    </div>
  )
}
