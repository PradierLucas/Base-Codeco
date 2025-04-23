import React, { useState } from 'react'; // Asegúrate de importar useState desde React
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import Modal from 'react-modal';
import './../../../css/app.css';
import DashboardLayout from '@/Layouts/Sidebar';

Modal.setAppElement('#app');

const Create = ({ auth }) => {
    const initialValues = {
        id_user: '',
        id_perfil: '',
        users: [],
        relacionesActivas: {},
    };

    const [shouldReset, setShouldReset] = useState(false);
    const [perfilInformacion, setPerfilInformacion] = useState('');
    const [isPerfilModalOpen, setIsPerfilModalOpen] = useState(false);
    const [perfilSearchQuery, setPerfilSearchQuery] = useState('');
    const [perfilSearchResults, setPerfilSearchResults] = useState([]);
    const [perfilCurrentPage, setPerfilCurrentPage] = useState(1);
    const [perfilLastPage, setPerfilLastPage] = useState(1);
    const [nombrePerfil, setNombrePerfil] = useState('');
    const [userSeleccionado, setUserSeleccionado] = useState(null);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [userSearchQuery, setUserSearchQuery] = useState('');
    const [userSearchResults, setUserSearchResults] = useState([]);
    const [userCurrentPage, setUserCurrentPage] = useState(1);
    const [userLastPage, setUserLastPage] = useState(1);
    const [nombreUser, setNombreUser] = useState('');

    const { data, setData, post, reset } = useForm(initialValues);
    //FUNCION PARA LLAMAR A LA RUTA QUE AGREGA EL User al Perfil
    const agregarUserAlPerfil = () => {
        if (!userSeleccionado || !data.id_perfil) return;

        // Agrega user al perfil
        setData(prevData => ({
            ...prevData,
            users: [...prevData.users, userSeleccionado],
        }));

        // Limpia la selección del user
        setNombreUser('');
        setUserSeleccionado(null);
    };
    // MANEJO DE LOS CHECKBOXES DE ACTIVO EN COMPONENTES
    const handleCheckboxChange = (userId) => {
        setData(prevData => ({
            ...prevData,
            relacionesActivas: {
                ...prevData.relacionesActivas,
                [userId]: !prevData.relacionesActivas[userId]
            }
        }));
    };


    //Guardar Cambios en la relacion perfil-user
    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSend = {
            id_perfil: data.id_perfil,
            users: data.users.map(user => ({
                id: user.id,
                sn_activo: data.relacionesActivas[user.id] || false,
            })),
        };

        post(route('perfiluser.actualizar'), dataToSend, {
            preserveScroll: true,
        });
    };

    const handleReset = () => {
        setData(initialValues);
        setNombrePerfil('');
        setUserSeleccionado(null);
        setNombreUser('');
        setPerfilInformacion('');
    };


    const handleGuardarCambios = (e) => {
        e.preventDefault();

        const dataToSend = {
            id_perfil: data.id_perfil,
            users: data.users.map(user => ({
                id: user.id,
                sn_activo: data.relacionesActivas[user.id] || false,
            })),
        };

        post(route('perfiluser.actualizar'), dataToSend)
        setShouldReset(true)
    };



    if (shouldReset) {
        handleReset();
        setShouldReset(false)
    }



 
    const fetchPerfilUser = async (perfilId) => {
        const response = await fetch(`/configuracion/perfil-user/${perfilId}/users`);
        const usersData = await response.json();
        const estadosIniciales = {};
        usersData.forEach(user => {
            estadosIniciales[user.id] = Boolean(user.pivot.sn_activo);
        });
        setData(prevData => ({
            ...prevData,
            id_perfil: perfilId,
            users: usersData,
            relacionesActivas: estadosIniciales,

        }));
    };

    // FETCH para los users del modal
    const fetchUserSearchResults = async (page = 1) => {
        try {
            const response = await fetch(`/configuracion/perfil-user/search-user?query=${userSearchQuery}&page=${page}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            setUserSearchResults(data.data);
            setUserCurrentPage(data.current_page);
            setUserLastPage(data.last_page);
        } catch (error) {
            console.error("Error fetching user search results:", error);
            alert("Hubo un error al buscar usuarios. Por favor, verifica la consola para más detalles.");
        }
    };

    // FETCH para traer los Perfiles
    const fetchPerfilSearchResults = async (page = 1) => {
        const response = await fetch(`/configuracion/perfil-user/search-perfil?query=${perfilSearchQuery}&page=${page}`);
        const data = await response.json();
        setPerfilSearchResults(data.data);
        setPerfilCurrentPage(data.current_page);
        setPerfilLastPage(data.last_page);
        setPerfilInformacion(data.perfil_info)
    };

    // Función para manejar cambios en el campo de búsqueda de perfil
    const handleUserSearchChange = (e) => {
        setUserSearchQuery(e.target.value);
        fetchUserSearchResults(); // Realiza la búsqueda automáticamente
    };

    // Función para seleccionar un user
    const handleSelectUser = (user) => {
        data.id_user = user.id;
        setNombreUser(user.name);
        setUserSeleccionado(user); // Guardar el componente completo
        closeModal();
    };

    // Función para manejar cambios en el campo de búsqueda de perfil
    const handlePerfilSearchChange = (e) => {
        setPerfilSearchQuery(e.target.value);
        fetchPerfilSearchResults(); // Realiza la búsqueda automáticamente
    };

    const handleSelectPerfil = (perfil) => {
        data.id_perfil = perfil.id; // Actualiza el campo del formulario
        setNombrePerfil(perfil.nombre);
        setPerfilInformacion(perfil.informacion);
        fetchPerfilUser(perfil.id); // Obtén los componentes asociados
        closeModal(); // Cierra el modal
    };


    const openPerfilModal = () => {
        setIsPerfilModalOpen(true);
    }

    const openUserModal = () => {
        setIsUserModalOpen(true);
    }

    const closeModal = () => {
        setIsPerfilModalOpen(false);
        setPerfilSearchResults([]); // Limpia los resultados de la búsqueda
        setPerfilSearchQuery(''); // Limpia los resultados de la búsqueda
        setIsUserModalOpen(false);
        setUserSearchResults([]);
        setUserSearchQuery('');
    };

    return (
        <>

                <div className="d-flex justify-content-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Perfiles - Ususario</h2>
                </div>

            <div className='container'>
                <div className="card">
                    <div className="card-body">
                        {/* BOTONES DE BUSQUEDA */}
                        <div className='row d-flex justify-content-evenly'>
                            <div className="card col-5 mb-3">
                                <h3 className='p-2'>Perfil</h3>
                                <div className="input-group mb-3 p-2">
                                    <input
                                        id="Perfil"
                                        type="text"
                                        name="Perfil"
                                        value={nombrePerfil}
                                        className="form-control"
                                        readOnly
                                    // El campo es de solo lectura
                                    />
                                    <button className="btn btn-primary" onClick={openPerfilModal}>Buscar</button>
                                </div>
                            </div>
                            <div className='card col-6 mb-3'>
                                <div className='card-body'>
                                    <h4>Información</h4>
                                    {perfilInformacion ? perfilInformacion : <span className='text-muted'>Sin Selección.</span>}
                                </div>
                            </div>
                        </div>
                        <div className='row mb-3 justify-content-evenly'>
                            <div className="card col-5 mb-3">
                                <h3 className='p-2'>Usuario</h3>
                                <div className="input-group mb-3 p-2 ">
                                    <input
                                        id="User"
                                        type="text"
                                        name="User"
                                        value={nombreUser}
                                        className="form-control"
                                        readOnly
                                    />
                                    <button className="btn btn-primary" onClick={openUserModal}>Buscar</button>
                                </div>
                            </div>
                            <div className='col-6 mb-3'>
                            </div>
                        </div>

                        {/* Vista del Componente seleccionado */}
                        <div className='card mb-3'>
                            <div className='card-header'>
                                <h4>{'Ususario' || <span className='text-muted'> Sin selección</span>}</h4>
                            </div>
                            <div className='card-body'>
                                {nombreUser && userSeleccionado ? (
                                    <>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nombre</th>
                                                    <th>Email</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{userSeleccionado.id}</td>
                                                    <td>{userSeleccionado.name}</td>
                                                    <td>{userSeleccionado.email}</td>
                                                    <td>
                                                        <button
                                                            type="button" // Cambiado de submit a button
                                                            className="btn btn-success btn-sm"
                                                            onClick={agregarUserAlPerfil}
                                                            disabled={!data.id_perfil ||
                                                                data.users.some(c => c.id ===userSeleccionado.id)}
                                                        >
                                                            Agregar
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </>
                                ) : (
                                    <p className="text-muted">Selecciona un usuario para ver sus detalles.</p>
                                )}
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="card">
                                <div className="card-header">
                                    <h4>{nombrePerfil || <span className='text-muted'> Sin selección</span>}</h4>
                                </div>
                                <div className="card-body">
                                    <h5>Ususarios Asociados</h5>
                                    {data.users.length > 0 ? (
                                        <>
                                            <table className="table table-striped table-hover align-middle">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Activo</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.users.map((user) => (
                                                        <tr key={user.id}>
                                                            <th scope="row">{user.id}</th>
                                                            <td>{user.name}</td>
                                                            <td>
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    checked={data.relacionesActivas[user.id] || false}
                                                                    onChange={() => handleCheckboxChange(user.id)}
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
                                                        disabled={!data.id_perfil}
                                                    >
                                                        Aplicar
                                                    </button>
                                                </div>
                                                <div className='col-3'>
                                                    <button type='submit'
                                                        className='btn btn-primary'
                                                        disabled={!data.id_perfil}
                                                        onClick={handleGuardarCambios}>Guardar</button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <p className='text-muted'>No hay usuarios asociados al perfil.</p>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isPerfilModalOpen || isUserModalOpen}
                onRequestClose={closeModal}
                contentLabel={isPerfilModalOpen ? "Buscar Perfil" : "Buscar Usuario"}
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
                                {isPerfilModalOpen ? "Buscar Perfil" : "Buscar Usuario"}
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
                                                    isPerfilModalOpen
                                                        ? perfilSearchQuery
                                                        : userSearchQuery}
                                                onChange={(e) => {
                                                    if (isPerfilModalOpen) {
                                                        setPerfilSearchQuery(e.target.value);
                                                    } else {
                                                        setUserSearchQuery(e.target.value);
                                                    }
                                                }}
                                                placeholder={
                                                    isPerfilModalOpen
                                                        ? "Buscar por nombre de Perfil" : "Buscar por nombre de Usuario"}
                                                className="form-control"
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    if (isPerfilModalOpen) {
                                                        fetchPerfilSearchResults();
                                                    } else {
                                                        fetchUserSearchResults();
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
                                            {(isPerfilModalOpen
                                                ? perfilSearchResults
                                                : userSearchResults).length > 0 ? (
                                                (isPerfilModalOpen
                                                    ? perfilSearchResults
                                                    : userSearchResults).map((item) => (
                                                        <tr key={item.id}>
                                                            <td
                                                                className='table-hover'
                                                                onClick={() => {
                                                                    if (isPerfilModalOpen) {
                                                                        handleSelectPerfil(item);
                                                                    } else {
                                                                        handleSelectUser(item);
                                                                    }
                                                                }}
                                                            >
                                                                {isPerfilModalOpen ? item.nombre : item.name}
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

                                    {(isPerfilModalOpen
                                        ? perfilSearchResults
                                        : userSearchResults
                                    ).length > 0 ? (
                                        <div className="d-flex justify-content-center gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => {
                                                    if (isPerfilModalOpen) {
                                                        fetchPerfilSearchResults(perfilCurrentPage - 1);
                                                    } else {
                                                        fetchUserSearchResults(userCurrentPage - 1);
                                                    }
                                                }}
                                                disabled={
                                                    isPerfilModalOpen
                                                        ? perfilCurrentPage === 1
                                                        : userCurrentPage === 1
                                                }
                                            >
                                                <span aria-hidden="true">&laquo;</span>
                                            </button>
                                            <span>
                                                {isPerfilModalOpen
                                                    ? perfilCurrentPage
                                                    : userCurrentPage} de{" "}
                                                {isPerfilModalOpen
                                                    ? perfilLastPage
                                                    : userLastPage}
                                            </span>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => {
                                                    if (isPerfilModalOpen) {
                                                        fetchPerfilSearchResults(perfilCurrentPage + 1);
                                                    } else {
                                                        fetchUserSearchResults(userCurrentPage + 1);
                                                    }
                                                }}
                                                disabled={
                                                    isPerfilModalOpen
                                                        ? perfilCurrentPage === perfilLastPage
                                                        : userCurrentPage === userLastPage
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