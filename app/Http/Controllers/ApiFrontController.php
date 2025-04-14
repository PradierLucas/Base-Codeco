<?php

namespace App\Http\Controllers;

use App\Models\condiciontributarias;
use App\Models\fisicojuridicos;
use App\Models\geopais;
use App\Models\Identidades;
use Database\Seeders\CondiciontributariasSeeder;
use Illuminate\Http\Request;

class ApiFrontController extends Controller
{
    public function index () {
        
        return compact('fisicojuridico','pais','identidades','condicionestributarias');
    }
}