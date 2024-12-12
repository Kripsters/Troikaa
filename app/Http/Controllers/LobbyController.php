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

    public function deleteByUser($userId)
    {
        try {
            // Izdzēš visas lobby, kur creator_id atbilst userId
            Lobby::where('creator_id', $userId)->delete();

            return response()->json([
                'message' => 'All lobbies created by the user have been deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while deleting lobbies.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteLobbiesByCreator(Request $request)
    {
        // Validējam ievadi, lai nodrošinātu, ka tiek padots derīgs creator_id
        $validated = $request->validate([
            'creator_id' => 'required|exists:users,id',
        ]);

        $creatorId = $validated['creator_id'];

        try {
            // Dzēšam visus ierakstus no "lobbies", kur creator_id sakrīt
            $deletedCount = Lobby::where('creator_id', $creatorId)->delete();

            return response()->json([
                'message' => "Deleted $deletedCount lobbies created by user with ID $creatorId",
                'deleted_count' => $deletedCount
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while deleting lobbies.',
                'error' => $e->getMessage()
            ], 500);
        }
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
        return Inertia::render('GamePage', [
            'lobby' => $lobby,  // Pārsūtām lobby datus uz React komponenti
        ]);
        // return response()->json($lobby);
    }


    public function findByCode($code)
    {
        // Search for the lobby by the given code
        $lobby = Lobby::where('code', $code)->first();

        if ($lobby) {
            return response()->json([
                'id' => $lobby->id,
                'name' => $lobby->name,
                'creator_id' => $lobby->creator_id,
            ]);
        } else {
            return response()->json(['message' => 'Lobby not found'], 404);
        }
    }
    public function index()
    {
        // Retrieve all lobbies with their creators, ordered by most recent first
        $lobbies = Lobby::with('creator')
            ->orderBy('created_at', 'desc')
            ->paginate(10);
            return Inertia::render('LobbiesIndex', [
                'lobbies' => $lobbies,  // Pārsūtām lobby datus uz React komponenti
            ]);
        // return response()->json($lobbies);
    }


}
