<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    /*
    * 
    * Retorna: los perfiles del usuario junto con los menus del perfil y los componentes exceptuados para el usuario
    *
    */

    
    public function getExcepcionesPorUser(): JsonResponse {
        $usuarioSesion = Auth::user();

        $usuario = User::with([
            'componentesExcepcion' => function ($query) {
                $query->where('sn_habilitado', 0);
            },
        ])->findOrFail($usuarioSesion->id);

        $response = $usuario->componentesExcepcion->map(function ($excepcion) {
            return [
                'componente' => $excepcion->nombre,
            ];
        })->toArray();

        return response()->json($response);
    }


    public function getPerfilesMenusComponentesByUser(): JsonResponse
    {
        $usuarioSesion = Auth::user();

        $usuario = User::with([
            'perfiles' => function ($query) {
                $query->where('perfiles.sn_activo', 1); // Solo perfiles activos
            },
            'perfiles.menus' => function ($query) {
                $query->where('menus.sn_activo', 1); // Solo menús activos
            },
            'perfiles.menus.componentes' => function ($query) use ($usuarioSesion) {
                $query->where('componentes.sn_activo', 1) // Solo componentes activos
                    ->whereDoesntHave('usersExcepcion', function ($subQuery) use ($usuarioSesion) {
                        $subQuery->where('users_componentes_excepcion.id_user', $usuarioSesion->id)
                            ->where(function ($condition) {
                                $condition->whereNull('users_componentes_excepcion.sn_habilitado')
                                    ->orWhere('users_componentes_excepcion.sn_habilitado', '!=', 1);
                            });
                    });
            }
        ])->findOrFail($usuarioSesion->id);

        // Filtrar perfiles que tengan al menos un menú activo
        $response = $usuario->perfiles->filter(function ($perfil) {
            return $perfil->menus->contains('sn_activo', 1);
        })->map(function ($perfil) {
            return [
                'menus' => $perfil->menus->filter(function ($menu) {
                    return $menu->sn_activo == 1;
                })->map(function ($menu) {
                    return [
                        'menu' => $menu->nombre,
                        'menu-info' => $menu->informacion,
                        'componentes' => $menu->componentes->pluck('url', 'nombre')->toArray(),
                    ];
                })->toArray(),
            ];
        });

        return response()->json($response);
    }
}
