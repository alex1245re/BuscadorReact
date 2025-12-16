import {useState} from "react";

function LandingPage({onEntrar}) {
    return (
    <>
    <div className="landing">
        <div className="hero-text">
        <h1>Encuentra Tu Próxima Película en Segundos.</h1>
        <h2>Acceso instantáneo a millones de títulos, directores y sinopsis.</h2>

        <section className="valor">
            <h3>¿Por qué usar nuestro buscador?</h3>
            <ul>
                <li>
                    <span>Resultados precisos:</span> Obtenemos la información
                    directamente de la base de datos más completa del cine.
                </li>
                <li>
                    <span>Filtros por año:</span> Encuentra clásicos o los estrenos
                    más recientes con un solo click.
                </li>
                <li>
                    <span>Detalles completos:</span> Accede a director, reparto,
                    sinopsis y calificación de IMDb al instante.
                </li>
            </ul>
        </section>

        <section className="credibilidad">
            <h3>La Opción de Miles de Cinéfilos.</h3>
            <p>
                "Increíblemente rápido y fácil de usar. Mi nueva herramienta
                favorita para explorar cine."
            </p>
            <cite>— María G., Crítica de Cine</cite>
            <p className="stat">
                <span>Más de 100.000 búsquedas</span> realizadas este mes.
            </p>
        </section>
        </div>

        <button onClick={onEntrar}>ENTRAR</button>
    </div>
    </>
    )
}

export default LandingPage