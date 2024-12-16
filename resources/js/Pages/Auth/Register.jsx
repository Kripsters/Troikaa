import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-green-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Shithead Card Game Registration" />
            <div className="w-full max-w-md space-y-8 bg-white shadow-2xl rounded-xl p-8 border-4 border-red-600">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        Join the Shithead Arena
                    </h2>
                    <p className="text-sm text-gray-600 mt-2">
                        Create your player account and start battling!
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Player Name Field */}
                    <div>
                        <label 
                            htmlFor="name" 
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={data.name}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            autoComplete="name"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            placeholder="Create your unique username"
                        />
                        {errors.name && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.name}
                            </p>
                        )}
                    </div>

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
                            required
                            placeholder="Your email"
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
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            placeholder="Create your secret password"
                        />
                        {errors.password && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Password Confirmation Field */}
                    <div>
                        <label 
                            htmlFor="password_confirmation" 
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm password
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                            placeholder="Repeat your secret password"
                        />
                        {errors.password_confirmation && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>

                    {/* Submit and Login Link */}
                    <div className="flex items-center justify-between">
                        <Link
                            href={route('login')}
                            className="text-sm font-medium text-gray-600 hover:text-red-600"
                        >
                            Already a player?
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="py-2 px-4 border border-transparent 
                                rounded-md shadow-sm text-sm font-medium text-white 
                                bg-red-600 hover:bg-red-700 focus:outline-none 
                                focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                                disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Entering Arena...' : 'Register'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}