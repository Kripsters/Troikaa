<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lobby extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'creator_id',
        'code', 
    ];
    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }
}
    