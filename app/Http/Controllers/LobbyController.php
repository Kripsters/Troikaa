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
        // Validate the request with new configuration options
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'creator_id' => 'required|exists:users,id',
            'max_players' => 'integer|min:2|max:4|nullable',
            'spectate_allowed' => 'boolean|nullable',
            'is_private' => 'boolean|nullable',
            'game_ranking' => 'in:ranked,unranked|nullable'
        ]);
    
        // Generate a unique 6-digit code
        $validated['code'] = Lobby::generateUniqueCode();
        
        // Set default values if not provided
        $validated['max_players'] = $validated['max_players'] ?? 4;
        $validated['current_players'] = 1; // Start with creator
        $validated['status'] = 'waiting';
        $validated['spectate_allowed'] = $validated['spectate_allowed'] ?? true;
        $validated['is_private'] = $validated['is_private'] ?? false;
        $validated['game_ranking'] = $validated['game_ranking'] ?? 'unranked';
        $validated['round_number'] = 0;
    
        // Create new lobby
        $lobby = Lobby::create($validated);

            // Automatically add the creator to the `lobby_user` table
    \DB::table('lobby_user')->insert([
        'lobby_id' => $lobby->id,
        'user_id' => $lobby->creator_id,
        'status' => 'waiting',
        'created_at' => now(),
        'updated_at' => now(),
    ]);
    
    
        // Return the created lobby
        return response()->json($lobby, 201);
    }

    public function index()
    {
        // Retrieve lobbies with their creators, ordered by most recent first
        $lobbies = Lobby::with('creator')
            ->orderBy('created_at', 'desc')
            ->paginate(9); // Adjusted to match the grid layout

        return Inertia::render('LobbiesIndex', [
            'lobbies' => $lobbies,
        ]);
    }

    public function show($id)
    {
        // Find the lobby with its creator
        $lobby = Lobby::with('players')->findOrFail($id);

        return Inertia::render('LobbyPage', [
            'lobby' => $lobby,
        ]);
                // return response()->json($lobby);
    }

    public function findByCode($code)
    {
        // Search for the lobby by the given code
        $lobby = Lobby::where('code', $code)->firstOrFail();

        return response()->json([
            'id' => $lobby->id,
            'name' => $lobby->name,
            'creator_id' => $lobby->creator_id,
            'max_players' => $lobby->max_players,
            'current_players' => $lobby->current_players,
            'spectate_allowed' => $lobby->spectate_allowed,
            'is_private' => $lobby->is_private,
            'game_ranking' => $lobby->game_ranking,
        ]);
    }

    public function deleteByUser($userId)
    {
        $deletedCount = Lobby::where('creator_id', $userId)->delete();

        return response()->json([
            'message' => "Deleted $deletedCount lobbies created by user with ID $userId",
            'deleted_count' => $deletedCount
        ], 200);
    }


    public function joinLobby($lobbyId)
{
    // Get the current user
    $user = auth()->user();
    
    // Find the lobby
    $lobby = Lobby::findOrFail($lobbyId);

    // Check if the lobby is full
    if ($lobby->current_players >= $lobby->max_players) {
        return response()->json(['message' => 'Lobby is full'], 400);
    }

    // Start a transaction to ensure both operations succeed
    \DB::beginTransaction();

    try {
        // Increment the current players count
        $lobby->increment('current_players');

        // Add the user to the lobby_user table
        \DB::table('lobby_user')->insert([
            'lobby_id' => $lobby->id,
            'user_id' => $user->id,
            'status' => 'waiting',  // Default status, can be updated later based on game progress
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Commit the transaction
        \DB::commit();

        return response()->json(['message' => 'Successfully joined the lobby'], 200);
    } catch (\Exception $e) {
        // Rollback the transaction if something goes wrong
        \DB::rollBack();
        return response()->json(['message' => 'Failed to join the lobby'], 500);
    }
}
public function leaveLobby($lobbyId)
{
    // Get the current user
    $user = auth()->user();

    // Find the lobby
    $lobby = Lobby::findOrFail($lobbyId);

    // Check if the user is in the lobby
    $userInLobby = \DB::table('lobby_user')
        ->where('lobby_id', $lobby->id)
        ->where('user_id', $user->id)
        ->exists();

    if (!$userInLobby) {
        return response()->json(['message' => 'You are not part of this lobby'], 400);
    }

    // Start a transaction to ensure both operations succeed
    \DB::beginTransaction();

    try {
        // Decrement the current players count
        $lobby->decrement('current_players');

        // Remove the user from the lobby_user table
        \DB::table('lobby_user')
            ->where('lobby_id', $lobby->id)
            ->where('user_id', $user->id)
            ->delete();

        // Check if the current user is the creator of the lobby
        if ($lobby->creator_id === $user->id) {
            // Delete the lobby if the creator leaves
            $lobby->delete();
        }

        // Commit the transaction
        \DB::commit();

        return response()->json(['message' => 'Successfully left the lobby'], 200);
    } catch (\Exception $e) {
        // Rollback the transaction if something goes wrong
        \DB::rollBack();
        return response()->json(['message' => 'Failed to leave the lobby'], 500);
    }
}




}