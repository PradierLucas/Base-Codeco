<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserComponenteExcepcion extends Model
{
    protected $table = 'users_componentes_excepcion';

    public function componente()
    {
        return $this->belongsTo(Componentes::class, 'id_componente');
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}
