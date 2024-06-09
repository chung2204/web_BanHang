<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = ProductCategory::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $categories->where(function ($q) use ($search) {
                $q->where('category_name', 'LIKE', "%{$search}%");
            });
        }
    
        $categories = $categories->withCount('products')->get();
       
        return response()->json($categories);

        
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
            'category_name' => 'required|string|max:100|unique:product_categories,category_name',
        ]);
        $category = new ProductCategory();
        $category->category_name = $request->input('category_name');
        $category->save();

        return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show( $id)
    {
        $show = ProductCategory::findOrFail($id);
        return response()->json($show);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductCategory $productCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'category_name' => 'required|string|max:100|unique:product_categories,category_name,' . $id . ',product_categories_id',
        ]);

        $category = ProductCategory::findOrFail($id);
        $category->category_name = $request->input('category_name');
        $category->save();

        return response()->json($category, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = ProductCategory::findOrFail($id);
        
        // Kiểm tra nếu danh mục có sản phẩm
        if (Product::where('product_categories_id', $id)->exists()) {
            return response()->json(['error' => 'Danh mục này đang có sản phẩm'],404);
        }

        $category->delete();

        return response()->json(null, 204);
    }
}