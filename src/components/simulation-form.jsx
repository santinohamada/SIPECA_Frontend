
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

const formSchema = z.object({
  hectares: z.coerce.number().positive("Debe ser mayor a 0").max(1000, "Máximo 1000 hectáreas"),
  plantsPerHectare: z.coerce.number().positive("Debe ser mayor a 0").max(5000, "Máximo 5000 plantas por hectárea"),
  initialInfectedHectares: z.coerce.number().min(0, "No puede ser negativo"),
  dailySpreadRate: z.coerce.number().min(0.01, "Mínimo 0.01").max(1, "Máximo 1 (100%)"),
  chemicalEfficiency: z.coerce.number().min(0, "Mínimo 0").max(1, "Máximo 1 (100%)"),
  treatmentCostPerHectare: z.coerce.number().min(0, "No puede ser negativo"),
  pearPrice: z.coerce.number().positive("Debe ser mayor a 0"),
  pearsPerPlant: z.coerce.number().positive("Debe ser mayor a 0"),
  simulationDuration: z.coerce.number().int().min(1, "Mínimo 1 día").max(365, "Máximo 365 días"),
  applyTreatment: z.boolean().default(false),
  chemicalName: z.string().min(1, "Ingrese un nombre").max(50, "Máximo 50 caracteres"),
})


export default function SimulationForm({ onSubmit }) {
  const [showChemicalName, setShowChemicalName] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hectares: 100,
      plantsPerHectare: 400,
      initialInfectedHectares: 5,
      dailySpreadRate: 0.15,
      chemicalEfficiency: 0.85,
      treatmentCostPerHectare: 50,
      pearPrice: 0.5,
      pearsPerPlant: 100,
      simulationDuration: 30,
      applyTreatment: false,
      chemicalName: "Insecticida XP-500",
    },
  })

  function handleSubmit(values) {
    onSubmit(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="hectares"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hectáreas plantadas</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="plantsPerHectare"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plantas por hectárea</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="initialInfectedHectares"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hectáreas inicialmente infectadas</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dailySpreadRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tasa de propagación diaria (0-1)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormDescription>Ejemplo: 0.15 = 15% de propagación diaria</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pearPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio por pera ($)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pearsPerPlant"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peras por planta</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="simulationDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duración de simulación (días)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="applyTreatment"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Aplicar tratamiento</FormLabel>
                <FormDescription>Activar para simular con tratamiento químico</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked)
                    setShowChemicalName(checked)
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {showChemicalName && (
          <>
            <FormField
              control={form.control}
              name="chemicalName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del químico</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="chemicalEfficiency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Eficiencia del químico (0-1)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormDescription>Ejemplo: 0.85 = 85% de reducción en propagación</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="treatmentCostPerHectare"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Costo de tratamiento por hectárea ($)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button type="submit" className="w-full">
          Iniciar Simulación
        </Button>
      </form>
    </Form>
  )
}
