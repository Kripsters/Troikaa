<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LobbyController;

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
    Route::get('api/lobbies', [LobbyController::class, 'index']);
    Route::get('api/lobbies/{lobby}', [LobbyController::class, 'show'])->name('lobby.show');
    Route::get('/lobbies/{lobby}/join', [LobbyController::class, 'join']);
    Route::get('/lobbies/{lobby}/leave', [LobbyController::class, 'leave']);
    Route::delete('/lobbies/user/{userId}', [LobbyController::class, 'deleteByUser']);
    Route::delete('api/lobbies/delete-by-creator', [LobbyController::class, 'deleteLobbiesByCreator']);


});

require __DIR__.'/auth.php';
