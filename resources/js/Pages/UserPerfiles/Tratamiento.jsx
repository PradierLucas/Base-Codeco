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
        perfiles: [],
        perfilesActivos: {},
    };

    const [shouldReset, setShouldReset] = useState(false);
    const [userSeleccionado, setUserSeleccionado] = useState(null);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [userSearchQuery, setUserSearchQuery] = useState('');
    const [userSearchResults, setUserSearchResults] = useState([]);
    const [userCurrentPage, setUserCurrentPage] = useState(1);
    const [userLastPage, setUserLastPage] = useState(1);
    const [nombreUser, setNombreUser] = useState('');

    const { data, setData, post, reset } = useForm(initialValues);

    // MANEJO DE LOS CHECKBOXES DE ACTIVO EN COMPONENTES
    const handleCheckboxChange = (perfilId) => {
        setData(prevData => ({
            ...prevData,
            perfilesActivos: {
                ...prevData.perfilesActivos,
                [perfilId]: !prevData.perfilesActivos[perfilId],
            }
        }));
    };


    //Guardar Cambios en la relacion perfil-user
    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSend = {
            id_user: data.id_user,
            perfiles: data.perfiles.map(perfil => ({
                id: perfil.id,
                sn_activo: data.perfilesActivos[perfil.id] || false,
            })),
        };

        post(route('userperfil.actualizar'), dataToSend, {
            preserveScroll: true,
        });
    };

    const handleReset = () => {
        setData(initialValues);
        setUserSeleccionado(null);
        setNombreUser('');
    };


    const handleGuardarCambios = (e) => {
        e.preventDefault();
    
        const dataToSend = {
            id_user: data.id_user,
            perfiles: data.perfiles.map(perfil => ({
                id: perfil.id,
                sn_activo: data.perfilesActivos?.[perfil.id] || false, // Usa el operador opcional para evitar errores
            })),
        };
    
        post(route('userperfil.actualizar'), dataToSend);
        setShouldReset(true);
    };



    if (shouldReset) {
        handleReset();
        setShouldReset(false)
    }



    // FETCH para los componentes relacionados al MENU seleccionado
    const fetchUserPerfiles = async (userId) => {
        const response = await fetch(`/configuracion/user-perfiles/${userId}/perfiles`);
        const perfiles = await response.json();
        const perfilesActivos = {};
        perfiles.forEach(perfil => {
            perfilesActivos[perfil.id] = Boolean(perfil.pivot.sn_activo);
        });

        setData(prevData => ({
            ...prevData,
            id_user: userId,
            perfiles: perfiles,
            perfilesActivos: perfilesActivos, // Actualiza perfilesActivos aquí
        }));
    };

    // FETCH para los users del modal
    const fetchUserSearchResults = async (page = 1) => {
        try {
            const response = await fetch(`/configuracion/user-perfiles/search-user?query=${userSearchQuery}&page=${page}`);
            
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
        fetchUserPerfiles(user.id); // Llama a la función para obtener los perfiles del user seleccionado
        closeModal();
    };


    const openUserModal = () => {
        setIsUserModalOpen(true);
    }

    const closeModal = () => {
        setIsUserModalOpen(false);
        setUserSearchResults([]);
        setUserSearchQuery('');
    };

    return (
        <>

                <div className="d-flex justify-content-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Usuario - Perfiles</h2>
                </div>

            <div className='container'>
                <div className="card">
                    <div className="card-body">
                        {/* BOTONES DE BUSQUEDA */}
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

                        {/* Vista del Menú seleccionado */}
                        <form onSubmit={handleSubmit}>
                            <div className="card">
                                <div className="card-header">
                                    <h4>{nombreUser ? nombreUser : <span className='text-muted'> Sin selección</span>}</h4>
                                </div>
                                <div className="card-body">
                                    <h5>Perfiles Asociados</h5>
                                    {data.perfiles.length > 0 ? (
                                        <>
                                            <table className="table table-striped table-hover align-middle">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Abrevitura</th>
                                                        <th scope="col">Activo</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.perfiles.map((perfil) => (
                                                        <tr key={perfil.id}>
                                                            <th scope="row">{perfil.id}</th>
                                                            <td>{perfil.nombre}</td>
                                                            <td>{perfil.abreviatura}</td>
                                                            <td>
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    checked={data.perfilesActivos[perfil.id] || false}
                                                                    onChange={() => handleCheckboxChange(perfil.id)}
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
                                                    <button type='submit'
                                                        className='btn btn-primary'
                                                        disabled={!data.id_user}
                                                        onClick={handleGuardarCambios}>Guardar</button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <p className='text-muted'>No hay perfiles asociados a este usuario</p>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isUserModalOpen}
                onRequestClose={closeModal}
                contentLabel={"Buscar Usuario"}
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
                                {"Buscar Usuario"}
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
                                                value={userSearchQuery}
                                                onChange={(e) => {setUserSearchQuery(e.target.value);}}
                                                placeholder={"Buscar por nombre de Usuario"}
                                                className="form-control"
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => {fetchUserSearchResults();}}
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
                                            {userSearchResults.length > 0 ? (
                                                (userSearchResults).map((item) => (
                                                        <tr key={item.id}>
                                                            <td
                                                                className='table-hover'
                                                                onClick={() => {handleSelectUser(item);}}
                                                            >
                                                                {item.name}
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

                                    {(userSearchResults).length > 0 ? (
                                        <div className="d-flex justify-content-center gap-2 my-2">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => {fetchUserSearchResults(userCurrentPage - 1);}}
                                                disabled={userCurrentPage === 1}
                                            >
                                                <span aria-hidden="true">&laquo;</span>
                                            </button>
                                            <span>
                                                {userCurrentPage} de{" "}{userLastPage}
                                            </span>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => {fetchUserSearchResults(userCurrentPage + 1);}}
                                                disabled={userCurrentPage === userLastPage}
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