import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia'; // Importē Inertia.js, lai varētu veikt navigāciju

export default function Dashboard() {
    const [gameMode, setGameMode] = useState(null); // Saglabā spēles režīmu

    // Funkcija, kas maina spēles režīmu un novirza uz attiecīgo URL
    const handleGameModeSelection = (mode) => {
        setGameMode(mode);

        // Pārbauda, kuru režīmu izvēlējās un novirza uz atbilstošo lapu
        if (mode === 'single') {
            Inertia.visit('/single-player'); // Novirza uz Single Player lapu
        } else if (mode === 'multi') {
            Inertia.visit('/multiplayer'); // Novirza uz Multiplayer lapu
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2>You're logged in!</h2>
                            {!gameMode ? (
                                <div className="mt-4">
                                    <button
                                        onClick={() => handleGameModeSelection('single')}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4"
                                    >
                                        Single Player
                                    </button>
                                    <button
                                        onClick={() => handleGameModeSelection('multi')}
                                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                                    >
                                        Multiplayer
                                    </button>
                                </div>
                            ) : (
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">
                                        You have selected: {gameMode === 'single' ? 'Single Player' : 'Multiplayer'}
                                    </h3>
                                    {/* Papildu logika spēles ielādei vai navigācijai pēc izvēles */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
