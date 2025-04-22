<?php

namespace Database\Seeders;

use App\Models\Componentes;
use App\Models\Menu;
use App\Models\MenuComponente;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenuComponenteSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Gestion de contacto - Contactos
        MenuComponente::firstOrCreate([
            'id_menu'       => Menu::find(1)->id,
            'id_componente' => Componentes::find(1)->id,
            'orden'         => 1,
            'sn_activo'        => true
        ]);
        //Gestion de contacto - Radicaciones
        MenuComponente::firstOrCreate([
            'id_menu'       => Menu::find(1)->id,
            'id_componente' => Componentes::find(2)->id,
            'orden'         => 2,
            'sn_activo'        => true
        ]);
        //Gestion de contacto - caregorias
        MenuComponente::firstOrCreate([
            'id_menu'       => Menu::find(1)->id,
            'id_componente' => Componentes::find(3)->id,
            'orden'         => 3,
            'sn_activo'        => true
        ]);
        //Gestion de contacto - Contactos
        MenuComponente::firstOrCreate([
            'id_menu'       => Menu::find(2)->id,
            'id_componente' => Componentes::find(4)->id,
            'orden'         => 1,
            'sn_activo'        => true
        ]);
        //Facturador Factura A
        MenuComponente::firstOrCreate([
            'id_menu'       => Menu::find(2)->id,
            'id_componente' => Componentes::find(5)->id,
            'orden'         => 1,
            'sn_activo'        => true
        ]);
        //Facturador Factura B
        MenuComponente::firstOrCreate([
            'id_menu'       => Menu::find(2)->id,
            'id_componente' => Componentes::find(6)->id,
            'orden'         => 1,
            'sn_activo'        => true
        ]);

        for ($i = 7; $i <= 12; $i++) {
            MenuComponente::firstOrCreate(
                [
                    'id_menu'       => Menu::find(3)->id,
                    'id_componente' => Componentes::find($i)->id,
                ],
                [
                    'orden'     => 1,
                    'sn_activo' => true,
                ]
            );
        }
}
}