<?php

namespace App\Http\Controllers;

use App\Models\Galery;
use Illuminate\Http\Request;

class GaleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $gale = $request->input('galeries', []);
        $galery = $request->input('galeries');
        $id = $request->input('products_id');
       
        if(isset($galery)){
            Galery::where('products_id', $id)->delete();
            foreach ($request->file('galeries',[]) as $index => $galeryFile) {
                $galeryModel = new Galery();
                
                if (isset($galeryFile['thumbnail'])) {
                    $thumbnailName = time() . '_' . $galeryFile['thumbnail']->getClientOriginalName();
                    $galeryFile['thumbnail']->move(public_path('images'), $thumbnailName);
                    $galeryModel->thumbnail = 'images/' . $thumbnailName;
                }
                $galeryModel->description = $gale[$index]['description'] ?? "";
                $galeryModel->products_id = $request->input('products_id');
                $galeryModel->save();
            }
        }
       

        return response()->json($gale, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Galery $galery)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Galery $galery)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Galery $galery)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Galery $galery)
    {
        //
    }
}