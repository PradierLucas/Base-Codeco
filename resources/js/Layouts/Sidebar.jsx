// Sidebar.jsx

import { Link } from "@inertiajs/react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import "./styles.css";
import Authenticated from "./AuthenticatedLayout";

export default function DashboardLayout({ children }) {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [openMenus, setOpenMenus] = useState({});
    const user = JSON.parse(localStorage.getItem("user"));




    const datos = {
        usuarios: [
            {
                id: 1,
                nombre: "Instalador",
                perfiles: [
                    {
                        nombre: "Configurar",
                        menus: [
                            {
                                id: 90,
                                nombre: "Configuración",
                                componente: [
                                    { nombre: "Componentes", url: "/componente/vista"},
                                    { nombre: "Menús", url: "/menu/vista"},
                                    { nombre: "Menú - Componentes", url: "/configuracion/menu-componentes" },
                                    { nombre: "Perfiles", url: "/perfil/"},
                                    { nombre: "Perfil - Menú", url: "/configuracion/perfil-menu" },
                                    { nombre: "Usuarios", url: "" },
                                    { nombre: "Usuarios - Perfiles", url: "" },
                                    { nombre: "Usuarios - Excepción", url: "" },
                                ],
                            },
                            {
                                id: 80,
                                nombre: "Imibio",
                                componente: [
                                    { nombre: "General", url: "/imibio" },
                                    { nombre: "Proyectos", url: "/imibio/proyectos" },
                                    
                                ],
                            },
                            
                        ],
                    },
                ],
            },
            {
                id: 3,
                nombre: "Administrador",
                perfiles: [
                    {
                        nombre: "Administrar Sistema",
                        menus: [
                            {
                                id: 10,
                                nombre: "Contactos",
                                componente: [{ nombre: "Contactos", url: "/contactos" }],
                            },
                            {
                                id: 20,
                                nombre: "Categorias",
                                componente: [{ nombre: "Categorias", url: "/categorias" }],
                            },
                        ],
                    },
                ],
            },
        ],
    };

    const filteredUser = datos.usuarios.find((usuario) => usuario.id === Number(user?.id));

    const toggleMenu = (menuId) => {
        setOpenMenus((prevState) => ({
            ...prevState,
            [menuId]: !prevState[menuId],
        }));
    };

    const sidebarVariants = {
        open: { width: '250px', opacity: 1, x: 0, transition: { duration: 0.3 } },
        closed: { width: '0px', opacity: 0, x: -250, transition: { duration: 0.3 } },
    };

    const contentVariants = {
        open: { transition: { duration: 0.3 } },
        closed: { marginLeft: '0px', transition: { duration: 0.3 } },
    };


    return (
        <div className="d-flex">
            <motion.div
                className="bg-success text-white p-3 d-flex flex-column justify-content-between"
                variants={sidebarVariants}
                animate={sidebarVisible ? 'open' : 'closed'}

                style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
            >
                <div>
                    <button
                        className="btn btn-light position-absolute top-0 end-0 m-2"
                        style={{ border: "none", background: "none", color: "white", fontSize: "1.5rem" }}
                        onClick={() => setSidebarVisible(!sidebarVisible)}
                        title={sidebarVisible ? "Cerrar menú" : "Abrir menú"}
                    >
                        &#9776;
                    </button>
                    <h4 className="mb-4">CODECO</h4>

                    {/* Menú lateral */}
                    <div className="container overflow-auto" style={{ maxHeight: "350px", minWidth: "250px", overflowY: "hidden" }}>
                        <ul className="nav flex-column">
                            {filteredUser &&
                                filteredUser.perfiles.flatMap((perfil) =>
                                    perfil.menus.map((menu) => (
                                        <li key={menu.id} className="nav-item dropdown">
                                            {/* Botón para desplegar el menú */}
                                            <button
                                                className="btn btn-link nav-link dropdown-toggle text-white"
                                                type="button"
                                                onClick={() => toggleMenu(menu.id)}
                                                aria-expanded={openMenus[menu.id] ? "true" : "false"}
                                            >
                                                {menu.nombre}
                                            </button>

                                            {/* Lista de componentes (submenu) */}
                                            <div className={`collapse ${openMenus[menu.id] ? "show" : ""}`}>
                                                <ul className="list-unstyled ps-3">
                                                    {menu.componente.map((componente, index) => (
                                                        <li key={index}>
                                                            <Link className="dropdown-item" href={componente.url}>
                                                                <small className="">{componente.nombre}</small>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </li>
                                    ))
                                )}
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-success text-white text-center py-3">
                    <hr />
                    <div className="container">
                        <Authenticated user={user} />
                        <hr />
                        <p style={{ fontSize: "12px" }}>&copy; CODECO 2025</p>
                    </div>
                </footer>
            </motion.div>

            {/* Contenido principal */}
            <motion.div className="flex-grow-1 p-4"
                style={{ overflow: 'hidden' }}
                animate={sidebarVisible ? 'open' : 'closed'}
                variants={contentVariants}
            >
                {!sidebarVisible && (
                    <button
                        className="btn btn-light mb-3"
                        style={{ border: "none", background: "none", position: "sticky", top: 0, fontSize: "1.5rem" }}
                        onClick={() => setSidebarVisible(!sidebarVisible)}
                        title={sidebarVisible ? "Cerrar menú" : "Abrir menú"}
                    >
                        &#9776;
                    </button>
                )}
                {children}
            </motion.div>
        </div>
    );
}




