<?php

namespace Database\Seeders;

use App\Models\Geoprovinciasregiones;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GeoprovinciasregionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Geoprovinciasregiones::firstOrCreate([
                'descripcion'=>'prueba',
                'abreviatura'=>'prb',
                'sn_activo'=>true,
                'provincia_iso2'=>'14',
                'sn_registrosistema'=>true,
                'sn_id_departamento'=>true,
                'id_departamento_predetermindo'=>'14',
                'id_pais'=>'14',
        ]);
    }
}
