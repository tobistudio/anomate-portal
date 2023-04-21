<?php

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Here we proxy all the api calls to the Infomaniak API using the developer token that is located in the .env file.
|
| All the parameters are accepted after the /api/ and proxied to Infomaniak to handle the requests. 
| Example: get domain/api/shop/events/ matches https://etickets.infomaniak.com/api/shop/events
| Accepted methods aget,post,put,patch,delete,options
|
*/

Route::group(['prefix'=>'api'], function () {
    // other routes
    Route::get('{any}',[ApiController::class,'get'])->where('any','.*');
    Route::post('{any}',[ApiController::class,'post'])->where('any','.*');
    Route::put('{any}',[ApiController::class,'put'])->where('any','.*');
    Route::patch('{any}',[ApiController::class,'patch'])->where('any','.*');
    Route::delete('{any}',[ApiController::class,'delete'])->where('any','.*');
    Route::options('{any}',[ApiController::class,'options'])->where('any','.*');
});