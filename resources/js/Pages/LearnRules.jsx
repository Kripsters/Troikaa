import React from 'react';

export default function LearnRules() {
    return (
        // Apply background to the body and html to cover the entire screen
        <div className="min-h-screen bg-gradient-to-r from-indigo-200 to-indigo-200 dark:from-gray-900 dark:to-gray-900 p-0">
            <div className="container mx-auto px-8 py-16 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                <h1 className="text-5xl font-bold text-center text-gray-800 dark:text-white mb-10">
                    Learn the Rules of Shithead
                </h1>
                <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
                    Master the game of Shithead by following these simple steps. Let's get started!
                </p>

                <div className="space-y-10">
                    {/* Step 1: Game Setup */}
                    <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <div className="bg-blue-500 text-white rounded-full p-4 mr-4">
                                <span className="text-2xl">1</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Game Setup</h2>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Players start by selecting a deck and shuffling the cards. Each player gets 3 piles: face-down, face-up, and a hand of cards. The goal is to get rid of all your cards before others.
                        </p>
                    </div>

                    {/* Step 2: Basic Rules */}
                    <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <div className="bg-green-500 text-white rounded-full p-4 mr-4">
                                <span className="text-2xl">2</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Basic Rules</h2>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            The game is played in turns, and players take turns playing cards onto a central pile. The cards must be played in increasing order, or the player draws from the deck if they can't play.
                        </p>
                    </div>

                    {/* Step 3: Advanced Tips */}
                    <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <div className="bg-purple-500 text-white rounded-full p-4 mr-4">
                                <span className="text-2xl">3</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Advanced Tips</h2>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            To excel, use high-value cards like 10s wisely. Mastering the timing of special cards like Skip or Reverse can change the flow of the game and give you an advantage.
                        </p>
                    </div>

                    {/* Step 4: Special Rules */}
                    <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <div className="bg-red-500 text-white rounded-full p-4 mr-4">
                                <span className="text-2xl">4</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Special Cards</h2>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            There are special cards like 6 and 10.
                            6 is a card whose value is 0 so it means if someone placed 6 card you can play any card you want like 2, 3 and others.
                            10 is a card which, if is played, discard all of the cards in the pile.
                        </p>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-12 text-center">
                    <a 
                        href="/" 
                        className="inline-block bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition duration-200"
                    >
                        Go Back to Playing
                    </a>
                </div>
            </div>
        </div>
    );
}
