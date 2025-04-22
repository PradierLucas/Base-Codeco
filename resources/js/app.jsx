import './bootstrap';
import '../css/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import DashboardLayout from './Layouts/Sidebar';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,

    resolve: async (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx');
        const page = await resolvePageComponent(`./Pages/${name}.jsx`, pages);

    
        if ( sessionStorage.length > 0) {
            page.default.layout = (page) => <DashboardLayout>{page}</DashboardLayout>;
        }

        return page;
    },

    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },

    progress: {
        color: '#4B5563',
    },
});
