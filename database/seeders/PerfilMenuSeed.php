<?php

namespace Database\Seeders;

use App\Models\Menu;
use App\Models\Perfil;
use App\Models\PerfilMenu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PerfilMenuSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Perfil: Usuario crm Menu: Gestion Contacto
        PerfilMenu::create([
            'id_perfil' => Perfil::find(2)->id,
            'id_menu'   => Menu::find(1)->id,
            'sn_activo'    => true
        ]);
        //Perfil: Facturador Menu: Facturador
        PerfilMenu::create([
            'id_perfil' => Perfil::find(1)->id,
            'id_menu'   => Menu::find(2)->id,
            'sn_activo'    => true
        ]);
        PerfilMenu::firstOrCreate([
            'id_perfil' => Perfil::find(3)->id,
            'id_menu'   => Menu::find(3)->id,
            'sn_activo'    => true
        ]);
    }


}
