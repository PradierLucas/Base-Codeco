import {children} from 'react';

export default function VerificarComponente({ children, nombre}) {
    const excepciones = JSON.parse(localStorage.getItem('excepciones'));

    if(excepciones.some((excepcion) => excepcion.componente == nombre)){
        return(null)
    }else{
        return(<>
        {children}
        </>
    )
}
}