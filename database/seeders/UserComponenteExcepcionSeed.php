<?php

namespace Database\Seeders;

use App\Models\Componentes;
use App\Models\User;
use App\Models\UserComponenteExcepcion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserComponenteExcepcionSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserComponenteExcepcion::firstOrCreate([
            'id_user'      => User::find(3)->id,
            'id_componente'=> Componentes::find(2)->id
        ]);
        //Caso de ejemplo para probar que se obtiene el perfil y el menu independientemente si existe una restriccion de componentes
        //UserComponenteExcepcion::firstOrCreate([
        //    'id_user'      => User::find(3)->id,
        //    'id_componente'=> Componente::find(6)->id
        //]);
        //UserComponenteExcepcion::firstOrCreate([
        //    'id_user'      => User::find(3)->id,
        //    'id_componente'=> Componente::find(4)->id
        //]);
    }
}
