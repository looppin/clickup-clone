<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Auth
Route::get('/login', [\App\Http\Controllers\AuthController::class,'index'])->name('login');
Route::get('/logout',[\App\Http\Controllers\AuthController::class,'logout'])->name('logout');
Route::post('progress/login',[\App\Http\Controllers\AuthController::class, 'login'])->name('progress.login');

Route::middleware('auth')->group(function (){
    Route::get('/', [\App\Http\Controllers\DashboardController::class, 'index'])->name('index');
    Route::resource('tasks',\App\Http\Controllers\TasksController::class);
});

Route::get('/admin', [\App\Http\Controllers\AdminController::class, 'index'])->name('admin')->middleware('superrole');
