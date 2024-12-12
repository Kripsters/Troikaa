import React from 'react';

export default function Welcome({ auth }) {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
                <div className="container mx-auto px-4 py-12 flex-grow">
                    <div className="max-w-4xl mx-auto text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 100 100">
                                <path fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="2" d="M50.851,81.281l-25.18,6.73	c-2.04,0.545-4.136-0.667-4.682-2.707l-15.1-56.495c-0.545-2.04,0.667-4.136,2.707-4.682l15.266-4.08"></path><path fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="2" d="M52.923,13.009H69.2	c2.112,0,3.824,1.712,3.824,3.824v1.459"></path><path fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="2" d="M43.364,79.135H27.83	c-2.112,0-3.824-1.712-3.824-3.824V16.833c0-2.112,1.712-3.824,3.824-3.824h20.276"></path><path fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="2" d="M74.445,87.665L34.163,76.636	c-2.037-0.558-3.236-2.661-2.678-4.698l15.533-56.732c0.558-2.037,2.661-3.236,4.698-2.678l40.281,11.029	c2.037,0.558,3.236,2.661,2.678,4.698L79.143,84.987C78.585,87.024,76.482,88.223,74.445,87.665z"></path><path fill="none" stroke="#1d1d1b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M60.6,56.876	c0,0-2.532,4.75-8.776,2.997c-6.101-1.712-5.405-8.295-4.495-10.863c0.91-2.569,4.923-5.78,9.311-7.492	c4.388-1.712,10.061-6.475,10.061-6.475s2.729,7.064,3.96,8.937c1.231,1.873,5.145,7.439,5.084,11.131	c-0.054,3.211-2.943,11.077-10.81,8.188C60.457,61.653,60.6,56.876,60.6,56.876z"></path><path fill="none" stroke="#1d1d1b" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M60.333,57.84l-6.903,9.311	c3.312-0.437,6.154-0.053,8.081,1.927L60.333,57.84z"></path><path fill="none" stroke="#1d1d1b" stroke-linejoin="round" stroke-miterlimit="10" d="M72.248,79.167c0,0-0.804,1.508-2.786,0.951	c-1.937-0.544-1.716-2.634-1.427-3.449c0.289-0.816,1.563-1.835,2.956-2.379c1.393-0.544,3.194-2.056,3.194-2.056	s0.867,2.243,1.257,2.837c0.391,0.595,1.634,2.362,1.614,3.534c-0.017,1.019-0.934,3.517-3.432,2.6	C72.202,80.684,72.248,79.167,72.248,79.167z"></path><path fill="none" stroke="#1d1d1b" stroke-linejoin="round" stroke-miterlimit="10" d="M72.163,79.473l-2.192,2.956	c1.052-0.139,1.954-0.017,2.566,0.612L72.163,79.473z"></path><path fill="none" stroke="#1d1d1b" stroke-linejoin="round" stroke-miterlimit="10" d="M53.464,25.707c0,0-0.804,1.508-2.786,0.951	c-1.937-0.544-1.716-2.634-1.427-3.449c0.289-0.816,1.563-1.835,2.956-2.379c1.393-0.544,3.194-2.056,3.194-2.056	s0.867,2.243,1.257,2.837c0.391,0.595,1.634,2.362,1.614,3.534c-0.017,1.019-0.934,3.517-3.432,2.6	C53.419,27.223,53.464,25.707,53.464,25.707z"></path><path fill="none" stroke="#1d1d1b" stroke-linejoin="round" stroke-miterlimit="10" d="M53.379,26.012l-2.192,2.956	c1.052-0.139,1.954-0.017,2.566,0.612L53.379,26.012z"></path><line x1="80.767" x2="80.135" y1="64.378" y2="66.777" fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-miterlimit="10"></line><line x1="82.275" x2="81.452" y1="58.842" y2="61.848" fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-miterlimit="10"></line><path fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-miterlimit="10" d="M73.392,22.467l15.915,4.256	c0.889,0.243,1.412,1.161,1.168,2.05l-7.451,27.649"></path><line x1="67.387" x2="71.456" y1="20.799" y2="21.862" fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-miterlimit="10"></line><line x1="63.117" x2="65.605" y1="19.684" y2="20.334" fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-miterlimit="10"></line><line x1="42.776" x2="43.221" y1="46.55" y2="44.935" fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-miterlimit="10"></line><line x1="41.348" x2="42.052" y1="51.148" y2="48.59" fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-miterlimit="10"></line><path fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-miterlimit="10" d="M55.448,78.829l-18.662-5.11	c-0.889-0.243-1.412-1.161-1.168-2.05l5.162-18.746"></path><line x1="61.291" x2="57.533" y1="80.429" y2="79.4" fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-miterlimit="10"></line><line x1="65.571" x2="63.158" y1="81.601" y2="80.941" fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-miterlimit="10"></line><path fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M55.652,56.743	c-2.167,0.401-3.385-0.494-3.951-1.404c-1.207-1.942-0.909-3.848-0.457-5.122c0.662-1.87,3.585-4.209,6.78-5.455	c3.195-1.247,7.326-4.715,7.326-4.715s1.987,5.144,2.884,6.508c0.896,1.364,3.454,5.428,3.702,8.105	c0.252,2.726-2.236,6.338-7.374,4.893"></path>
                            </svg>
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                            Welcome to Card Master
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            Explore, play, and master the art of card games
                        </p>

                        <div className="grid md:grid-cols-3 gap-6 mt-12">
                            {/* Game Modes Card */}
                            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 text-center transition hover:scale-105">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                                    Game Modes
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Choose from multiple card game variations
                                </p>
                                <a 
                                    href="/api/lobbies" 
                                    className="inline-block bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
                                >
                                    Play Now
                                </a>
                            </div>

                            {/* Learn Card */}
                            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 text-center transition hover:scale-105">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                                    Learn Cards
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Tutorials and strategy guides for card games
                                </p>
                                <a 
                                    href="/learn" 
                                    className="inline-block bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
                                >
                                    Start Learning
                                </a>
                            </div>

                            {/* Profile Card */}
                            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 text-center transition hover:scale-105">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-purple-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                                    Your Profile
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Track your progress and achievements
                                </p>
                                <a 
                                    href="/dashboard" 
                                    className="inline-block bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition"
                                >
                                    View Profile
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}