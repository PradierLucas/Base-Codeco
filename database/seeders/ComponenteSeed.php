<?php

namespace Database\Seeders;

use App\Models\Componentes;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ComponenteSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Componentes::firstOrCreate([
            'nombre'      => 'Contactos',
            'componente_item_proceso' => '...',
            'sn_activo'      => true,
            'url'         => 'test/contactos'
        ]);
        Componentes::firstOrCreate([
            'nombre'      => 'Radicaciones',
            'componente_item_proceso' => '...',
            'sn_activo'      => true,
            'url'         => 'test/radicaciones'
        ]);
        Componentes::firstOrCreate([
            'nombre'      => 'Categorias',
            'componente_item_proceso' => '...',
            'sn_activo'      => true,
            'url'         => 'test/categorias'
        ]);
        Componentes::firstOrCreate([
            'nombre'      => 'Agregar',
            'componente_item_proceso' => 'LLama a agregar contacto',
            'sn_activo'      => true,
            'url'         => 'test/contactos/agregar'
        ]);
        Componentes::firstOrCreate([
            'nombre'      => 'Factura A',
            'componente_item_proceso' => '...',
            'sn_activo'      => true,
            'url'         => 'test/facturaA'
        ]);
        Componentes::firstOrCreate([
            'nombre'      => 'Factura B',
            'componente_item_proceso' => '...',
            'sn_activo'      => true,
            'url'         => 'test/facturaB'
        ]);

        Componentes::firstOrCreate([
            'nombre'=> 'Menus',
            'componente_item_proceso'=> '...',
            'sn_activo'=> true,
            'url'=> '/menu/vista',
        ]);
        Componentes::firstOrCreate([
            'nombre'=> 'Componentes',
            'componente_item_proceso'=> '...',
            'sn_activo'=> true,
            'url'=> '/componente/vista',
        ]);

        Componentes::firstOrCreate([
            'nombre'=> 'Menus Configuración',
            'componente_item_proceso'=> '...',
            'sn_activo'=> true,
            'url'=> '/configuracion/menu-componentes',
        ]);

        Componentes::firstOrCreate([
            'nombre'=> 'Perfil Configuración',
            'componente_item_proceso'=> '...',
            'sn_activo'=> true,
            'url'=> '/configuracion/perfil-menu',
        ]);

        Componentes::firstOrCreate([
            'nombre'=> 'Perfil - Usuario',
            'componente_item_proceso'=> '...',
            'sn_activo'=> true,
            'url'=> '/configuracion/perfil-user',
        ]);

        Componentes::firstOrCreate([
            'nombre'=> 'Usuario - Perfiles',
            'componente_item_proceso'=> '...',
            'sn_activo'=> true,
            'url'=> '/configuracion/user-perfiles',
        ]);
    }
}
