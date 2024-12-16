<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function createdLobbies()
    {
        return $this->hasMany(Lobby::class, 'creator_id');
    }   

    // App\Models\User.php
    public function lobbies()
    {
        return $this->belongsToMany(Lobby::class, 'lobby_user')
            ->withPivot('status') // Include the status field from the pivot table
            ->withTimestamps();
    }
    public function games()
    {
        return $this->belongsToMany(Game::class, 'game_user')
            ->withPivot('role', 'status', 'score', 'player_state')
            ->withTimestamps();
    }

    public function activeGames()
    {
        return $this->games()->where('games.status', 'in_progress');
    }

}
