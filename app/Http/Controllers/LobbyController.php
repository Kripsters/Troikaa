<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lobby;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class LobbyController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'creator_id' => 'required|exists:users,id',
        ]);
    
        // Pievieno random 6 ciparu kodu
        $validated['code'] = rand(100000, 999999);
    
        // Izveido jaunu lobby
        $lobby = Lobby::create($validated);
    
        // Atgriežam atbildi ar izveidoto   lobby (ieskaitot 'code')
        return response()->json($lobby, 201);  // Atgriež arī code
    }


    public function show($id)
    {
        // Iegūst lobby datus pēc ID
        $lobby = Lobby::find($id);

        // Ja lobby nav atrasts, atgriež 404 kļūdu
        if (!$lobby) {
            return response()->json(['message' => 'Lobby not found'], 404);
        }

        // Atgriež lobby datus (arī code)
        return Inertia::render('LobbyPage', [
            'lobby' => $lobby,  // Pārsūtām lobby datus uz React komponenti
        ]);
        // return response()->json($lobby);
    }



}
