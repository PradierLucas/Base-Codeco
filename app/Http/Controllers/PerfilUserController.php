<?php

namespace App\Http\Controllers;

use App\Models\Perfil;
use App\Models\User;
use App\Models\UserPerfil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PerfilUserController extends Controller
{
    public function tratamientoPerfilUsers()
    {
        return Inertia::render('PerfilUser/Tratamiento');
    }

    public function searchPerfil(Request $request)
    {
        $query = $request->input('query');
        $page = $request->input('page', 1);

        $results = Perfil::where('nombre', 'like', "%$query%")
            ->paginate(5, ['*'], 'page', $page)
            ->appends(['query' => $query]);
        return response()->json($results);
    }
    public function searchUser(Request $request)
    {
        $query = $request->input('query');
        $page = $request->input('page', 1);

        $results = User::where('name', 'like', "%$query%")
            ->paginate(5, ['*'], 'page', $page)
            ->appends(['query' => $query]);
        return response()->json($results);
    }


    public function getPerfilUser($perfilId)
{
    $perfil = Perfil::with(['users' => function ($query) {
        $query->select('users.*')
            ->withPivot('sn_activo');
            }])->find($perfilId);
    return response()->json($perfil->users);
}

    
public function actualizar(Request $request)
{
    $perfilId = $request->input('id_perfil');
    $users = $request->input('users');
    $relacionesActivas = $request->input('relacionesActivas');

    if (!$perfilId || !$users) {
        return response()->json(['error' => 'Datos incompletos'], 400);
    }

    // Combinar los datos de componentes con sus estados y órdenes
    foreach ($users as $user) {
        $userId = $user['id'];

        // Obtener los valores de orden y sn_activo
        $sn_activo = $relacionesActivas[$userId] ?? false;

        DB::table('users_perfiles')
            ->updateOrInsert(
                [
                    'id_perfil' => $perfilId,
                    'id_user' => $userId
                ],
                [
                    'sn_activo' => $sn_activo
                ]
            );
    }
}

public function agregarUser(Request $request)
{


        $perfilId = $request->id_perfil;
        $userId = $request->id_user;

        $perfilUser = UserPerfil::create([
            'id_perfil' => $perfilId,
            'id_user' => $userId,
            'sn_activo' => true,
        ]);

        return back();

}
}
