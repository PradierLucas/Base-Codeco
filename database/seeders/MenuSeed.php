<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;

class MenuSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Menu::firstOrCreate([
            'nombre'      => 'Gestión de contacto',
            'abreviatura' => 'GC',
            'informacion' => '...',
            'sn_activo'      => true
        ]);
        Menu::firstOrCreate([
            'nombre'      => 'Facturador',
            'abreviatura' => 'FAC',
            'informacion' => '...',
            'sn_activo'      => true
        ]);
        Menu::firstOrCreate([
            'nombre'      => 'Configuración',
            'abreviatura' => 'CONF',
            'informacion' => '...',
            'sn_activo'      => true
        ]);
    }
}
