<?php

namespace Database\Seeders;

use App\Models\Condiciontributarias;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CondiciontributariasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Condiciontributarias::firstOrCreate([
            'id'=>'1',
            'descripcion'=>'<No informado>',
            'abreviatura'=>'<Ni info.>',
            'sn_identidadtributaria'=>false,
            'sn_condiciontributaria'=>true,
            'id_tributaria_afip'=>8,
            'sn_registrosistema'=>true,
        ]);
        Condiciontributarias::firstOrCreate([
            'id'=>'2',
            'descripcion'=>'IVA Responsable Inscripto',
            'abreviatura'=>'IVA R.I',
            'sn_identidadtributaria'=>true,
            'sn_condiciontributaria'=>true,
            'id_tributaria_afip'=>1,
            'sn_registrosistema'=>true,
        ]);
        Condiciontributarias::firstOrCreate([
            'id'=>'3',
            'descripcion'=>'IVA Responsable no Inscripto',
            'abreviatura'=>'IVA R.N.I',
            'sn_identidadtributaria'=>true,
            'sn_condiciontributaria'=>false,
            'id_tributaria_afip'=>2,
            'sn_registrosistema'=>true,
        ]);
        Condiciontributarias::firstOrCreate([
            'id'=>'4',
            'descripcion'=>'IVA no Responsable',
            'abreviatura'=>'IVA N.R',
            'sn_identidadtributaria'=>true,
            'sn_condiciontributaria'=>false,
            'id_tributaria_afip'=>3,
            'sn_registrosistema'=>true,
        ]);
        Condiciontributarias::firstOrCreate([
            'id'=>'5',
            'descripcion'=>'IVA Sujeto Exento',
            'abreviatura'=>'Exento',
            'sn_identidadtributaria'=>true,
            'sn_condiciontributaria'=>true,
            'id_tributaria_afip'=>4,
            'sn_registrosistema'=>true,
        ]);
        Condiciontributarias::firstOrCreate([
            'id'=>'6',
            'descripcion'=>'Consumidor Final',
            'abreviatura'=>'C.F',
            'sn_identidadtributaria'=>false,
            'sn_condiciontributaria'=>true,
            'id_tributaria_afip'=>5,
            'sn_registrosistema'=>true,
        ]);        
        Condiciontributarias::firstOrCreate([
            'id'=>'7',
            'descripcion'=>'Responsable Monotributo',
            'abreviatura'=>'R.M',
            'sn_identidadtributaria'=>true,
            'sn_condiciontributaria'=>true,
            'id_tributaria_afip'=>6,
            'sn_registrosistema'=>true,
        ]);        
        Condiciontributarias::firstOrCreate([
            'id'=>'8',
            'descripcion'=>'Sujeto no Categorizado',
            'abreviatura'=>'SNC',
            'sn_identidadtributaria'=>false,
            'sn_condiciontributaria'=>true,
            'id_tributaria_afip'=>7,
            'sn_registrosistema'=>true,
        ]);        
        Condiciontributarias::firstOrCreate([
            'id'=>'9',
            'descripcion'=>'Proveedor del Exterior',
            'abreviatura'=>'Prov.Ext.',
            'sn_identidadtributaria'=>true,
            'sn_condiciontributaria'=>false,
            'id_tributaria_afip'=>8,
            'sn_registrosistema'=>true,
        ]);        
        Condiciontributarias::firstOrCreate([
            'id'=>'10',
            'descripcion'=>'Cliente del Exterior',
            'abreviatura'=>'Clie.Ext.',
            'sn_identidadtributaria'=>true,
            'sn_condiciontributaria'=>false,
            'id_tributaria_afip'=>9,
            'sn_registrosistema'=>true,
        ]);        
        Condiciontributarias::firstOrCreate([
            'id'=>'11',
            'descripcion'=>'IVA Liberado Ley N° 19.640',
            'abreviatura'=>'IVA Ley 19640',
            'sn_identidadtributaria'=>true,
            'sn_condiciontributaria'=>false,
            'id_tributaria_afip'=>10,
            'sn_registrosistema'=>true,
        ]);        
        Condiciontributarias::firstOrCreate([
            'id'=>'12',
            'descripcion'=>'IVA Responsable Inscripto Agente de Percepción',
            'abreviatura'=>'IVA R.I Ag.Per.',
            'sn_identidadtributaria'=>true,
            'sn_condiciontributaria'=>false,
            'id_tributaria_afip'=>11,
            'sn_registrosistema'=>true,
        ]);        
        Condiciontributarias::firstOrCreate([
            'id'=>'13',
            'descripcion'=>'Pequeño Contribuyente Eventual',
            'abreviatura'=>'Cont.Event.',
            'sn_identidadtributaria'=>true,
            'sn_condiciontributaria'=>false,
            'id_tributaria_afip'=>12,
            'sn_registrosistema'=>true,
        ]);        
        Condiciontributarias::firstOrCreate([
            'id'=>'14',
            'descripcion'=>'Monotributista Social',
            'abreviatura'=>'M.Soc.',
            'sn_identidadtributaria'=>true,
            'sn_condiciontributaria'=>false,
            'id_tributaria_afip'=>13,
            'sn_registrosistema'=>true,
        ]);        Condiciontributarias::firstOrCreate([
            'id'=>'15',
            'descripcion'=>'Pequeño Contribuyente Eventual Social',
            'abreviatura'=>'Cont.Event.Soc.',
            'sn_identidadtributaria'=>true,
            'sn_condiciontributaria'=>false,
            'id_tributaria_afip'=>14,
            'sn_registrosistema'=>true,
        ]);
    }
}
