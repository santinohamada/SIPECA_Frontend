import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Bug,
  Leaf,
} from "lucide-react";

export default function SimulationResults({ currentResults, simulationData }) {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(3) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(3) + "K"
    }
    return num.toFixed(0)
  }

  const formatCurrency = (num) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(num);
  };
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 dark:bg-green-900/20">
          <CardContent className="pt-6">
            <div className=" text-center items-center justify-between">
              <div className="flex items-center">
                <Leaf className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                <h3 className="text-lg font-medium">Peras Cosechadas</h3>
              </div>
              <span className="text-2xl font-bold">
                {formatNumber(currentResults.perasSanasFinales)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="text-center bg-red-50 dark:bg-red-900/20">
          <CardContent className="pt-6">
            <div className="items-center justify-between">
              <div className="flex items-center">
                <Bug className="h-5 w-5 mr-2 text-red-600 dark:text-red-400" />
                <h3 className="text-lg font-medium">Hectáreas infectadas</h3>
              </div>
              <span className="text-2xl font-bold">
                {currentResults.hectareasInfectadasFinales.toFixed(1)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className=" text-center bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="pt-6">
            <div className=" items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-medium">Ganancia Neta</h3>
              </div>
              <span className="text-2xl font-bold">
                {formatCurrency(
                  currentResults.dineroFinalGanado -
                    currentResults.costoTotalTratamientoQuimico -
                    currentResults.costoTotalTratamientoFeromonas
                )}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Resumen</h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Peras cosechadas:</span>
                <span className="font-medium">
                  {formatNumber(currentResults.perasSanasFinales)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Peras perdidas:</span>
                <span className="font-medium">
                  {formatNumber(currentResults.perasInfectadasFinales)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Generaciones totales:
                </span>
                <span className="font-medium">
                  {currentResults.generacionesTotales}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Hectáreas infectadas:
                </span>
                <span className="font-medium">
                  {currentResults.hectareasInfectadasFinales.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dinero ganado:</span>
                <span className="font-medium text-green-600">
                  {formatCurrency(currentResults.dineroFinalGanado)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Costo tratamiento quimico:
                </span>
                <span className="font-medium">
                  {formatCurrency(currentResults.costoTotalTratamientoQuimico)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Costo tratamiento sexual:
                </span>
                <span className="font-medium">
                  {formatCurrency(
                    currentResults.costoTotalTratamientoFeromonas
                  )}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium">Ganancia neta:</span>
                <span className="font-bold">
                  {formatCurrency(currentResults.dineroFinalGanado)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
        <h3 className="text-lg font-medium mb-2 flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-amber-600" />
          Conclusión Económica
        </h3>
        {currentResults && (
          <p>
            Durante {currentResults.generacionesTotales} generaciones de la
            plaga Carpocapsa, no aplicar tratamiento resultó en una pérdida
            progresiva del cultivo. Las hectáreas infectadas aumentaron un{" "}
            <strong>
              {(
                ((currentResults.hectareasInfectadasFinales -
                  simulationData.hectareasInfectadas) /
                  simulationData.hectareasInfectadas) *
                100
              ).toFixed(1)}
              %
            </strong>
            , pasando de {simulationData.hectareasInfectadas} a{" "}
            {currentResults.hectareasInfectadasFinales} hectáreas. Esto provocó
            una pérdida total de{" "}
            <strong>{formatCurrency(currentResults.dineroFinalPerdido)}</strong>{" "}
            y una ganancia de{" "}
            <strong>{formatCurrency(currentResults.dineroFinalGanado)}</strong>,
            que pudo haber sido mayor si se hubiera aplicado un tratamiento (quimico y/o hormonal), lo que refleja el impacto económico de no controlar la plaga.
          </p>
        )}
      </div>
    </div>
  );
}
