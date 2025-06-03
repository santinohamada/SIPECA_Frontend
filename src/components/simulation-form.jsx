import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
function preventNegativeInput(e) {
  if (e.key === "-" || e.key === "e" || e.key === "+") {
    e.preventDefault()
  }
}

const formSchema = z.object({
  cantidadHectareas: z.coerce.number().positive("Debe ser mayor a 0").max(1000, "Máximo 1000 hectáreas"),
  plantasPorHectarea: z.coerce.number().positive("Debe ser mayor a 0").max(5000, "Máximo 5000 plantas por hectárea"),
  hectareasInfectadas: z.coerce.number().min(0, "No puede ser negativo"),
  costoTratamientoFeromonasPorHectarea: z.coerce.number().min(0, "No puede ser negativo"),
  costoTratamientoQuimicoPorHectarea: z.coerce.number().min(0, "No puede ser negativo"),
  precioPera: z.coerce.number().positive("Debe ser mayor a 0"),
  aplicarQuimicos: z.boolean().default(false),
  aplicarFeromonas: z.boolean().default(false),
})

export default function SimulationForm({ onSubmit, loading }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cantidadHectareas: 100,
      plantasPorHectarea: 400,
      hectareasInfectadas: 5,
      costoTratamientoFeromonasPorHectarea: 250,
      costoTratamientoQuimicoPorHectarea: 150,
      precioPera: 0.5,
      aplicarQuimicos: false,
      aplicarFeromonas: false,
    },
  })

  const aplicarQuimicos = form.watch("aplicarQuimicos")
  const aplicarFeromonas = form.watch("aplicarFeromonas")

  function handleSubmit(values) {
    onSubmit(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="cantidadHectareas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hectáreas plantadas</FormLabel>
              <FormControl>
                <Input onKeyDown={preventNegativeInput} type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="plantasPorHectarea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plantas por hectárea</FormLabel>
              <FormControl>
                <Input onKeyDown={preventNegativeInput} type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hectareasInfectadas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hectáreas inicialmente infectadas</FormLabel>
              <FormControl>
                <Input onKeyDown={preventNegativeInput} type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="precioPera"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio por Tonelada ($)</FormLabel>
              <FormControl>
                <Input onKeyDown={preventNegativeInput} type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Switch tratamiento químico */}
        <FormField
          control={form.control}
          name="aplicarQuimicos"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Aplicar tratamiento químico</FormLabel>
                <FormDescription>Activa esta opción para aplicar tratamiento químico</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {aplicarQuimicos && (
          <FormField
            control={form.control}
            name="costoTratamientoQuimicoPorHectarea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Costo de tratamiento químico por hectárea ($)</FormLabel>
                <FormControl>
                  <Input onKeyDown={preventNegativeInput} type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Switch tratamiento con feromonas */}
        <FormField
          control={form.control}
          name="aplicarFeromonas"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Aplicar tratamiento con feromonas</FormLabel>
                <FormDescription>Activa esta opción para aplicar tratamiento con feromonas</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {aplicarFeromonas && (
          <FormField
            control={form.control}
            name="costoTratamientoFeromonasPorHectarea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Costo de tratamiento con feromonas por hectárea ($)</FormLabel>
                <FormControl>
                  <Input onKeyDown={preventNegativeInput} type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button  type="submit" className="w-full bg-black" disabled={loading}>
          Calcular Resultados por Generaciones
        </Button>
      </form>
    </Form>
  )
}
