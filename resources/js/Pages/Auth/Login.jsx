import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>

            {status && <div className="mb-4 font-medium text-sm text-success">{status}</div>}
            <div className='card'>
                <div className='card-body'>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="email" className='form-label'>Email</label>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="form-control"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2 text-danger" />
                </div>

                <div className="mb-3">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="form-control"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2 text-danger" />
                </div>

                <div className="form-check mb-3">
                    <input
                        type='checkbox'
                        name="remember"
                        checked={data.remember}
                        className="form-check-input"
                        onChange={(e) => setData('remember', e.target.checked)}
                    />
                    <label className="form-check-label">
                        Recordarme
                    </label>
                </div>

                <div className="d-flex justify-content-between">
                        <a
                            href={route('password.request')}
                        >
                            Olvide mi contraseña
                        </a>

                    <PrimaryButton className="btn btn-primary ms-4" disabled={processing}>
                        Ingresar
                    </PrimaryButton>
                </div>
            </form>
            </div>
            </div>
        </GuestLayout>
    );
}
