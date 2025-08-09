import { ColorSchemeDemo } from '@/components/color-scheme-demo';
import { Head } from '@inertiajs/react';

export default function ColorDemo() {
    return (
        <>
            <Head title="Color Scheme Demo">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-background">
                <ColorSchemeDemo />
            </div>
        </>
    );
}
