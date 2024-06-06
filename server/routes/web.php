<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductDetailsController;
use App\Http\Controllers\GaleryController;
use App\Http\Controllers\FeedBackController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/csrf-cookie', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});
Route::apiResource('users', UserController::class);
Route::post('login', [UserController::class, 'login']);
Route::post('logout', [UserController::class, 'logout']);
Route::apiResource('categories', ProductCategoryController::class);
Route::apiResource('brand', BrandController::class);
Route::apiResource('product', ProductController::class);
Route::get('getproduct', [ProductController::class, 'getProductsNew']);
Route::apiResource('product_details', ProductDetailsController::class);
Route::apiResource('galery', GaleryController::class);
Route::apiResource('feedback', FeedBackController::class);
// Route::group(['prefix' => 'users'], function () {
//     Route::get('/', [UserController::class, 'index']);
//     Route::post('/', [UserController::class, 'store']);
//     Route::get('/{id}', [UserController::class, 'show']);
//     Route::put('/{id}', [UserController::class, 'update']);
//     Route::delete('/{id}', [UserController::class, 'destroy']);
// });