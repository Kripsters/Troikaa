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
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Log in" />

            <div className="w-full max-w-md space-y-8 bg-white shadow-xl rounded-xl p-8 border border-gray-200">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h1>
                    <p className="mt-2 text-sm text-gray-600">Log in to access your account</p>
                </div>

                {status && (
                    <div className="my-4 rounded-lg bg-green-100 p-3 text-sm font-medium text-green-600 shadow">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    {/* Email Field */}
                    <div>
                        <InputLabel htmlFor="email" value="Email Address" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Enter your email"
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Password Field */}
                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Enter your password"
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        {/* Forgot Password Link */}
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm font-medium text-gray-600 hover:text-black"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <PrimaryButton
                            className="w-full flex justify-center py-2 px-4 border border-transparent 
                                rounded-md shadow-sm text-sm font-medium text-white 
                                bg-black hover:bg-gray-800 focus:outline-none 
                                focus:ring-2 focus:ring-offset-2 focus:ring-black"
                            disabled={processing}
                        >
                            {processing ? 'Signing In...' : 'Sign In'}
                        </PrimaryButton>
                    </div>
                </form>

                {/* Sign Up Link */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link href={route('register')} className="font-medium text-black hover:text-gray-800">
                        Register here
                    </Link>
                </div>
            </div>
        </div>
    );
}
