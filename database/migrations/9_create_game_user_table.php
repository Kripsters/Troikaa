<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('game_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('game_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('role', ['player', 'spectator'])->default('player');
            $table->enum('status', ['active', 'eliminated', 'winner'])->default('active');
            $table->integer('score')->default(0);
            $table->json('player_state')->nullable(); // For storing player-specific game data
            $table->timestamps();

            // Unique constraint to prevent duplicate entries
            $table->unique(['game_id', 'user_id']);

           
        });
    }

    public function down()
    {
        Schema::dropIfExists('game_user');
    }
};