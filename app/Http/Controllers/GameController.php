<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Lobby;
use Illuminate\Http\Request;
use Inertia\Inertia;
class GameController extends Controller
{


    public function start($lobbyId)
    {
        $lobby = Lobby::findOrFail($lobbyId);
        $game = new Game();
        $game->lobby_id = $lobby->id;
        $game->start(); // Custom game initialization logic
    
        $users = $lobby->users;

        if (!$game) {
            return response()->json(['message' => 'Game test found'], 404);
        }
        // return response()->json([
        //     'game' => $game,
        //     'users' => $users
        // ]);

        return Inertia::render('Game', [
            'game' => $game,
        ]);

    }

    public function showGame($lobbyId)
    {
        \Log::info("Attempting to find game for lobby: " . $lobbyId);
        
        $game = Game::where('lobby_id', $lobbyId)->first();
        
        if (!$game) {
            \Log::warning("No game found for lobby: " . $lobbyId);
            return response()->json(['message' => 'Game not found'], 404);
        }
    
        // return response()->json([
        //     'game' => $game,
        // ]);
        return Inertia::render('Game', [
            'game' => $game,
        ]);
    }
}
