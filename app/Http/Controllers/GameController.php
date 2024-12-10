<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Player;

class GameController extends Controller
{
    public function create()
    {
        $game = Game::create(['status' => 'waiting']);
        return response()->json($game);
    }

    public function joinGame($gameId, Request $request)
    {
        $game = Game::findOrFail($gameId);
        $player = Player::create([
            'name' => $request->name,
            'game_id' => $gameId
        ]);

        if ($game->players()->count() >= 2) {
            $game->status = 'in-progress';
            $game->save();
        }

        return response()->json($player);
    }

    public function startGame($gameId)
    {
        $game = Game::findOrFail($gameId);
        if ($game->status == 'waiting') {
            $game->status = 'in-progress';
            $game->save();
        }
    }
}
