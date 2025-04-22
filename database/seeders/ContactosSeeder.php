<?php

namespace Database\Seeders;

use App\Models\Contactos;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContactosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Contactos::firstOrCreate([
            'nombresegundo'=>'...',
            'apellidorazonsocial'=>'...',
            'apellidoynombre'=>'...',
            'id_nacionalidad'=>1,
            'fechanacimiento'=>null,
            'fechafallecimiento'=>null,
            'id_situacioncivil'=>1,
            'id_personal'=>1,
            'id_personal_dato'=>0,
            'id_condiciontributaria'=>1,
            'id_identidadtributaria_dato'=>0,
            'mail_tipo'=>null,
            'mail_direccion'=>null,
            'telefono_tipo'=>null,
            'telefono_numero'=>null,
            'telefono_sn_movil'=>0,
            'observacion'=>null,
            'nota'=>null,
            'id_provincia'=>1,
            'id_subregion'=>1,
            'direccion_calle'=>null,
            'id_departamento_ciudad'=>1,
            'departamento_ciudad'=>null,
            'id_localidad'=>1,
            'localidad'=>null,
            'codigo_postal'=>null,
            'domicilioformateado'=>null,
            'foto'=>null,
            'fecha_form_alta'=>null,
            'fecha_form_modificacion'=>null,
            'fecha_vigenciahasta'=>null,
            'patronbusqueda'=>null,
            'id_estado'=>1,
            'sn_activo'=>true,
            'uuid'=>'00000000-0000-0000-0000-000000000001',
        ]);
    }
}
