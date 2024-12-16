import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-green-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Shithead - Player Login" />

            <div className="w-full max-w-md space-y-8 bg-white shadow-2xl rounded-xl p-8 border-4 border-red-600">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900">Enter the Shithead Arena</h1>
                    <p className="mt-2 text-sm text-gray-600">Log in to continue your card battle</p>
                </div>

                {status && (
                    <div className="my-4 rounded-lg bg-green-100 p-3 text-sm font-medium text-green-600 shadow">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    {/* Email Field */}
                    <div>
                        <label 
                            htmlFor="email" 
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label 
                            htmlFor="password" 
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Enter your secret password"
                            required
                        />
                        {errors.password && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Remember Me and Forgot Password */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm font-medium text-gray-600 hover:text-red-600"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex justify-center py-2 px-4 border border-transparent 
                                rounded-md shadow-sm text-sm font-medium text-white 
                                bg-red-600 hover:bg-red-700 focus:outline-none 
                                focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                                disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Entering Arena...' : 'Enter the Game'}
                        </button>
                    </div>
                </form>

                {/* Sign Up Link */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    New to Shithead?{' '}
                    <Link href={route('register')} className="font-medium text-red-600 hover:text-red-700">
                        Create your player account
                    </Link>
                </div>
            </div>
        </div>
    );
}