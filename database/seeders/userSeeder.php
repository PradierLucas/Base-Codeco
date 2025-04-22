<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class userSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate([
            'name'        =>'Codeco',
            'email'       =>'codeco@admin.com',
            'password'    =>'codeco',
            'super_admin' => true,
            'sn_activo'      => true,
        ]);
        User::firstOrCreate([
            'name'    =>'Thyago',
            'email'   =>'thyagotest@codeco.com',
            'password'=>'123456',
            'sn_activo'  => true,
        ]);
        User::firstOrCreate([
            'name'    =>'Lucas',
            'email'   =>'lucastest@codeco.com',
            'password'=>'654321',
            'sn_activo'  => true,
        ]);
    }
}
