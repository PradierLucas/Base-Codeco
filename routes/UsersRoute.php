<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/componentes', [UserController::class, 'getPerfilesMenusComponentesExceptuadosByUser'])->middleware(['auth', 'verified']);
Route::get('/user/perfil-menu-componentes', [UserController::class, 'getPerfilesMenusComponentesByUser'])->middleware(['auth', 'verified']);