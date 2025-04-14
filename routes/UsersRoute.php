<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/componentes', [UserController::class, 'getPerfilesMenusComponentesExceptuadosByUser'])->middleware(['auth', 'verified']);
Route::get('/componentes/all', [UserController::class, 'getPerfilesMenusComponentesByUser'])->middleware(['auth', 'verified']);