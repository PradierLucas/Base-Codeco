<?php

namespace App\Http\Controllers;

use App\Models\Componentes;
use App\Models\Menu;
use App\Models\MenuComponente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MenuComponentesController extends Controller
{
    public function tratamientoMenuComponentes()
    {
        $menus = Menu::all();
        $componentes = Componentes::all();
        return Inertia::render('MenuComponentes/Tratamiento', compact('menus', 'componentes'));
    }

    public function searchMenus(Request $request)
    {
        $query = $request->input('query');
        $page = $request->input('page', 1);

        $results = Menu::where('nombre', 'like', "%$query%")
            ->paginate(5, ['*'], 'page', $page)
            ->appends(['query' => $query]);
        return response()->json($results);
    }
    public function searchComponentes(Request $request)
    {
        $query = $request->input('query');
        $page = $request->input('page', 1);

        $results = Componentes::where('nombre', 'like', "%$query%")
        ->where('sn_modal', false)
            ->paginate(5, ['*'], 'page', $page)
            ->appends(['query' => $query]);

        return response()->json($results);
    }

    public function getMenuComponentes($menuId)
{
    $menu = Menu::with(['componentes' => function ($query) {
        $query->select('componentes.*')
            ->withPivot('sn_activo', 'orden')
            ->orderBy('menus_componentes.orden', 'asc');
    }])->find($menuId);
    return response()->json($menu->componentes);
}

    
public function actualizar(Request $request)
{
    $menuId = $request->input('id_menu');
    $componentes = $request->input('componentes');
    $componentesActivos = $request->input('componentesActivos');
    $componentesOrden = $request->input('componentesOrden');

    if (!$menuId || !$componentes) {
        return response()->json(['error' => 'Datos incompletos'], 400);
    }

    // Combinar los datos de componentes con sus estados y órdenes
    foreach ($componentes as $componente) {
        $componenteId = $componente['id'];

        // Obtener los valores de orden y sn_activo
        $orden = $componentesOrden[$componenteId] ?? 0;
        $sn_activo = $componentesActivos[$componenteId] ?? false;

        DB::table('menus_componentes')
            ->updateOrInsert(
                [
                    'id_menu' => $menuId,
                    'id_componente' => $componenteId
                ],
                [
                    'orden' => $orden,
                    'sn_activo' => $sn_activo
                ]
            );
    }
}

public function agregarComponente(Request $request)
{


        $menuId = $request->id_menu;
        $componenteId = $request->id_componente;


        $ultimoOrden = MenuComponente::where('id_menu', $menuId)
            ->max('orden');

        $menuComponente = MenuComponente::create([
            'id_menu' => $menuId,
            'id_componente' => $componenteId,
            'sn_activo' => true,
            'orden' => ($ultimoOrden ?? 0) + 1
        ]);

        return back();

}
}
