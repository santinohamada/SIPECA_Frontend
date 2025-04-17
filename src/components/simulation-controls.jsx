
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, SkipForward, RefreshCw, StepForward } from "lucide-react"

export default function SimulationControls({
  isRunning,
  onStart,
  onPause,
  onNextDay,
  onSkipToEnd,
  onReset,
  currentDay,
  totalDays,
  disabled,
}) {
  const progress = totalDays > 0 ? (currentDay / totalDays) * 100 : 0
  const isComplete = currentDay >= totalDays

  return (
    <div className="space-y-4">
      <Progress value={progress} className="h-2" />

      <div className="flex flex-wrap gap-2 justify-center">
        {!isRunning ? (
          <Button onClick={onStart} disabled={disabled || isComplete} className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            {currentDay === 0 ? "Iniciar" : "Continuar"}
          </Button>
        ) : (
          <Button onClick={onPause} variant="outline" className="flex items-center gap-2">
            <Pause className="h-4 w-4" />
            Pausar
          </Button>
        )}

        <Button
          onClick={onNextDay}
          disabled={disabled || isRunning || isComplete}
          variant="outline"
          className="flex items-center gap-2"
        >
          <StepForward className="h-4 w-4" />
          Siguiente día
        </Button>

        <Button
          onClick={onSkipToEnd}
          disabled={disabled || isComplete}
          variant="outline"
          className="flex items-center gap-2"
        >
          <SkipForward className="h-4 w-4" />
          Saltar al final
        </Button>

        <Button
          onClick={onReset}
          disabled={disabled || (currentDay === 0 && !isRunning)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Reiniciar
        </Button>
      </div>
    </div>
  )
}
