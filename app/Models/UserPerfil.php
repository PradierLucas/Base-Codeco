<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPerfil extends Model
{
    protected $table = "users_perfiles";
    protected $fillable = [
        'user_id',
        'perfil_id',
        'sn_activo'
    ];
}
