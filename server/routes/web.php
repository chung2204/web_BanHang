<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductDetailsController;
use App\Http\Controllers\GaleryController;
use App\Http\Controllers\FeedBackController;
use App\Http\Controllers\ShoppingCardController;
use App\Http\Controllers\ShopOrdersController;

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
Route::put('updateinfo/{id}', [UserController::class, 'updateinfo']);
Route::put('updatepass/{id}', [UserController::class, 'updatepass']);

Route::post('/add-item', [ShoppingCardController::class, 'addItem']);
Route::get('/card/{id}', [ShoppingCardController::class, 'showShoppingCardDetail']);
Route::get('/shopcard/{id}', [ShoppingCardController::class, 'showShoppingCard']);
Route::post('/updatecarditem/{id}', [ShoppingCardController::class, 'updateItem']);
Route::post('/removecarditem/{id}', [ShoppingCardController::class, 'removeItem']);
Route::delete('/deleteCard/{id}', [ShoppingCardController::class, 'deleteCard']);

Route::post('/order', [ShopOrdersController::class, 'addOrder']);
Route::apiResource('shoporder', ShopOrdersController::class);

Route::apiResource('categories', ProductCategoryController::class);
Route::apiResource('brand', BrandController::class);

Route::apiResource('product', ProductController::class);
Route::get('getproduct', [ProductController::class, 'getProductsNew']);
Route::get('getproductbycategory/{categoryId?}', [ProductController::class, 'getProductsByCategory']);
Route::post('updatetotal', [ProductController::class, 'updateTotal']);

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