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
        Componentes::create([
            'nombre'      => 'Contactos',
            'descripcion' => '...',
            'sn_activo'      => true,
            'url'         => 'test/contactos'
        ]);
        Componentes::create([
            'nombre'      => 'Radicaciones',
            'descripcion' => '...',
            'sn_activo'      => true,
            'url'         => 'test/radicaciones'
        ]);
        Componentes::create([
            'nombre'      => 'Categorias',
            'descripcion' => '...',
            'sn_activo'      => true,
            'url'         => 'test/categorias'
        ]);
        Componentes::create([
            'nombre'      => 'Agregar',
            'descripcion' => 'LLama a agregar contacto',
            'sn_activo'      => true,
            'url'         => 'test/contactos/agregar'
        ]);
        Componentes::create([
            'nombre'      => 'Factura A',
            'descripcion' => '...',
            'sn_activo'      => true,
            'url'         => 'test/facturaA'
        ]);
        Componentes::create([
            'nombre'      => 'Factura B',
            'descripcion' => '...',
            'sn_activo'      => true,
            'url'         => 'test/facturaB'
        ]);

        Componentes::firstOrCreate([
            'nombre'=> 'Menus',
            'descripcion'=> '...',
            'sn_activo'=> true,
            'url'=> '/menu/vista',
        ]);
        Componentes::firstOrCreate([
            'nombre'=> 'Componentes',
            'descripcion'=> '...',
            'sn_activo'=> true,
            'url'=> '/componente/vista',
        ]);

        Componentes::firstOrCreate([
            'nombre'=> 'Menus Configuración',
            'descripcion'=> '...',
            'sn_activo'=> true,
            'url'=> '/configuracion/menu-componentes',
        ]);

        Componentes::firstOrCreate([
            'nombre'=> 'Perfil Configuración',
            'descripcion'=> '...',
            'sn_activo'=> true,
            'url'=> '/configuracion/perfil-menu',
        ]);

        Componentes::firstOrCreate([
            'nombre'=> 'Perfil - Usuario',
            'descripcion'=> '...',
            'sn_activo'=> true,
            'url'=> '/configuracion/perfil-user',
        ]);

        Componentes::firstOrCreate([
            'nombre'=> 'Usuario - Perfiles',
            'descripcion'=> '...',
            'sn_activo'=> true,
            'url'=> '/configuracion/user-perfiles',
        ]);
    }
}
