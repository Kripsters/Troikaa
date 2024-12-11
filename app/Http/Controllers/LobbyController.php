<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lobby;

class LobbyController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'creator_id' => 'required|exists:users,id',
        ]);

        $lobby = Lobby::create($validated);

        return response()->json($lobby, 201);
    }
}
    