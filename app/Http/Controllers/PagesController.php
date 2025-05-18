<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;


class PagesController extends Controller
{
    //
    public function home()
    {
        return Inertia::render('noauth/Home');
    }
    public function about()
    {
        return Inertia::render('noauth/About');
    }
    public function contact()
    {
        return Inertia::render('noauth/Contact');
    }
    public function stories()
    {
        return Inertia::render('noauth/Stories');
    }
    public function drone()
    {
        return Inertia::render('noauth/Drone');
    }
    public function published()
    {
        return Inertia::render('noauth/Published');
    }
    public function prints()
    {
        return Inertia::render('noauth/Print');
    }
    public function portraits()
    {
        return Inertia::render('noauth/Portraits');
    }
}
