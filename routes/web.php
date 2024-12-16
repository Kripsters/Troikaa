<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LobbyController;
use App\Http\Controllers\GameController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'canLogin' => Route::has('login'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/api/lobbies', [LobbyController::class, 'store']);
    Route::get('/api/lobbies', [LobbyController::class, 'index'])->name('lobbies.index')->middleware(['auth', 'verified']);
    Route::get('/api/lobbies/{lobby}', [LobbyController::class, 'show'])->name('lobby.show');
    Route::post('/api/lobbies/{lobby}/leave', [LobbyController::class, 'leaveLobby']);
    Route::post('/lobbies/{lobbyId}/join', [LobbyController::class, 'joinLobby']);
    Route::post('/api/lobbies/{lobby}/toggle-ready', [LobbyController::class, 'toggleReadyStatus']);
    Route::post('/api/lobbies/{lobby}/start', action: [LobbyController::class, 'startGame']);




    //testing
    Route::post('/api/lobbies/{lobbyId}/start', [GameController::class, 'start']);
    Route::get('/api/games/{lobbyId}', [GameController::class, 'showGame'])->name('game.show');
    Route::get('/games/{lobbyId}', [GameController::class, 'showGame']);

    //nejiet laikam
    Route::delete('/api/lobbies/delete-by-creator', [LobbyController::class, 'deleteByUser']);
    Route::get('/api/lobbies/find-by-code/{code}', [LobbyController::class, 'findByCode']);

});

require __DIR__.'/auth.php';
