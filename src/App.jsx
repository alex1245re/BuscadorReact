import {useEffect,useState} from "react";
import './App.css'
import LandingPage from './LandingPage.jsx'
import PrincipalPage from './PrincipalPage.jsx'
import Pelicula from './Pelicula.jsx'

function App() {
  var contenido;
  const [mostrarPrincipal,setMostrarPrincipal] = useState(false);
  const [valorTitulo, setValorTitulo] = useState('');
  const [valorYear, setValorYear] = useState('');

  const mostrarPaginaPrincipal = () => {
    setMostrarPrincipal(true);
  }


  if(mostrarPrincipal) {
    contenido =  
    <>
      <PrincipalPage onBuscarTitulo={setValorTitulo} onBuscarYear={setValorYear}/>
      <div className="contenedor">
        <Pelicula titulo={valorTitulo} year={valorYear}/>
      </div>
    </>
  } else {
    contenido = <LandingPage onEntrar={() => setMostrarPrincipal(true)} />
  }

  return (
  <>
    {contenido}
  </>
  )
}

export default App
