<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('lobby_id');
            $table->string('status')->default('in_progress');
            $table->integer('round_number')->default(1);
            $table->unsignedBigInteger('current_player_id')->nullable();  // Ensuring the correct type
            $table->json('game_state')->nullable(); // For storing complex game state
            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();

            $table->timestamps();

            // Foreign key constraints
            $table->foreign('lobby_id')
                  ->references('id')
                  ->on('lobbies')
                  ->onDelete('cascade');
            
            $table->foreign('current_player_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('games');
    }
};
