"use client"

import { useEffect, useState } from "react"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/card"


export default function SimulationCharts({ type, simulationState, currentDay }) {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (!simulationState) return

    // Get data up to current day
    const data = simulationState.dailyData.slice(0, currentDay + 1)
    setChartData(data)
  }, [simulationState, currentDay])

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toFixed(0)
  }

  const formatCurrency = (num) => {
    if (num >= 1000000) {
      return "$" + (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return "$" + (num / 1000).toFixed(1) + "K"
    }
    return "$" + num.toFixed(0)
  }

  if (type === "pears") {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" label={{ value: "Día", position: "insideBottomRight", offset: -5 }} />
                <YAxis
                  tickFormatter={formatNumber}
                  label={{ value: "Cantidad de Peras", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  formatter={(value) => [formatNumber(value), "Cantidad"]}
                  labelFormatter={(label) => `Día ${label}`}
                />
                <Legend />
                <Line
                  name="Peras Sanas"
                  dataKey="healthyPears"
                  stroke="#4ade80"
                  strokeWidth={2.5}
                  type="monotone"
                  dot={false}
                  activeDot={{ r: 6 }}
                  animationDuration={300}
                />
                <Line
                  name="Peras Infectadas"
                  dataKey="infectedPears"
                  stroke="#f87171"
                  strokeWidth={2.5}
                  type="monotone"
                  dot={false}
                  activeDot={{ r: 6 }}
                  animationDuration={300}
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
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" label={{ value: "Día", position: "insideBottomRight", offset: -5 }} />
                <YAxis
                  tickFormatter={formatNumber}
                  label={{ value: "Hectáreas", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  formatter={(value) => [formatNumber(value), "Hectáreas"]}
                  labelFormatter={(label) => `Día ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  name="Hectáreas Infectadas"
                  dataKey="infectedHectares"
                  stroke="#f87171"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6 }}
                  animationDuration={300}
                />
                <Line
                  type="monotone"
                  name="Hectáreas Sanas"
                  dataKey="healthyHectares"
                  stroke="#4ade80"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6 }}
                  animationDuration={300}
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
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" label={{ value: "Día", position: "insideBottomRight", offset: -5 }} />
                <YAxis
                  tickFormatter={formatCurrency}
                  label={{ value: "Dinero ($)", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), "Monto"]}
                  labelFormatter={(label) => `Día ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  name="Dinero Ganado"
                  dataKey="moneyEarned"
                  stroke="#4ade80"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6 }}
                  animationDuration={300}
                />
                <Line
                  type="monotone"
                  name="Dinero Perdido"
                  dataKey="moneyLost"
                  stroke="#f87171"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6 }}
                  animationDuration={300}
                />
                <Line
                  type="monotone"
                  name="Costo Tratamiento"
                  dataKey="treatmentCost"
                  stroke="#facc15"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6 }}
                  animationDuration={300}
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
