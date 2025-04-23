import React, { useState } from 'react'; // Asegúrate de importar useState desde React
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import Modal from 'react-modal';
import './../../../css/app.css';
import DashboardLayout from '@/Layouts/Sidebar';

Modal.setAppElement('#app');

const Create = ({ auth }) => {
    const initialValues = {
        id_menu: '',
        id_componente: '',
        componentes: [],
        componentesActivos: {},
        componentesOrden: {}
    };

    const [shouldReset, setShouldReset] = useState(false);
    const [menuInformacion, setMenuInformacion] = useState('');
    const [componenteInformacion, setComponenteInformacion] = useState('');
    const [isComponenteModalOpen, setIsComponenteModalOpen] = useState(false);
    const [componenteSearchQuery, setComponenteSearchQuery] = useState('');
    const [componenteSearchResults, setComponenteSearchResults] = useState([]);
    const [componenteCurrentPage, setComponenteCurrentPage] = useState(1);
    const [componenteLastPage, setComponenteLastPage] = useState(1);
    const [nombreComponente, setNombreComponente] = useState('');
    const [componenteSeleccionado, setComponenteSeleccionado] = useState(null);
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
    const [menuSearchQuery, setMenuSearchQuery] = useState('');
    const [menuSearchResults, setMenuSearchResults] = useState([]);
    const [menuCurrentPage, setMenuCurrentPage] = useState(1);
    const [menuLastPage, setMenuLastPage] = useState(1);
    const [nombreMenu, setNombreMenu] = useState('');

    const { data, setData, post, reset } = useForm(initialValues);
    //FUNCION PARA LLAMAR A LA RUTA QUE AGREGA EL COMPONENTE AL MENU
    const agregarComponenteAlMenu = () => {
        if (!componenteSeleccionado || !data.id_menu) return;

        // Agrega el componente al estado
        setData(prevData => ({
            ...prevData,
            componentes: [...prevData.componentes, componenteSeleccionado],
        }));

        // Limpia la selección del componente
        setNombreComponente('');
        setComponenteSeleccionado(null);
    };
    // MANEJO DE LOS CHECKBOXES DE ACTIVO EN COMPONENTES
    const handleCheckboxChange = (componenteId) => {
        setData(prevData => ({
            ...prevData,
            componentesActivos: {
                ...prevData.componentesActivos,
                [componenteId]: !prevData.componentesActivos[componenteId]
            }
        }));
    };
    // MANEJO DEL ORDEN DE LOS COMPONENTES
    const handleOrdenChange = (componenteId, valor) => {
        setData((prevData) => ({
            ...prevData,
            componentesOrden: {
                ...prevData.componentesOrden,
                [componenteId]: parseInt(valor), // Asegúrate de convertir el valor a número
            },
        }));
    };

    //Guardar Cambios en las relacion menu-componentes
    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSend = {
            id_menu: data.id_menu,
            componentes: data.componentes.map(componente => ({
                id: componente.id,
                orden: data.componentesOrden[componente.id] || 0,
                sn_activo: data.componentesActivos[componente.id] || false,
            })),
        };

        post(route('menucomponentes.actualizar'), dataToSend, {
            preserveScroll: true,
        });
    };

    const handleReset = () => {
        setData(initialValues);
        setNombreMenu('');
        setComponenteSeleccionado(null);
        setNombreComponente('');
        setMenuInformacion('');
        setComponenteInformacion('');
    };


    const handleGuardarCambios = (e) => {
        e.preventDefault();

        const dataToSend = {
            id_menu: data.id_menu,
            componentes: data.componentes.map(componente => ({
                id: componente.id,
                orden: data.componentesOrden[componente.id] || 0,
                sn_activo: data.componentesActivos[componente.id] || false,
            })),
        };

        post(route('menucomponentes.actualizar'), dataToSend)
        setShouldReset(true)
    };



    if (shouldReset) {
        handleReset();
        setShouldReset(false)
    }



    // FETCH para los componentes relacionados al MENU seleccionado
    const fetchMenuComponentes = async (menuId) => {
        const response = await fetch(`/configuracion/menu-componentes/${menuId}/componentes`);
        const componentesData = await response.json();
        const estadosIniciales = {};
        const ordenesIniciales = {};
        componentesData.forEach(componente => {
            estadosIniciales[componente.id] = Boolean(componente.pivot.sn_activo);
            ordenesIniciales[componente.id] = componente.pivot.orden || 0;
        });
        setData(prevData => ({
            ...prevData,
            id_menu: menuId,
            componentes: componentesData,
            componentesActivos: estadosIniciales,
            componentesOrden: ordenesIniciales
        }));
    };

    // FETCH para los componentes del modal
    const fetchComponenteSearchResults = async (page = 1) => {
        const response = await fetch(`/configuracion/menu-componentes/search-componentes?query=${componenteSearchQuery}&page=${page}`);
        const data = await response.json();
        setComponenteSearchResults(data.data);
        setComponenteCurrentPage(data.current_page);
        setComponenteLastPage(data.last_page);
    };

    // FETCH para traer los Menus
    const fetchMenuSearchResults = async (page = 1) => {
        const response = await fetch(`/configuracion/menu-componentes/search-menus?query=${menuSearchQuery}&page=${page}`);
        const data = await response.json();
        setMenuSearchResults(data.data);
        setMenuCurrentPage(data.current_page);
        setMenuLastPage(data.last_page);
        setMenuInformacion(data.menu_info)
    };

    // Función para manejar cambios en el campo de búsqueda de menu
    const handleComponenteSearchChange = (e) => {
        setComponenteSearchQuery(e.target.value);
        fetchComponenteSearchResults(); // Realiza la búsqueda automáticamente
    };

    // Función para seleccionar un componente
    const handleSelectComponente = (componente) => {
        data.id_componente = componente.id;
        setNombreComponente(componente.nombre);
        setComponenteInformacion(componente.informacion);
        setComponenteSeleccionado(componente); // Guardar el componente completo
        closeModal();
    };

    // Función para manejar cambios en el campo de búsqueda de menu
    const handleMenuSearchChange = (e) => {
        setMenuSearchQuery(e.target.value);
        fetchMenuSearchResults(); // Realiza la búsqueda automáticamente
    };

    // Función para seleccionar una menu
    const handleSelectMenu = (menu) => {
        data.id_menu = menu.id; // Actualiza el campo del formulario
        setNombreMenu(menu.nombre);
        setMenuInformacion(menu.informacion);
        fetchMenuComponentes(menu.id); // Obtén los componentes asociados
        closeModal(); // Cierra el modal
    };


    const openMenuModal = () => {
        setIsMenuModalOpen(true);
    }

    const openComponenteModal = () => {
        setIsComponenteModalOpen(true);
    }

    const closeModal = () => {
        setIsMenuModalOpen(false);
        setMenuSearchResults([]); // Limpia los resultados de la búsqueda
        setMenuSearchQuery(''); // Limpia los resultados de la búsqueda
        setIsComponenteModalOpen(false);
        setComponenteSearchResults([]);
        setComponenteSearchQuery('');
    };

    return (
        <>

                <div className="d-flex justify-content-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Menús - Componentes</h2>
                </div>

            <div className='container'>
                <div className="card">
                    <div className="card-body">
                        {/* BOTONES DE BUSQUEDA */}
                        <div className='row d-flex justify-content-evenly'>
                            <div className="card col-5 mb-3">
                                <h3 className='p-2'>Menú</h3>
                                <div className="input-group mb-3 p-2">
                                    <input
                                        id="Menu"
                                        type="text"
                                        name="Menu"
                                        value={nombreMenu}
                                        className="form-control"
                                        readOnly
                                    // El campo es de solo lectura
                                    />
                                    <button className="btn btn-primary" onClick={openMenuModal}>Buscar</button>
                                </div>
                            </div>
                            <div className='card col-6 mb-3'>
                                <div className='card-body'>
                                    <h4>Información</h4>
                                    {menuInformacion ? menuInformacion : <span className='text-muted'>Sin Selección.</span>}
                                </div>
                            </div>
                        </div>
                        <div className='row mb-3 justify-content-evenly'>
                            <div className="card col-5 mb-3">
                                <h3 className='p-2'>Componente</h3>
                                <div className="input-group mb-3 p-2 ">
                                    <input
                                        id="Componente"
                                        type="text"
                                        name="Componente"
                                        value={nombreComponente}
                                        className="form-control"
                                        readOnly
                                    />
                                    <button className="btn btn-primary" onClick={openComponenteModal}>Buscar</button>
                                </div>
                            </div>
                            <div className=' card col-6 mb-3'>
                                <div className='card-body'>
                                    <h4>Información</h4>
                                    {componenteInformacion ? componenteInformacion : <span className='text-muted'>Sin Selección.</span>}
                                </div>
                            </div>
                        </div>

                        {/* Vista del Componente seleccionado */}
                        <div className='card mb-3'>
                            <div className='card-header'>
                                <h4>{'Componente' || <span className='text-muted'> Sin selección</span>}</h4>
                            </div>
                            <div className='card-body'>
                                {nombreComponente && componenteSeleccionado ? (
                                    <>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nombre</th>
                                                    <th>Descripción</th>
                                                    <th>URL</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{componenteSeleccionado.id}</td>
                                                    <td>{componenteSeleccionado.nombre}</td>
                                                    <td>{componenteSeleccionado.descripcion}</td>
                                                    <td>{componenteSeleccionado.url}</td>
                                                    <td>
                                                        <button
                                                            type="button" // Cambiado de submit a button
                                                            className="btn btn-success btn-sm"
                                                            onClick={agregarComponenteAlMenu}
                                                            disabled={!data.id_menu ||
                                                                data.componentes.some(c => c.id === componenteSeleccionado.id)}
                                                        >
                                                            Agregar
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </>
                                ) : (
                                    <p className="text-muted">Selecciona un componente para ver sus detalles.</p>
                                )}
                            </div>
                        </div>
                        {/* Vista del Menú seleccionado */}
                        <form onSubmit={handleSubmit}>
                            <div className="card">
                                <div className="card-header">
                                    <h4>{nombreMenu || <span className='text-muted'> Sin selección</span>}</h4>
                                </div>
                                <div className="card-body">
                                    <h5>Componentes Asociados</h5>
                                    {data.componentes.length > 0 ? (
                                        <>
                                            <table className="table table-striped table-hover align-middle">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Descripción</th>
                                                        <th scope="col">URL</th>
                                                        <th scope="col">Orden</th>
                                                        <th scope="col">Activo</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.componentes.map((componente) => (
                                                        <tr key={componente.id}>
                                                            <th scope="row">{componente.id}</th>
                                                            <td>{componente.nombre}</td>
                                                            <td>{componente.descripcion}</td>
                                                            <td>{componente.url}</td>
                                                            <td>
                                                                <input
                                                                    type="number"
                                                                    className="form-control form-control-sm"
                                                                    min="0"
                                                                    value={data.componentesOrden[componente.id] || 0} // Vinculado al estado
                                                                    onChange={(e) => handleOrdenChange(componente.id, e.target.value)} // Actualiza el estado
                                                                    style={{ width: '80px' }}
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    checked={data.componentesActivos[componente.id] || false}
                                                                    onChange={() => handleCheckboxChange(componente.id)}
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div className="row d-flex justify-content-end mt-3">
                                                <div className='col-6'>
                                                    <button type="button" className="btn btn-secondary" onClick={handleReset}>
                                                        Limpiar
                                                    </button>
                                                </div>
                                                <div className='col-3'>
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary"
                                                        disabled={!data.id_menu}
                                                    >
                                                        Aplicar
                                                    </button>
                                                </div>
                                                <div className='col-3'>
                                                    <button type='submit'
                                                        className='btn btn-primary'
                                                        disabled={!data.id_menu}
                                                        onClick={handleGuardarCambios}>Guardar Cambios</button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <p className='text-muted'>No hay componentes asociados a este menú.</p>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isMenuModalOpen || isComponenteModalOpen}
                onRequestClose={closeModal}
                contentLabel={isMenuModalOpen ? "Buscar Menú" : "Buscar Componente"}
                style={{
                    content: {
                        backgroundColor: '#ffffff',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                        maxWidth: '600px',
                        margin: '0 auto',
                        width: '50%',
                        overflow: 'auto',
                        inset: 'unset',
                    }
                }}
                overlayClassName="modal-overlay"
            >
                <div className="modal-dialog modal-lg h-100">
                    <div className="modal-content h-100">
                        <div className="modal-header d-flex justify-content-between">
                            <h5 className="modal-title mb-3">
                                {isMenuModalOpen ? "Buscar Menu" : "Buscar Componente"}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={closeModal}
                                aria-label="Cerrar"
                            ></button>
                        </div>
                        <div className="modal-body h-100 d-flex flex-column">
                            <div className='mb-auto'>
                                <div className="card">
                                    <div className="card-body">
                                        <div className='input-group'>
                                            <input
                                                type="text"
                                                value={
                                                    isMenuModalOpen
                                                        ? menuSearchQuery
                                                        : componenteSearchQuery}
                                                onChange={(e) => {
                                                    if (isMenuModalOpen) {
                                                        setMenuSearchQuery(e.target.value);
                                                    } else {
                                                        setComponenteSearchQuery(e.target.value);
                                                    }
                                                }}
                                                placeholder={
                                                    isMenuModalOpen
                                                        ? "Buscar por nombre de Menú" : "Buscar por nombre de Componente"}
                                                className="form-control"
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    if (isMenuModalOpen) {
                                                        fetchMenuSearchResults();
                                                    } else {
                                                        fetchComponenteSearchResults();
                                                    }
                                                }}
                                            >
                                                Buscar
                                            </button>
                                        </div>
                                    </div>
                                    <table className="table table-hover" style={{ cursor: 'pointer' }}>
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(isMenuModalOpen
                                                ? menuSearchResults
                                                : componenteSearchResults).length > 0 ? (
                                                (isMenuModalOpen
                                                    ? menuSearchResults
                                                    : componenteSearchResults).map((item) => (
                                                        <tr key={item.id}>
                                                            <td
                                                                className='table-hover'
                                                                onClick={() => {
                                                                    if (isMenuModalOpen) {
                                                                        handleSelectMenu(item);
                                                                    } else {
                                                                        handleSelectComponente(item);
                                                                    }
                                                                }}
                                                            >
                                                                {item.nombre}
                                                            </td>
                                                        </tr>
                                                    ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="2" className="text-center">No se encontraron resultados</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>

                                    {(isMenuModalOpen
                                        ? menuSearchResults
                                        : componenteSearchResults
                                    ).length > 0 ? (
                                        <div className="d-flex justify-content-center gap-2 my-2">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => {
                                                    if (isMenuModalOpen) {
                                                        fetchMenuSearchResults(menuCurrentPage - 1);
                                                    } else {
                                                        fetchComponenteSearchResults(componenteCurrentPage - 1);
                                                    }
                                                }}
                                                disabled={
                                                    isMenuModalOpen
                                                        ? menuCurrentPage === 1
                                                        : componenteCurrentPage === 1
                                                }
                                            >
                                                <span aria-hidden="true">&laquo;</span>
                                            </button>
                                            <span>
                                                {isMenuModalOpen
                                                    ? menuCurrentPage
                                                    : componenteCurrentPage} de{" "}
                                                {isMenuModalOpen
                                                    ? menuLastPage
                                                    : menuLastPage}
                                            </span>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => {
                                                    if (isMenuModalOpen) {
                                                        fetchMenuSearchResults(menuCurrentPage + 1);
                                                    } else {
                                                        fetchComponenteSearchResults(componenteCurrentPage + 1);
                                                    }
                                                }}
                                                disabled={
                                                    isMenuModalOpen
                                                        ? menuCurrentPage === menuLastPage
                                                        : componenteCurrentPage === componenteLastPage
                                                }
                                            >
                                                <span aria-hidden="true">&raquo;</span>
                                            </button>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            </>
   
    );
};

export default Create;