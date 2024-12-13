<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LobbySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('lobbies')->insert([
            [
                'name' => 'Lobby 1',
                'code' => rand(100000, 999999),
                'creator_id' => 1, // Assuming user with ID 1 exists
                'max_players' => 4,
                'current_players' => 1,
                'status' => 'waiting',
                'spectate_allowed' => true,
                'is_private' => false,
                'round_number' => 0,
                'game_ranking' => 'unranked',	
                'game_started_at' => null,
                'game_ended_at' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Lobby 2',
                'code' => rand(100000, 999999),
                'creator_id' => 2, // Assuming user with ID 2 exists
                'max_players' => 4,
                'current_players' => 1,
                'status' => 'waiting',
                'spectate_allowed' => false,
                'is_private' => true,
                'round_number' => 0,
                'game_ranking' => 'unranked',
                'game_started_at' => null,
                'game_ended_at' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
