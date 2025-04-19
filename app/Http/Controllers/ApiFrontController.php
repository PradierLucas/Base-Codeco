<?php

namespace App\Http\Controllers;

use App\Models\Componentes;
use Dotenv\Util\Str;
use Illuminate\Console\View\Components\Component;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Composer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ApiFrontController extends Controller
{


    public function getComponentesSnModal() : JsonResponse{
        $usuarioSesion = Auth::user();

            $data = Componentes::leftJoin('users_componentes_excepcion', function ($join) use ($usuarioSesion) {
                $join->on('componentes.id', '=', 'users_componentes_excepcion.id_componente')
                    ->where('users_componentes_excepcion.id_user', $usuarioSesion->id);
            })
            ->select('componentes.*', DB::raw('CASE WHEN users_componentes_excepcion.id_componente IS NULL THEN 0 ELSE 1 END as exceptuado'))
            ->get();
        
            $response = $data->filter(function($componentes) {
                return $componentes->sn_activo == 1;
            })->mapToGroups(function($componentes) {
                return [
                    $componentes->nombre => [
                        'nombre' => $componentes->nombre,
                        'sn_modal' => $componentes->sn_modal,
                        'url' => $componentes->url,
                        'exceptuado' => $componentes->exceptuado,
                    ]
                ];
            })->toArray();
    
    return response()->json(['componentes' => $response]);
    }



    public function getComponentePorNombre(string $nombre, ?string $url = null, ?string $nombreBoton = null) : JsonResponse {
        $existe=Componentes::where('nombre', $nombre)->exists();

        if($existe){
            $componente=Componentes::where('componentes.nombre', $nombre)->get();
            $response = $componente->map(function($componente) {
                return [
                    'nombre' => $componente->nombre,
                    'sn_modal' => $componente->sn_modal,
                    'url' => $componente->url,
                    'componente_activo' => $componente->sn_activo,
                    'nombre_boton'=>$componente->componente_item_proceso
                ];
            })->first(); // Obtener el primer resultado (ya que es un filtro por nombre)
        }else{
            if(empty($url)){
            $response = [
                'nombre'=>$nombre,
                'sn_modal'=>true,
                'url'=>'',
                'componente_activo'=>true,
                'nombre_boton'=>$nombreBoton,
            ];;
        }else{
            $response = [
                'nombre'=>$nombre,
                'sn_modal'=>false,
                'url'=>$url,
                'componente_activo'=>true,
                'nombre_boton'=>$nombreBoton,
            ];
        }
        }
        return response()->json(['componente'=>$response]);
    }
}