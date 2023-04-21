<?php

use App\Http\Controllers\AppController;
use Illuminate\Http\Request;
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


// Default router
// To load the application view.
Route::get('/',[AppController::class,'get'])->where('any','.*');
Route::get('/app',[AppController::class,'get'])->where('any','.*');
Route::get('app/{any}',[AppController::class,'get'])->where('any','.*');