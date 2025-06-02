import React from "react";
import cicloPera from "/cicloPera.jpg";
import zonaGeo from "/zonaGeo.png";
import cicloPlaga from "/cicloPlaga.png";

export function Informacion() {
  return (
    <section className="max-w-5xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-10 border-b-4 border-green-400 pb-3">
        Información sobre la problemática
      </h1>

      <article className="mb-12 space-y-6">
        <p className="text-justify text-gray-700 leading-relaxed">
          En Argentina, se destacan variedades de peras como Williams (Bartlett), Packham's Triumph, Abate Fetel, D’Anjou, Beurré Bosc, y Red Bartlett, entre otras. Se cultivan tanto para consumo interno como para exportación, siendo la Argentina uno de los principales exportadores de peras del hemisferio sur. Sin embargo, el cultivo enfrenta diversas amenazas que afectan su rendimiento y calidad.
        </p>
        <p className="text-justify text-gray-700 leading-relaxed">
          Entre las plagas más relevantes se encuentran la carpocapsa (<em className="italic text-green-700">Cydia pomonella</em>), principal causante de daños en los frutos; la arañuela roja europea (<em className="italic text-green-700">Panonychus ulmi</em>), que afecta el follaje; el psílido del peral (<em className="italic text-green-700">Cacopsylla pyri</em>), que debilita la planta al alimentarse de su savia; y la polilla de la manzana (<em className="italic text-green-700">Grapholita molesta</em>), que también puede atacar frutos y brotes. Además, enfermedades fúngicas como el moteado (<em className="italic text-green-700">Venturia pirina</em>) y la sarna afectan tanto hojas como frutos, obligando a los productores a implementar un manejo integrado de plagas para garantizar una producción sostenible y de calidad.
        </p>
      </article>

      {/* Plantación en hileras */}
      <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700 border-b-2 border-green-300 pb-2">
            Plantación en hileras
          </h2>
          <p className="text-justify text-gray-700 leading-relaxed">
            Las peras Williams suelen plantarse en hileras siguiendo sistemas de marco rectangular, que facilitan el manejo y la mecanización del cultivo. En plantaciones intensivas o modernas, es común el uso de espalderas o sistemas de eje central, que permiten un mayor control del crecimiento, mejor exposición solar y una cosecha más eficiente. La plantación por hileras es la más usada porque permite un mejor aprovechamiento del espacio, facilita el acceso para labores agrícolas como el riego, la poda, el control de plagas y la cosecha, y es ideal para la mecanización, reduciendo costos y mejorando la eficiencia.
          </p>
        </div>
        <div className="md:w-1/2 rounded-lg overflow-hidden shadow-md">
          <img
            src="https://img.interempresas.net/A/A875/1384720.webp"
            alt="Plantación en hileras"
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      {/* Ciclo de la pera */}
      <section className="flex flex-col md:flex-row-reverse items-center gap-8 mb-12">
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700 border-b-2 border-green-300 pb-2">
            Ciclo de la pera Williams
          </h2>
          <p className="text-justify text-gray-700 leading-relaxed">
            El ciclo de la pera comienza con la plantación de árboles jóvenes, que suelen producir frutos entre los 3 y 5 años. La vida productiva del árbol puede extenderse hasta los 35-40 años. La floración ocurre a finales de septiembre o principios de octubre, seguida de la polinización y el cuajado. Los frutos crecen durante primavera y verano, y maduran entre enero y febrero, momento en que se realiza la cosecha.
          </p>
        </div>
        <div className="md:w-1/2 rounded-lg overflow-hidden shadow-md">
          <img
            src={cicloPera}
            alt="Ciclo de vida de la pera"
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      {/* Zona geográfica */}
      <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700 border-b-2 border-green-300 pb-2">
            Zona geográfica: Alto Valle de Río Negro y Neuquén
          </h2>
          <p className="text-justify text-gray-700 leading-relaxed">
            El Alto Valle es una de las principales regiones productoras de frutas de pepita en Argentina, especialmente peras y manzanas. La cosecha suele comenzar en la primera quincena de enero, ajustándose según la maduración y condiciones climáticas. Esta zona es un motor económico local y nacional y una fuente clave de empleo.
          </p>
        </div>
        <div className="md:w-1/2 rounded-lg overflow-hidden shadow-md">
          <img
            src={zonaGeo}
            alt="Zona geográfica"
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      {/* Ciclo de la plaga */}
      <section className="flex flex-col md:flex-row-reverse items-center gap-8 mb-12">
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700 border-b-2 border-green-300 pb-2">
            Ciclo de la carpocapsa
          </h2>
          <p className="text-justify text-gray-700 leading-relaxed">
            La carpocapsa completa dos generaciones principales por año en el Alto Valle, y a veces tres si el clima es ideal. La primera generación surge entre noviembre y diciembre, donde los adultos ponen huevos y las larvas dañan frutos jóvenes. La segunda generación se desarrolla entre diciembre y enero con larvas que dañan frutos y se transforman en pupas para nuevos adultos. Parte de las larvas entran en diapausa para sobrevivir el invierno y reiniciar el ciclo en primavera, garantizando la persistencia anual de la plaga.
          </p>
        </div>
        <div className="md:w-1/2 rounded-lg overflow-hidden shadow-md">
          <img
            src={cicloPlaga}
            alt="Ciclo de la plaga"
            className="w-full h-auto object-contain"
          />
        </div>
      </section>
    </section>
  );
}
