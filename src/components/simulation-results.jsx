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
    const format = (value, suffix) => {
      return value.toLocaleString("es-ES", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) + suffix;
    };
  
    if (num >= 1000000) {
      return format(num / 1000000, "M");
    } else if (num >= 1000) {
      return format(num / 1000, "K");
    }
    return num.toLocaleString("es-ES");
  };
  
  const formatCurrency = (num) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true,
    }).format(num);
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {/* Peras Cosechadas */}
  <Card className="bg-green-50 dark:bg-green-900/20">
    <CardContent className="flex flex-col items-center justify-center gap-2 py-6">
      <div className="flex items-center gap-2">
        <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
        <h3 className="text-lg font-medium">Peras Cosechadas</h3>
      </div>
      <span className="text-2xl font-bold">
        {formatNumber(currentResults.perasSanasFinales)}
      </span>
    </CardContent>
  </Card>

  {/* Hectáreas infectadas */}
  <Card className="bg-red-50 dark:bg-red-900/20">
    <CardContent className="flex flex-col items-center justify-center gap-2 py-6">
      <div className="flex items-center gap-2">
        <Bug className="h-5 w-5 text-red-600 dark:text-red-400" />
        <h3 className="text-lg font-medium">Hectáreas infectadas</h3>
      </div>
      <span className="text-2xl font-bold">
        {formatNumber(currentResults.hectareasInfectadasFinales)}
      </span>
    </CardContent>
  </Card>

  {/* Balance */}
  <Card className="bg-blue-50 dark:bg-blue-900/20">
    <CardContent className="flex flex-col items-center justify-center gap-2 py-6">
      <div className="flex items-center gap-2">
        <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-medium">Balance</h3>
      </div>
      <span className="text-2xl font-bold">
        {formatCurrency(
          currentResults.dineroFinalGanado -
          currentResults.dineroFinalPerdido -
          currentResults.costoTotalTratamientoFeromonas -
          currentResults.costoTotalTratamientoQuimico
        )}
      </span>
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
                  {formatNumber(currentResults.hectareasInfectadasFinales)}
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
                <span className="font-medium">Balance:</span>
                <span className="font-bold">
                  {formatCurrency(
                    currentResults.dineroFinalGanado -
                      currentResults.dineroFinalPerdido -
                      currentResults.costoTotalTratamientoFeromonas -
                      currentResults.costoTotalTratamientoQuimico
                  )}
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
        {currentResults &&
          !simulationData.aplicarQuimicos &&
          !simulationData.aplicarFeromonas && (
            <p>
              <strong>Escenario: Sin tratamiento</strong>
              <br />
              Durante <strong>{currentResults.diasTotales}</strong> días (
              <strong>{currentResults.generacionesTotales}</strong> generaciones
              de la plaga), no se aplicó ningún tipo de tratamiento.
              <br />
              <br />• Peras cosechadas:{" "}
              <strong>{formatNumber(currentResults.perasSanasFinales)}</strong>
              <br />• Peras perdidas por infección:{" "}
              <strong>{formatNumber(currentResults.perasInfectadasFinales)}</strong>
              <br />• Ganancia bruta:{" "}
              <strong>
                {formatCurrency(currentResults.dineroFinalGanado)}
              </strong>
              <br />• Pérdidas económicas:{" "}
              <strong>
                {formatCurrency(currentResults.dineroFinalPerdido)} US$
              </strong>
              <br />• <u>Balance</u>:{" "}
              <strong>
                {formatCurrency(
                  currentResults.dineroFinalGanado -
                    currentResults.dineroFinalPerdido -
                    currentResults.costoTotalTratamientoFeromonas -
                    currentResults.costoTotalTratamientoQuimico
                )}
              </strong>
              <br />
              <br />
              Este escenario muestra que no aplicar control alguno resultó en
              una pérdida considerable de fruta y una Balance
              prácticamente nula.
            </p>
          )}

        {currentResults &&
          simulationData.aplicarFeromonas &&
          !simulationData.aplicarQuimicos && (
            <p>
              <strong>Escenario: Solo feromonas</strong>
              <br />
              Durante <strong>{currentResults.diasTotales}</strong> días (
              <strong>{currentResults.generacionesTotales}</strong> generaciones
              de la plaga), se aplicaron únicamente feromonas.
              <br />
              <br />• Peras cosechadas:{" "}
              <strong>{formatNumber(currentResults.perasSanasFinales)}</strong>
              <br />• Peras perdidas por infección:{" "}
              <strong>{formatNumber(currentResults.perasInfectadasFinales)}</strong>
              <br />• Costo del tratamiento:{" "}
              <strong>
                {formatCurrency(currentResults.costoTotalTratamientoFeromonas)}
              </strong>
              <br />• Ganancia bruta:{" "}
              <strong>
                {formatCurrency(currentResults.dineroFinalGanado)}
              </strong>
              <br />• Pérdidas económicas:{" "}
              <strong>{formatCurrency(currentResults.dineroFinalPerdido)}</strong>
              <br />• <u>Balance</u>:{" "}
              <strong>
                {formatCurrency(
                  currentResults.dineroFinalGanado -
                    currentResults.dineroFinalPerdido -
                    currentResults.costoTotalTratamientoFeromonas -
                    currentResults.costoTotalTratamientoQuimico
                )}
              </strong>
              <br />
              <br />
              El uso exclusivo de feromonas ayudó a mitigar parcialmente la
              infestación, aunque el rendimiento económico fue limitado.
            </p>
          )}

        {currentResults &&
          simulationData.aplicarQuimicos &&
          !simulationData.aplicarFeromonas && (
            <p>
              <strong>Escenario: Solo tratamiento químico</strong>
              <br />
              En un período de <strong>
                {currentResults.diasTotales}
              </strong>{" "}
              días (<strong>{currentResults.generacionesTotales}</strong>{" "}
              generaciones), se aplicó únicamente tratamiento químico.
              <br />
              <br />• Peras cosechadas:{" "}
              <strong>{formatNumber(currentResults.perasSanasFinales)}</strong>
              <br />• Peras perdidas por infección:{" "}
              <strong>{formatNumber(currentResults.perasInfectadasFinales)}</strong>
              <br />• Costo del tratamiento:{" "}
              <strong>
                {formatCurrency(currentResults.costoTotalTratamientoQuimico)}
              </strong>
              <br />• Ganancia bruta:{" "}
              <strong>
                {formatCurrency(currentResults.dineroFinalGanado)}
              </strong>
              <br />• Pérdidas económicas:{" "}
              <strong>{formatCurrency(currentResults.dineroFinalPerdido)}</strong>
              <br />• <u>Balance</u>:{" "}
              <strong>
                {formatCurrency(
                  currentResults.dineroFinalGanado -
                    currentResults.dineroFinalPerdido -
                    currentResults.costoTotalTratamientoFeromonas -
                    currentResults.costoTotalTratamientoQuimico
                )}
              </strong>
              <br />
              <br />
              El tratamiento químico logró contener parcialmente la plaga, pero
              no fue suficiente para maximizar la producción ni la rentabilidad.
            </p>
          )}

        {currentResults &&
          simulationData.aplicarQuimicos &&
          simulationData.aplicarFeromonas && (
            <p>
              <strong>
                Escenario: Tratamiento combinado (químico + feromonas)
              </strong>
              <br />
              Durante <strong>{currentResults.diasTotales}</strong> días (
              <strong>{currentResults.generacionesTotales}</strong>{" "}
              generaciones), se aplicaron feromonas y tratamiento químico de
              manera conjunta.
              <br />
              <br />• Peras cosechadas:{" "}
              <strong>{formatNumber(currentResults.perasSanasFinales)}</strong>
              <br />• Peras perdidas por infección:{" "}
              <strong>{formatNumber(currentResults.perasInfectadasFinales)}</strong>
              <br />• Costo total del tratamiento:{" "}
              <strong>
                {formatCurrency(
                  currentResults.costoTotalTratamientoFeromonas +
                    currentResults.costoTotalTratamientoQuimico
                )}
              </strong>
              <br />• Ganancia bruta:{" "}
              <strong>
                {formatCurrency(currentResults.dineroFinalGanado)}
              </strong>
              <br />• Pérdidas económicas:{" "}
              <strong>{formatCurrency(currentResults.dineroFinalPerdido)}</strong>
              <br />• <u>Balance</u>:{" "}
              <strong>
                {formatCurrency(
                  currentResults.dineroFinalGanado -
                    currentResults.costoTotalTratamientoFeromonas -
                    currentResults.costoTotalTratamientoQuimico -
                    currentResults.dineroFinalPerdido
                )}
              </strong>
              <br />
              <br />
              El enfoque combinado fue efectivo, permitiendo minimizar las
              pérdidas y mejorar significativamente la rentabilidad final.
            </p>
          )}
      </div>
    </div>
  );
}
