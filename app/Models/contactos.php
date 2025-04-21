<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contactos extends Model
{
    use HasFactory;
    protected $fillable = [
        'uuid',
        'id_fisicojuridico',
        'id_pais',
        'car',
        'tratamiento',
        'apellidorazonsocial',
        'nombrefantasia',
        'nombresegundo',
        'apellidoynombre',
        'id_nacionalidad',
        'fechanacimiento',
        'fechafallecimiento',
        'id_situacioncivil',
        'id_personal',
        'id_personal_dato',
        'id_condiciontributaria',
        'id_identidadtributaria',
        'id_identidadtributaria_dato',
        'observacion',
        'fecha_form_alta',
        'fecha_form_modificacion',
        'fecha_vigenciahasta',
        'patronbusqueda',
        'id_estado',
        'sn_activo',
        'id_user_created_at',
        'id_user_updated_at',
    ];

    // Define las relaciones aquí

    public function condicionTributaria()
    {
        return $this->belongsTo(condiciontributarias::class, 'id_condiciontributaria');
    }

    public function estado()
    {
        return $this->belongsTo(ContactoEstado::class, 'id_estado');
    }

    public function fisicoJuridico()
    {
        return $this->belongsTo(fisicojuridicos::class, 'id_fisicojuridico');
    }

    public function identidad()
    {
        return $this->belongsTo(Identidades::class, 'id_identidadtributaria');
    }

    public function nacionalidad()
    {
        return $this->belongsTo(Geopais::class, 'id_nacionalidad');
    }

    public function personal ()
    {
        return $this->belongsTo(Identidades::class,'id_personal');
    }

    public function situacionCivil()
    {
        return $this->belongsTo(contactosituacionciviles::class, 'id_situacioncivil');
    }

    public function userCreated()
    {
        return $this->belongsTo(User::class, 'id_user_created_at');
    }

    public function userUpdated()
    {
        return $this->belongsTo(User::class, 'id_user_updated_at');
    }




}
