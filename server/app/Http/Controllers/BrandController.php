<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Product;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $brand = Brand::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $brand->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%");
            });
        }
    
        $brand = $brand->withCount('products')->get();
       
        return response()->json($brand);

        
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
        $request->validate([
            'name' => 'required|string|max:100|unique:brands,name',
            'address' => 'required|string',
        ]);

        $brand = new Brand();
        $brand->name = $request->input('name');
        $brand->address = $request->input('address');
        $brand->save();

        return response()->json($brand, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'category_name' => 'required|string|max:100|unique:brands,name,' . $id . ',brands_id',
            'address' => 'required|string|max:100',
        ]);

        $brand = Brand::findOrFail($id);
        $brand->name = $request->input('name');
        $brand->address = $request->input('address');
        $brand->save();

        return response()->json($brand, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $brand = Brand::findOrFail($id);
        
        // Kiểm tra nếu danh mục có sản phẩm
        if (Product::where('brands_id', $id)->exists()) {
            return response()->json(['error' => 'Thương hiệu này đang có sản phẩm'],404);
        }

        $brand->delete();

        return response()->json(null, 204);
    }
}