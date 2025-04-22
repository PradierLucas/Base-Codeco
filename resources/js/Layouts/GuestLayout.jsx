import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center pt-3 bg-light">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-25 h-25 text-secondary" />
                </Link>
            </div>

            <div className="login-width mt-3 px-3 py-4 bg-white shadow-sm rounded">
                {children}
            </div>
        </div>
    );
}
