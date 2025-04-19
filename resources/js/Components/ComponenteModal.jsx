

import { useEffect, useState } from 'react';

export default function ComponenteModal({ nombre, url, onclick, nombreBoton }) {



    const [snModal, setSnModal] = useState(null);
    const [urlExistente, setUrl] = useState('');
    const [activo, setActivo] = useState(null);
    const [nombreBotonFront, setNombreBotonFront] = useState("")
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
                console.log('Datos recibidos:', data);
                setSnModal(data.componente.sn_modal);
                setUrl(data.componente.url || url);
                setActivo(data.componente.componente_activo);
                setNombreBotonFront(data.componente.nombreBoton);
            } catch (error) {
                console.error('Error al realizar el fetch:', error);
            }
        };

        fetchData();
    }, [nombre, url, nombreBoton]);

    // Renderizado condicional basado en los datos obtenidos
    if (snModal === 1 && activo === 1) {

        return (
            <button className='btn btn-primary' onClick={onclick}>
                {nombre}
            </button>
        )
    } else if (activo == 1 && snModal == 0) {
        return (
            <a href={urlExistente}>
                <button className="btn btn-primary">
                    {nombre}
                </button>
            </a>
        );
    }
}
