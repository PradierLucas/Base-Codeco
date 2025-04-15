import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DashboardLayout from '@/Layouts/Sidebar';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const [perfilesMenusComponentes, setPerfilesMenusComponentes] = useState(null);

    // Guardar usuario en localStorage
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(auth.user));
    }, [auth.user]);

    // Función para obtener los datos del backend
    const fetchPerfilesMenusComponentes = async () => {
        try {
            const response = await fetch('/user/perfil-menu-componentes');
            const data = await response.json();
            setPerfilesMenusComponentes(data);
            localStorage.setItem('perfilesMenusComponentes', JSON.stringify(data)); // <- Aquí guardas en localStorage
        } catch (error) {
            console.error('Error fetching perfiles, menus, and componentes:', error);
        }
    };

    // Llamar a la función al montar el componente
    useEffect(() => {
        fetchPerfilesMenusComponentes();
    }, []);

    return (
        <DashboardLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
