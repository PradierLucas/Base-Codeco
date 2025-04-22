<?php

namespace Database\Seeders;

use App\Models\Perfil;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PerfilSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Perfil::firstOrCreate([
            'nombre'      => 'Facturador',
            'informacion' => '',
            'abreviatura' => 'Facturador',
            'sn_activo'      => true
        ]);
        Perfil::firstOrCreate([
            'nombre'      => 'Usuario CRM',
            'informacion' => '',
            'abreviatura' => 'Usuario CRM',
            'sn_activo'      => true
        ]);
        Perfil::firstOrCreate([
            'nombre'      => 'Administrador',
            'informacion' => '',
            'abreviatura' => 'Administrador',
            'sn_activo'      => true
        ]);
        Perfil::firstOrCreate([
            'nombre'      => 'Configuración',
            'informacion' => '',
            'abreviatura' => 'Configuracion',
            'sn_activo'      => true
        ]);
    }
}
