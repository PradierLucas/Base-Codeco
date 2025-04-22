<?php

namespace Database\Seeders;

use App\Models\Contactoestado;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContactoestadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Contactoestado::firstOrCreate([
            'descripcion'=>'normal',
            'abreviatura'=>'normal',
            'abreviatura_corta'=>'nml',
            'sn_activo'=> true,
        ]);
    }
}
