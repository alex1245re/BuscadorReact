import {useState,useEffect} from "react";
import PrincipalPage from './PrincipalPage.jsx'
import './App.css'

const img_error = "https://as1.ftcdn.net/jpg/00/83/39/90/1000_F_83399029_La8C5CPvYZgFRwRUK9JFpQZDAepdoN6z.jpg";

function Pelicula({titulo,year}){
    const [datos, setDatos] = useState([]);
    const [peliculaSeleccionada,setPeliculaSeleccionada] = useState(null);
    const [detalle, setDetalle] = useState(null);
    const [pagina,setPagina] = useState(1);

    const errorImagen = (e) => {
        e.target.src = img_error;
        // Si la imagen por defecto también falla, evitamos un bucle infinito
        e.target.onerror = null; 
    };

    useEffect(()=>{
        setPagina(1);
        setDatos([]);
    },[titulo,year])

    useEffect(() => {

    if (!titulo || titulo.length < 3) return;

    fetch(`https://www.omdbapi.com/?s=${titulo}&y=${year}&page=${pagina}&apikey=66157bb2`).then(res => res.json()).then(data => {
        console.log(data);
        if (data.Search) {
            if(pagina == 1) {
            setDatos(data.Search);
            }else{
                setDatos(prevDatos => [...prevDatos, ...data.Search]);
            }
        }
    }).catch(err => console.log(err));
    }, [titulo,year,pagina]);

    useEffect(() => {
        // Si no hay película seleccionada, limpiamos el detalle y no hacemos nada
        if (!peliculaSeleccionada) {
            setDetalle(null);
            return;
        }

        // Si hay selección, usamos el imdbID para buscar los detalles
        const id = peliculaSeleccionada.imdbID;
        fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=66157bb2`).then(res => res.json()).then(data => 
            setDetalle(data))
            .catch(err => console.log(err));

    }, [peliculaSeleccionada]);

    const cerrarModal = () => {
        setPeliculaSeleccionada(null);
        setDetalle(null);
    };

    return(
        <div className="contenedor">
            <div className="pelicula"> 
                {datos.map((peli) => (
                    <div className="tarjeta-pelicula" key={peli.imdbID}>
                        <img 
                            src={peli.Poster !== "N/A" ? peli.Poster : img_error}
                            onError={errorImagen}
                            alt={peli.Title} 
                            onClick={() => setPeliculaSeleccionada(peli)} 
                        />
                        <h2>{peli.Title}</h2>
                        <h3>{peli.Year}</h3>
                    </div>
                ))}
            </div>

            {/*Ver mas*/}
            {datos.length > 0 && (
                <div style={{textAlign: 'center', margin: '30px 0'}}>
                    <button 
                        className="btn-ver-mas"
                        onClick={() => setPagina(prev => prev + 1)}
                    >
                        Ver más resultados
                    </button>
                </div>
            )}

            {/* Modal */}
            {peliculaSeleccionada && (
                <div className="modal-overlay" onClick={cerrarModal}>
                    <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
                       {/*Comprobamos si 'detalle' existe */}
                        {!detalle ? (
                            /* ESTADO DE CARGA */
                            <div className="cargando">
                                {/* Mostramos la imagen básica mientras carga el resto */}
                                <img src={peliculaSeleccionada.Poster !== "N/A" ? peliculaSeleccionada.Poster : img_error}
                                onError={errorImagen}
                                alt="cargando"></img>
                                <p>Cargando detalles...</p>
                            </div>
                        ) :(
                            <>
                                {/* IZQUIERDA: IMAGEN FULL HEIGHT */}
                                <div className="modal-izquierda">
                                    <img src={detalle.Poster !== "N/A" ? peliculaSeleccionada.Poster : img_error}
                                onError={errorImagen}alt={detalle.Title} />
                                </div>

                                {/* DERECHA: INFO SCROLLABLE */}
                                <div className="modal-derecha">
                                    <h2>{detalle.Title}</h2>
                                    
                                    {/* Barra de datos pequeños */}
                                    <div className="modal-meta">
                                        <span>{detalle.Year}</span>
                                        <span>{detalle.Rated}</span>
                                        <span>{detalle.Runtime}</span>
                                        <span className="etiqueta-imdb">IMDb {detalle.imdbRating}</span>
                                    </div>

                                    {/* Información técnica */}
                                    <div className="modal-info-extra">
                                        <div><strong>Género:</strong> {detalle.Genre}</div>
                                        <div><strong>Director:</strong> {detalle.Director}</div>
                                        <div><strong>Reparto:</strong> {detalle.Actors}</div>
                                    </div>

                                    {/* Sinopsis limpia (sin caja de fondo) */}
                                    <p className="sinopsis">
                                        {detalle.Plot}
                                    </p>

                                    <button className="btn-cerrar" onClick={cerrarModal}>
                                        Volver
                                    </button>
                                </div>
                            </>
                        )}
                        
                    </div>
                </div>
            )}
        </div>
    )
}

export default Pelicula;