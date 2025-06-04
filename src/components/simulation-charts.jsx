import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/card"

export default function SimulationCharts({ type, generationResults }) {
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
    const format = (value, suffix) => {
      return value.toLocaleString("es-ES", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }) + suffix;
    };
  
    if (num >= 1000000) {
      return format(num / 1000000, " M$");
    } else if (num >= 1000) {
      return format(num / 1000, "K$");
    }
    return `${num.toLocaleString("es-ES")}`;
  };

  if (type === "pears") {
 
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="h-100">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={generationResults.resultadosPorGeneracion} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid  />
                <XAxis
                  dataKey="generation"
                  label={{ value: "Generación", position: "insideBottomRight", offset: -5 }}
                />
                <YAxis
                  tickFormatter={formatNumber}
                  label={{ angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  formatter={(value, name) => [formatNumber(value), name]}
                  labelFormatter={(label, payload) => {
                    const data = payload?.[0]?.payload
                    return `Generación ${label} (${data?.dias} días)`
                  }}
                />
                <Legend />
                <Line
                  name="Peras Sanas"
                  dataKey="perasSanas"
                  stroke="#4ade80"
                  strokeWidth={2.5}
                  type="monotone"
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  name="Peras Infectadas"
                  dataKey="perasInfectadas"
                  stroke="#f87171"
                  strokeWidth={2.5}
                  type="monotone"
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (type === "hectares") {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={generationResults.resultadosPorGeneracion} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="generation"
                  label={{ value: "Generación", position: "insideBottomRight", offset: -5 }}
                />
                <YAxis
                  tickFormatter={formatNumber}
                  label={{ angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  formatter={(value, name) => [formatNumber(value), name]}
                  labelFormatter={(label, payload) => {
                    const data = payload?.[0]?.payload
                    return `Generación ${label} (${data?.dias} días)`
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  name="Hectáreas Infectadas"
                  dataKey="hectareasInfectadas"
                  stroke="#f87171"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  name="Hectáreas Sanas"
                  dataKey="hectareasSanas"
                  stroke="#4ade80"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (type === "money") {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={generationResults.resultadosPorGeneracion} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="generacion"
                  label={{ value: "Generación", position: "insideBottomRight", offset: -5 }}
                />
                <YAxis
                  tickFormatter={formatCurrency}
                  label={{ angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  formatter={(value, name) => [formatCurrency(value), name]}
                  labelFormatter={(label, payload) => {
                    const data = payload?.[0]?.payload
                    return `Generación ${label} (${data?.dias} días)`
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  name="Dinero Ganado Acumulado"
                  dataKey="ganancia"
                  stroke="#4ade80"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  name="Dinero Perdido Acumulado"
                  dataKey="perdida"
                  stroke="#f87171"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  name="Costo Tratamiento Acumulado"
                  dataKey="costoTratamientoQuimico"
                  stroke="#facc15"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  name="Costo Tratamiento Acumulado"
                  dataKey="costoTratamientoFeromonas"
                  stroke="#000080"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}
