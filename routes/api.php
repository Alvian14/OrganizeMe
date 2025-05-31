<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PriorityLevelController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskStatusController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// Route::get('/categories', [CategoryController::class, 'index']);

//api priority
Route::apiResource('/priority', PriorityLevelController::class);

//api statuses
Route::apiResource('/statuses', TaskStatusController::class);

//api task
Route::apiResource('/tasks', TaskController::class);

