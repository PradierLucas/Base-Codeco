

import { useEffect, useState } from 'react';

export default function ComponenteModal({ nombre, url, onclick, nombreBoton }) {

    const [componente, setComponente]= useState({
        snModal: 0,
        urlExistente: '',
        activo: 0,
        nombreBotonFront: ''
    }
    );

    useEffect(() => {
        const fetchData = async () => {
            try {

                // Construir la URL dinámicamente según los parámetros disponibles
                let fetchUrl = `/api/componentes/${nombre}`;
                if (url) {
                    fetchUrl += `/${encodeURIComponent(url)}`;
                }
                if (nombreBoton) {
                    fetchUrl += `/${encodeURIComponent(nombreBoton)}`;
                }

                // Realizar el fetch
                const response = await fetch(fetchUrl);

                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }

                const data = await response.json();

                setComponente({
                    snModal: data.componente.sn_modal,
                    urlExistente: data.componente.url || url,
                    activo: data.componente.componente_activo,
                    nombreBotonFront: data.componente.nombre_boton || nombreBoton
                })
                
            } catch (error) {
                console.error('Error al realizar el fetch:', error);
            }
        };

        fetchData();
    }, [nombre, url, nombreBoton]);

    // Renderizado condicional basado en los datos obtenidos
    if (componente.snModal === 1 && componente.activo === 1) {

        return (
            <button className='btn btn-primary' onClick={onclick}>
                {componente.nombreBotonFront}
            </button>
        )
    } else if (componente.activo == 1 && componente.snModal == 0) {
        return (
            <a href={componente.urlExistente}>
                <button className="btn btn-primary">
                    {componente.nombreBotonFront}
                </button>
            </a>
        );
    }
}
