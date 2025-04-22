import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from '@inertiajs/react';

import './styles.css';
import Swal from 'sweetalert2';

import { Dropdown } from 'react-bootstrap';
import DashboardLayout from '@/Layouts/Sidebar';

Modal.setAppElement('#app');
const Index = ({ contactos }) => {


    const [searchTerm, setSearchTerm] = useState('');
    const [contacts, setContacts] = useState(contactos);
    const [modal, setModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    const openModal = (contact) => {
        setSelectedContact(contact);
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
        setSelectedContact(null);
    }

    const deleteContact = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedContacts = contacts.filter(contact => contact.id_contacto !== id);
                setContacts(updatedContacts);
                Inertia.delete(`/contacto/${id}`);
                Swal.fire('Eliminado', 'El contacto ha sido eliminado.', 'success');
            }
        });
    };

    const filteredContacts = contacts?.filter(contact =>
        contact.nombrefantasia.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
          
            <h2 >Contactos</h2>
            <div className="container mt-4">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            placeholder="Buscar contacto"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="col-md-6 text-right">
                        <Link href="/contacto/create" className="btn btn-dark">
                            Crear Contacto
                        </Link>
                    </div>

                </div>
                <div className="table-responsive" style={{ maxHeight: '500px', minHeight: '500px', overflowY: 'auto' }}>
                    <table className="table table-striped">
                        <thead className="thead-dark" style={{ position: 'sticky', top: 0 }}>
                            <tr>
                                <th>Apellido / Razon Social</th>
                                <th>Nombre / Nombre Fantasia</th>
                                <th>Persona</th>
                                <th>Identificación</th>
                                <th>Email</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredContacts?.map(contact => (
                                <tr key={contact.id_contacto}>
                                    <td>{contact.apellidorazonsocial}</td>
                                    <td>{contact.nombrefantasia}</td>
                                    <td>{contact.fisicojuridico}</td>
                                    <td>{contact.fisicojuridico == 'JURIDICO' ? (contact.identidad_tributaria + ' ' + contact.id_identidadtributaria_dato) : (contact.identidad_personal + ' ' + contact.id_personal_dato)}</td>
                                    <td>{contact.mail_direccion}</td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="dark" size="sm" className="w-100"></Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    <button className="btn w-100" onClick={() => openModal(contact)}>Más Info</button>
                                                </Dropdown.Item>
                                                <Dropdown.Item as={Link} href={`/contacto/${contact.id_contacto}/edit`}>
                                                    <button className="btn w-100">Editar</button>
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => deleteContact(contact.id_contacto)}>
                                                    <button className="btn w-100">Eliminar</button>
                                                </Dropdown.Item>
                                                <Dropdown.Item as={Link} href={`/contacto/${contact.id_contacto}/radicaciones`}>
                                                    <button className="btn w-100">Radicaciones</button>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>



            <Modal
                isOpen={modal}
                onRequestClose={closeModal}
                contentLabel={selectedContact?.nombrefantasia}
                className="modal"
                overlayClassName="modal-overlay"
            >

                <div className="modal-header">
                    <h5 className="modal-title">{selectedContact?.apellidoynombre}</h5>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={closeModal}
                        aria-label="Cerrar"
                    ></button>
                </div>
                <div className="modal-body " style={{ maxHeight: '370px', overflowY: 'auto' }}>
                    {selectedContact && (
                        <table className="table table-striped" >
                            <tbody>
                                <tr>
                                    <th>Teléfono {selectedContact.telefono_sn_movil == '1' ? 'Móvil' : 'Fijo'}</th>
                                    <td>  {selectedContact.telefono_numero}</td>
                                </tr>
                                <tr>
                                    <th>Condición</th>
                                    <td>{selectedContact.condiciontributaria}</td>
                                </tr>
                                <tr>
                                    <th>Dirección</th>
                                    <td>{selectedContact.direccion_calle}</td>
                                </tr>
                                <tr>
                                    <th>Región</th>
                                    <td>{selectedContact.region}</td>
                                </tr>
                                <tr>
                                    <th>País</th>
                                    <td>{selectedContact.pais}</td>
                                </tr>
                                <tr>
                                    <th>Observación</th>
                                    <td>{selectedContact.observacion}</td>
                                </tr>
                                <tr>
                                    <th>Activo</th>
                                    <td>{selectedContact.activo == '1' ? 'Activo' : 'Inactivo'}</td>
                                </tr>
                                <tr>
                                    <th>Estado</th>
                                    <td>{selectedContact.estado}</td>
                                </tr>




                            </tbody>
                        </table>
                    )}
                </div>

            </Modal>
          
        </>
    );
}

export default Index;