<?php

namespace Database\Seeders;

use App\Models\Contactosituacionciviles;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContactosituacioncivilesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Contactosituacionciviles::firstOrCreate([
            'id'=>'1',
            'descripcion'=>'...' 
        ]);
        Contactosituacionciviles::firstOrCreate([
            'id'=>'2',
            'descripcion'=>'Soltero/a' 
        ]);
        Contactosituacionciviles::firstOrCreate([
            'id'=>'3',
            'descripcion'=>'Casado/a' 
        ]);
        Contactosituacionciviles::firstOrCreate([
            'id'=>'4',
            'descripcion'=>'Viudo/a' 
        ]);
        Contactosituacionciviles::firstOrCreate([
            'id'=>'5',
            'descripcion'=>'Divorciado/a' 
        ]);
        Contactosituacionciviles::firstOrCreate([
            'id'=>'6',
            'descripcion'=>'Concubino/a' 
        ]);
    }
}
