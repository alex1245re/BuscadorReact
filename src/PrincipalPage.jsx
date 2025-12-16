import {useState} from "react";


function PrincipalPage({onBuscarTitulo,onBuscarYear}) {

    return (
    <>
        <div className="inputs">
            <div>
                <input type="text" placeholder="Movie" onChange={(e)=>{onBuscarTitulo(e.target.value)}}/>
            </div>

            <div>
                <input type="text" placeholder="Año" onChange={(e)=>{onBuscarYear(e.target.value)}}/>
            </div>

        </div>
    </>
    )
}

export default PrincipalPage