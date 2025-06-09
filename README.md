# SIPECA - Frontend🌱🪰

Frontend del sistema **SIPECA** (Simulador de Peras y Carpocapsa), desarrollado como parte de un proyecto académico en la Universidad Tecnológica Nacional - Facultad Regional Tucumán. Este sistema permite simular el impacto de la plaga *Carpocapsa* en cultivos de peras mediante modelos probabilísticos, y tomar decisiones estratégicas basadas en los resultados.


## 📦 Repositorios del Proyecto

- **Frontend (este repositorio):**  
  https://github.com/santinohamada/SIPECA_Frontend

- **Backend (API REST):**  
  https://github.com/inakigarcia1/SIPECA_Backend


## 📖 Descripción del Proyecto

Productores Argentinos Integrados (PAI S.A.) busca estimar el impacto de la plaga *Carpocapsa* en sus cultivos de peras, analizando el avance de la plaga sobre hectáreas afectadas, la evolución de generaciones de insectos, y los efectos de estrategias de mitigación como insecticidas y feromonas.

La aplicación permite:
- Simular hasta 3 generaciones de la plaga por temporada.
- Calcular el número de plantas, frutos sanos e infectados.
- Evaluar pérdidas económicas y ganancias.
- Analizar efectos del uso de insecticidas y feromonas.
- Generar reportes por generación y un resumen final.


## 🖼️ Interfaz de Usuario

La UI está construida en **React** y permite:
- Cargar los parámetros iniciales de la simulación (hectáreas, plantas infectadas, cantidad de frutos, etc.).
- Seleccionar políticas de control (uso de insecticidas y/o feromonas).
- Ver los resultados generación por generación.
- Consultar un reporte consolidado al finalizar la temporada.


## ⚙️ Tecnologías Utilizadas

- **React** (Vite)
- **TailwindCSS** – Estilado responsivo y moderno.
- **React Router** – Navegación por rutas.
- **Chart.js** – Visualización gráfica de resultados.


## 🚀 Instalación y Ejecución Local

### 🔧 Requisitos previos

- Node.js >= 18.x
- Yarn o npm

### 🔄 Clonar el repositorio

```bash
git clone https://github.com/santinohamada/SIPECA_Frontend.git
cd SIPECA_Frontend
````

### 📥 Instalar dependencias

```bash
npm install
# o
yarn
```

### ▶️ Levantar el servidor de desarrollo

```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:5173`.

> ⚠️ El frontend se conecta al backend alojado en [`inakigarcia1/SIPECA_Backend`](https://github.com/inakigarcia1/SIPECA_Backend), que debe estar corriendo localmente o configurado en producción. Revisa el archivo `lib/queries` para ajustar las URLs.


## 🌱 Lógica del Dominio y Simulación

El sistema modela el ciclo de vida de la plaga **Carpocapsa** considerando variables probabilísticas y decisiones agronómicas. Se simulan aspectos como:

* Cantidad de huevos puestos por generación.
* Distribución de sexos (50% M, 50% H).
* Probabilidades de supervivencia, diapausa y muerte.
* Impacto de insecticidas (hasta 98% de mortalidad).
* Impacto de feromonas (hasta 90% de inhibición reproductiva).
* Peso y valor económico de las peras.
* Duración del ciclo vital por generación (en días).

El backend realiza los cálculos de simulación y retorna los datos al frontend para su visualización.

## 📊 Reportes Generados

Por cada generación:

* Número de la generación y duración en días.
* Hectáreas sanas e infectadas.
* Frutas sanas e infectadas.
* Ingresos y pérdidas económicas.
* Costos por aplicación de insecticidas o feromonas.

Resumen final:

* Generaciones totales simuladas.
* Temporada total (días).
* Costos totales.
* Ganancias y pérdidas acumuladas.

---

## 📁 Estructura del Proyecto

```bash
SIPECA_Frontend/
├── src/
│   ├── assets/           # Imágenes, íconos
│   ├── components/       # Componentes reutilizables
│   ├── hooks/            # Hooks personalizados
│   ├── pages/            # Vistas principales (Inicio, Simulación, Reportes)
│   ├── services/         # Conexión con API (Axios)
│   ├── store/            # Estado global con Zustand
│   └── utils/            # Funciones auxiliares
├── public/
├── .env                 # Variables de entorno
├── vite.config.ts
└── README.md
```

---

## 🧪 Estado y Mejoras Futuras

* ✅ Simulación de generaciones funcional.
* ✅ Conexión estable con backend.
* ✅ Visualización de reportes.
* ⏳ Internacionalización para otros idiomas (actualmente en español).
* ⏳ Descarga de archivos csv.

---

## 📜 Licencia

Este proyecto se encuentra bajo la licencia **MIT**. Ver [LICENSE](./LICENSE) para más información.

---

## 🎓 Créditos Académicos

Proyecto académico desarrollado para la materia **Simulación** en la carrera de **Ingeniería en Sistemas de Información** – **UTN-FRT**.

---

## 👨‍💻 Autores

| Colaborador                                | Perfil                                       |
|--------------------------------------------|----------------------------------------------|
| ![Santino Hamada](https://github.com/santinohamada.png) | [Santino Hamada](https://github.com/santinohamada) |
| ![Iñaki Garcia](https://github.com/inakigarcia1.png) | [inakigarcia1](https://github.com/inakigarcia1) |
| ![Matias Vel](https://github.com/MatiasVel.png) | [MatiasVel](https://github.com/MatiasVel) |
| ![Emmanuel Arnedo](https://github.com/emmanuelarnedo.png) | [emmanuelarnedo](https://github.com/emmanuelarnedo) |
