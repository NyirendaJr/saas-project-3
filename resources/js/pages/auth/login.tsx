import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { PasswordInput } from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react';
import { initializeCsrf } from '@/utils/csrf';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        await initializeCsrf();
        console.log('csrf initialized');
        post(route('login'), {
            onFinish: () => reset('password')
        });
    };


    return (
        <>
            <Head title="Log in" />

            <div className="relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
                {/* Left Side - Branding */}
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-6 w-6"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        Shadcn Admin
                    </div>

                    <img src="/logo.svg" className="relative m-auto" width={301} height={60} alt="Logo" />

                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;This template has saved me countless hours of work and helped me deliver stunning designs to my clients faster
                                than ever before.&rdquo;
                            </p>
                            <footer className="text-sm">John Doe</footer>
                        </blockquote>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-left">
                            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email and password below <br />
                                to log into your account
                            </p>
                        </div>

                        {/* Status Message */}
                        {status && (
                            <div className="mb-4 rounded-md border border-green-200 bg-green-50 p-3 text-center text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        {/* Login Form */}
                        <form className="grid gap-3" onSubmit={submit}>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="name@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={route('password.request')}
                                            className="text-sm font-medium text-muted-foreground hover:opacity-75"
                                        >
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    required
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="********"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox id="remember" name="remember" checked={data.remember} onClick={() => setData('remember', !data.remember)} />
                                <Label htmlFor="remember" className="text-sm">
                                    Remember me
                                </Label>
                            </div>

                            <Button type="submit" className="mt-2 w-full" disabled={processing}>
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Login
                            </Button>

                            {/* Divider */}
                            <div className="relative my-2">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                                </div>
                            </div>

                            {/* Social Login Buttons */}
                            <div className="grid grid-cols-2 gap-2">
                                <Button variant="outline" type="button" disabled={processing}>
                                    <IconBrandGithub className="mr-2 h-4 w-4" /> GitHub
                                </Button>
                                <Button variant="outline" type="button" disabled={processing}>
                                    <IconBrandFacebook className="mr-2 h-4 w-4" /> Facebook
                                </Button>
                            </div>
                        </form>

                        {/* Sign Up Link */}
                        <div className="text-center text-sm text-muted-foreground">
                            Don't have an account? <TextLink href={route('register')}>Sign up</TextLink>
                        </div>

                        {/* Terms and Privacy */}
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking login, you agree to our{' '}
                            <a href="/terms" className="underline underline-offset-4 hover:text-primary">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
