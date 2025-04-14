<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Perfil extends Model
{
    protected $table = 'perfiles';
    protected $fillable = [
        'nombre',
        'informacion',
        'abreviatura',
        'sn_activo'
    ];

    public function menus()
    {
        return $this->belongsToMany(Menu::class, 'perfiles_menus', 'id_perfil', 'id_menu')
            ->wherePivot('sn_activo', true);
    }
    public function users()
    {
        return $this->belongsToMany(User::class, 'users_perfiles', 'id_perfil', 'id_user')
            ->withPivot('sn_activo');
    }
}
