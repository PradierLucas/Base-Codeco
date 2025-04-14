<?php

use App\Http\Controllers\EtiquetasController;
use App\Http\Controllers\MenuComponentesController;
use App\Http\Controllers\PerfilMenuController;
use App\Http\Controllers\PerfilUserController;
use App\Http\Controllers\UserPerfilController;
use App\Models\PerfilMenu;
use Illuminate\Support\Facades\Route;

Route::prefix('configuracion')->middleware('auth')->group(function () {

    /*
    *
    RUTAS MENU-COMPONENTES
    *
    */
    Route::prefix('menu-componentes')->group(function () {
        Route::get('', [MenuComponentesController::class, 'tratamientoMenuComponentes'])->name('menucomponentes.tratamiento');
        Route::get('/search-menus', [MenuComponentesController::class, 'searchMenus']);
        Route::get('/search-componentes', [MenuComponentesController::class, 'searchComponentes']);
        Route::get('/{menuId}/componentes', [MenuComponentesController::class, 'getMenuComponentes']);
        Route::post('/actualizar', [MenuComponentesController::class, 'actualizar'])
            ->name('menucomponentes.actualizar');
        Route::post('/agregar', [MenuComponentesController::class, 'agregarComponente'])
            ->name('menucomponentes.agregar');
    });

    /*
    *   
    RUTAS PERFIL-MENU   
    *
    */
    Route::prefix('perfil-menu')->group(function () {
        Route::get('', [PerfilMenuController::class, 'tratamientoPerfilMenu'])->name('perfilmenu.tratamiento');
        Route::get('/search-menus', [PerfilMenuController::class, 'searchMenus']);
        Route::get('/search-perfil', [PerfilMenuController::class, 'searchPerfil']);
        Route::post('/', [PerfilMenuController::class, 'store'])->name('perfilmenu.store');
        Route::get('/perfil-menu-data', [PerfilMenuController::class, 'getAllPerfilMenuData']);
        Route::get('/perfil-nulls', [PerfilMenuController::class, 'getPerfilesWithNullRelation']);
    });


    /*
    *   
    RUTAS PERFIL-USER
    *
    */
    Route::prefix('perfil-user')->group(function () {
        Route::get('', [PerfilUserController::class, 'tratamientoPerfilUsers'])->name('perfiluser.tratamiento');
        Route::get('/{perfilId}/users', [PerfilUserController::class, 'getPerfilUser']);
        Route::get('/search-perfil', [PerfilUserController::class, 'searchPerfil']);
        Route::get('/search-user', [PerfilUserController::class, 'searchUser']);
        Route::post('/', [PerfilUserController::class, 'store'])->name('perfiluser.store');
        Route::get('/perfil-user-data', [PerfilUserController::class, 'getAllPerfilUserData']);
        Route::post('/actualizar', [PerfilUserController::class, 'actualizar'])
            ->name('perfiluser.actualizar');
        Route::post('/agregar', [PerfilUserController::class, 'agregarComponente'])
            ->name('perfiluser.agregar');
    });

    /*
    *   
    RUTAS USER-PERFILES
    *
    */
    Route::prefix('user-perfiles')->group(function () {
        Route::get('', [UserPerfilController::class, 'tratamientoUserPerfiles'])->name('userperfil.tratamiento');
        Route::get('/{userId}/perfiles', [UserPerfilController::class, 'getUserPerfiles']);
        Route::get('/search-user', [UserPerfilController::class, 'searchUser']);
        Route::post('/', [UserPerfilController::class, 'store'])->name('perfiluser.store');
        Route::get('/user-perfil-data', [UserPerfilController::class, 'getAllUserPerfilesData']);
        Route::post('/actualizar', [UserPerfilController::class, 'actualizar'])
            ->name('userperfil.actualizar');
    });
});
