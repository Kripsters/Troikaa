<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = [
        'lobby_id', 
        'status', 
        'round_number', 
        'current_player_id', 
        'game_state', 
        'started_at', 
        'ended_at'
    ];

    // Cast JSON and timestamp fields
    protected $casts = [
        'game_state' => 'array',
        'started_at' => 'datetime',
        'ended_at' => 'datetime'
    ];

    // Relationships
    public function lobby()
    {
        return $this->belongsTo(Lobby::class); // Adjust according to your database structure
    }

    public function currentPlayer()
    {
        return $this->belongsTo(User::class, 'current_player_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'game_user')
            ->withPivot('role', 'status', 'score', 'player_state')
            ->withTimestamps();
    }

    // Scope to find active games
    public function scopeActive($query)
    {
        return $query->where('status', 'in_progress');
    }

    // Method to check if game is over
    public function isGameOver()
    {
        return $this->status === 'completed';
    }

    // Method to get winner
    public function getWinner()
    {
        return $this->users()->wherePivot('status', 'winner')->first();
    }
}