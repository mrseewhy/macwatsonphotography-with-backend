<?php

use App\Http\Controllers\DronesController;
use App\Http\Controllers\LandingPageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\PortraitsController;
use App\Http\Controllers\PrintsController;
use App\Http\Controllers\PublishedWorksController;
use App\Http\Controllers\StoriesController;
use App\Http\Controllers\UsersController;

// Route::get('/', function () {
//     return Inertia::render('noauth/Home');
// })->name('home');

Route::get('/', [PagesController::class, 'home'])->name('home');
Route::get('/about', [PagesController::class, 'about'])->name('about');
Route::get('/contact', [PagesController::class, 'contact'])->name('contact');
Route::get('/stories', [PagesController::class, 'stories'])->name('stories');
Route::get('/drone', [PagesController::class, 'drone'])->name('drone');
Route::get('/published', [PagesController::class, 'published'])->name('published');
Route::get('/prints', [PagesController::class, 'prints'])->name('prints');
Route::get('/portraits', [PagesController::class, 'portraits'])->name('portraits');

Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function () {
    Route::get('/', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('/users', UsersController::class)->names('users');
    Route::resource('/landing', LandingPageController::class)->names('landing');
    Route::resource('/stories', StoriesController::class)->names('stories');
    Route::resource('/published', PublishedWorksController::class)->names('published');
    Route::resource('/portraits', PortraitsController::class)->names('portraits');
    Route::resource('/drones', DronesController::class)->names('drones');
    Route::resource('/prints', PrintsController::class)->names('prints');
});



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
