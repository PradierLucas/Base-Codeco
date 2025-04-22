<?php

namespace App\Http\Controllers;
use App\Models\Componentes;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class ApiFrontController extends Controller
{
    public function getComponentePorNombre(Request $request): JsonResponse
    {
        $nombre = $request->query('nombre');
        $url = $request->query('url');
        $nombreBoton = $request->query('nombreBoton');
    
        // Depuración
        if (!$nombre) {
            return response()->json(['error' => 'El parámetro "nombre" es obligatorio.'], 400);
        }
    
        try {
            $existe = Componentes::where('nombre', $nombre)->exists();
    
            if ($existe) {
                $componente = Componentes::where('componentes.nombre', $nombre)->first();
                $response = [
                    'nombre' => $componente->nombre,
                    'sn_modal' => $componente->sn_modal,
                    'url' => $componente->url,
                    'componente_activo' => $componente->sn_activo,
                    'nombre_boton' => $componente->componente_item_proceso,
                ];
            } else {
                $response = [
                    'nombre' => $nombre,
                    'sn_modal' => empty($url),
                    'url' => $url ?? '',
                    'componente_activo' => true,
                    'nombre_boton' => $nombreBoton,
                ];
            }
    
            return response()->json(['componente' => $response]);
        } catch (\Exception $e) {
            // Captura cualquier error y regístralo
            Log::error('Error en getComponentePorNombre: ' . $e->getMessage());
            return response()->json(['error' => 'Error interno del servidor.'], 500);
        }
    }
}