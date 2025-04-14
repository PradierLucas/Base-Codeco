<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserPerfilController extends Controller
{
    public function tratamientoUserPerfiles()
    {

        return Inertia::render('UserPerfiles/Tratamiento');
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

    public function getUserPerfiles($userId)
{
    $user = User::with(['perfiles' => function ($query) {
        $query->select('perfiles.*')
            ->withPivot('sn_activo');
    }])->find($userId);
    return response()->json($user->perfiles);
}

    
public function actualizar(Request $request)
{
    $userId = $request->input('id_user');
    $perfiles = $request->input('perfiles');
    $perfilesActivos = $request->input('perfilesActivos');

    // Combinar los datos de componentes con sus estados y órdenes
    foreach ($perfiles as $perfil) {
        $perfilId = $perfil['id'];

        $sn_activo = $perfilesActivos[$perfilId] ?? false;

        DB::table('users_perfiles')
            ->updateOrInsert(
                [
                    'id_user' => $userId,
                    'id_perfil' => $perfilId
                ],
                [
                    'sn_activo' => $sn_activo
                ]
            );
    }
}

}
