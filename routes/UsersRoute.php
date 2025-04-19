<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/excepciones', [UserController::class, 'getExcepcionesPorUser'])->middleware(['auth', 'verified']);
Route::get('/user/perfil-menu-componentes', [UserController::class, 'getPerfilesMenusComponentesByUser'])->middleware(['auth', 'verified']);