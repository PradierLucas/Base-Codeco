<?php

namespace Database\Seeders;

use App\Models\Perfil;
use App\Models\User;
use App\Models\UserPerfil;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserPerfilSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Usuario Thyago perfil Facturador
        UserPerfil::firstOrCreate(
            [
                'id_user'    => User::find(2)->id,
                'id_perfil'  => Perfil::find(1)->id,
                'sn_activo'     => true
            ]
        );
        UserPerfil::firstOrCreate(
            [
                'id_user'    => User::find(2)->id,
                'id_perfil'  => Perfil::find(3)->id,
                'sn_activo'     => true
            ]
        );
        // Lucas perfil Usuario CRM
        UserPerfil::firstOrCreate(
            [
                'id_user'    => User::find(3)->id,
                'id_perfil'  => Perfil::find(2)->id,
                'sn_activo'     => true
            ]
        );
        // Lucas perfil Facturador
        UserPerfil::firstOrCreate(
            [
                'id_user'    => User::find(3)->id,
                'id_perfil'  => Perfil::find(1)->id,
                'sn_activo'     => true
            ]
        );
    }
}
