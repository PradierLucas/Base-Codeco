<?php

namespace Database\Seeders;

use App\Models\Geopais;
use App\Models\Identidades;
use Illuminate\Database\Seeder;

class IdentidadesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pais=Geopais::find(14);

        Identidades::firstOrCreate([
            'id'=>'1',
            'descripcion'=>'<Sin Informar>',
            'abreviatura'=>'S/Info',
            'dato_mascara'=>'A',
            'dato_default'=>'0',
            'sn_fisica'=>true,
            'sn_juridica'=>true,
            'sn_identidadtributaria'=>false,
            'sn_activo'=>true,
            'sn_registrosistema'=>true,
            'id_pais'=>1,
        ]);
        Identidades::firstOrCreate([
            'id'=>'2',
            'descripcion'=>'CUIT',
            'abreviatura'=>'CUIT',
            'dato_mascara'=>'99-99999999-9',
            'dato_default'=>'00-00000000-0',
            'sn_fisica'=>true,
            'sn_juridica'=>true,
            'sn_identidadtributaria'=>true,
            'sn_activo'=>true,
            'sn_registrosistema'=>false,
            'id_pais'=> 14,
        ]);
        Identidades::firstOrCreate([
            'id'=>'3',
            'descripcion'=>'DNI',
            'abreviatura'=>'DNI',
            'dato_mascara'=>'99999999',
            'dato_default'=>'0',
            'sn_fisica'=>true,
            'sn_juridica'=>false,
            'sn_identidadtributaria'=>false,
            'sn_activo'=>true,
            'sn_registrosistema'=>false,
            'id_pais'=> 14,
        ]);
        Identidades::firstOrCreate([
            'id'=>'4',
            'descripcion'=>'CUIL',
            'abreviatura'=>'CUIL',
            'dato_mascara'=>'99-99999999-9',
            'dato_default'=>'00-00000000-0',
            'sn_fisica'=>true,
            'sn_juridica'=>false,
            'sn_identidadtributaria'=>false,
            'sn_activo'=>true,
            'sn_registrosistema'=>false,
            'id_pais'=> 14,
        ]);
        
    }
}
