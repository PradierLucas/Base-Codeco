import { useEffect, useState } from 'react';

export default function ComponenteModal({ nombre, url, onclick, nombreBoton }) {
    const excepciones = JSON.parse(localStorage.getItem('excepciones'));
    const [snModal, setSnModal] = useState(null);
    const [urlExistente, setUrl] = useState('');
    const [activo, setActivo] = useState(null);
    const [nombreBotonFront, setNombreBotonFront] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const queryParams = new URLSearchParams({
                    nombre,
                    url: url || '',
                    nombreBoton: nombreBoton || '',
                });
                
                const fetchUrl = `/api/componentes?${queryParams.toString()}`;

                // Realizar el fetch
                const response = await fetch(fetchUrl, { method: 'GET' });
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }

                const data = await response.json();
                console.log('Datos recibidos:', data);

                setSnModal(data.componente.sn_modal);
                setUrl(data.componente.url || url);
                setActivo(data.componente.componente_activo);
                setNombreBotonFront(data.componente.nombre_boton || nombreBoton);
            } catch (error) {
                console.error('Error al realizar el fetch:', error);
            }
        };

        fetchData();
    }, [nombre, url, nombreBoton]);
if(!excepciones.some((excepcion) => excepcion.componente == nombre)){
    // Renderizado condicional basado en los datos obtenidos
    if (snModal == 1 && activo == 1) {
        return (
            <button className='btn btn-primary' onClick={onclick}>
                {nombreBotonFront}
            </button>
        )
    } else if (activo == 1 && snModal == 0) {
        // Verificar si la URL es externa (comienza con http:// o https://)
        const isExternalUrl = urlExistente && (urlExistente.startsWith('http://') || urlExistente.startsWith('https://'));
        // Verificar si la URL es una ruta directa (comienza con /)
        const isDirectRoute = urlExistente && urlExistente.startsWith('/');
        
        return (
            <a href={urlExistente ? (isExternalUrl ? urlExistente : (isDirectRoute ? urlExistente : route(urlExistente))) : '#'}>
                <button className="btn btn-primary">
                    {nombreBotonFront}
                </button>
            </a>
        );
    }
}
}