<?php

namespace App\Http\Controllers;

use App\Models\Drones;
use App\Models\Landing;
use App\Models\Portrait;
use Inertia\Inertia;
use App\Models\Story;
use App\Models\Prints;
use App\Models\Published;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class PagesController extends Controller
{
    //
    public function home()
    {
        $images = Landing::latest()->get();
        // dd($prints);
        $images->each(function ($image) {
            if ($image->type !== 'link') {
                $image->path = Storage::url($image->path);
            }
        });
        return Inertia::render('noauth/Home', ['images' => $images]);
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
        $stories  = Story::latest()->get();
        return Inertia::render('noauth/Stories', ['stories' => $stories]);
    }
    public function drone()
    {
        $drones = Drones::latest()->get();
        // dd($prints);
        $drones->each(function ($drone) {
            if ($drone->type !== 'link') {
                $drone->path = Storage::url($drone->path);
            }
        });
        return Inertia::render('noauth/Drone', ['drones' => $drones]);
    }
    public function published()

    {
        $images = Published::latest()->get();
        // dd($prints);
        $images->each(function ($image) {
            if ($image->type !== 'link') {
                $image->path = Storage::url($image->path);
            }
        });
        return Inertia::render('noauth/Published', ['allPublished' => $images]);
    }
    public function prints()
    {
        $prints = Prints::latest()->get();
        // dd($prints);
        $prints->each(function ($print) {
            if ($print->type !== 'link') {
                $print->path = Storage::url($print->path);
            }
        });
        return Inertia::render('noauth/Print', ['prints' => $prints]);
    }
    public function portraits()
    {
        $images = Portrait::latest()->get();
        // dd($prints);
        $images->each(function ($image) {
            if ($image->type !== 'link') {
                $image->path = Storage::url($image->path);
            }
        });
        return Inertia::render('noauth/Portraits', ['portraits' => $images]);
    }
}
