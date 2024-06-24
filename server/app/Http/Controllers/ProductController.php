<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductDetails;
use App\Models\Galery;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $products = Product::with(['brand', 'category', 'details']);

        if ($request->has('search')) {
            $search = $request->input('search');
            $products->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")->orWhere('quantity', '=', $search)
                ->orWhere('prices', 'LIKE', "%{$search}%")->orWhereHas('brand', function ($query) use ($search) {
                        $query->where('name', 'LIKE', "%{$search}%");
                    })
                    ->orWhereHas('category', function ($query) use ($search) {
                        $query->where('category_name', 'LIKE', "%{$search}%");
                    });
            });
        }

        $products = $products->orderBy('created_at', 'desc')->get();

        return response()->json($products);
    }
    
    public function updateTotal(Request $request)
    {
        $details = $request->input('details');
        if(isset($details)){
            foreach ($details as $detail) {
                $product = Product::find($detail['products_id']);
                if($product){
                    $product->update([   
                        'quantity' => $detail['total'] 
                    ]);
                }
            }  
        }
       
        return response()->json($details);
    }
    
    public function updateTotal2(Request $request)
    {
        $details = $request->input('details');
        if (isset($details)) {
            foreach ($details as $billDetails) {
                foreach ($billDetails as $detail) {
                   
                    $product = Product::where('name', $detail['name'])->first();
                    if ($product) {
                        $product->update([
                            'quantity' => $product->quantity + $detail['total']
                        ]);
                    }
                }
            }
        }

        return response()->json($details);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }
    public function getProductsByCategory($categoryId = null)
    {
        if ($categoryId) {
            $products = Product::where('product_categories_id', $categoryId)->orderBy('created_at', 'desc')->get();
        } else {
            $products = Product::orderBy('created_at', 'desc')->get();
        }
        
        return response()->json($products);
    }
    public function getProductsNew()
    {
        $products = Product::orderBy('created_at', 'desc')->take(10)->get();
        return response()->json($products);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:products,name',
            'description' => 'required|string',
            'prices' => 'required|numeric',
            'quantity' => 'required|integer',
            'brands_id' => 'required|exists:brands,brands_id',
            'product_categories_id' => 'required|exists:product_categories,product_categories_id'
        ]);
        $product = new Product();
        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->prices = $request->input('prices');
        $product->quantity = $request->input('quantity');
        $product->brands_id = $request->input('brands_id');
        $product->product_categories_id = $request->input('product_categories_id');
        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $product->image = 'images/' . $imageName;
        }
        $product->save();
        $detail = $request->input('details');
        if(isset($detail)){
            foreach ($request->input('details') as $detail) {
                $productDetail = new ProductDetails();
                $productDetail->name = $detail['name'];
                $productDetail->description = $detail['description'];
                $productDetail->products_id = $product->products_id;
                $productDetail->save();
            }  
        }
        $gale = $request->input('galeries', []);
        $galery = $request->input('galeries');
        if(isset($galery)){
            foreach ($request->file('galeries') as $index => $galeryFile) {
                $galeryModel = new Galery();
                
                if (isset($galeryFile['thumbnail'])) {
                    $thumbnailName = time() . '_' . $galeryFile['thumbnail']->getClientOriginalName();
                    $galeryFile['thumbnail']->move(public_path('images'), $thumbnailName);
                    $galeryModel->thumbnail = 'images/' . $thumbnailName;
                }
                
                $galeryModel->description = $gale[$index]['description'] ?? "";
                $galeryModel->products_id = $product->products_id;
                $galeryModel->save();
            }
        }
        
        return response()->json($product, 201);
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Retrieve the product with its related brand, category, details, and galleries
        $product = Product::with(['brand', 'category', 'details', 'galeries'])->findOrFail($id);

        // Return the product data as a JSON response
        return response()->json($product);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateproduct(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:products,name,' . $id . ',products_id',
            'description' => 'required|string',
            'prices' => 'required|numeric',
            'quantity' => 'required|integer',
            'brands_id' => 'required|exists:brands,brands_id',
            'product_categories_id' => 'required|exists:product_categories,product_categories_id',
            'details.*.name' => 'string',
            'details.*.description' => 'string',
        ]);
      
        $requestData = $request->all();
        $product = Product::findOrFail($id);
        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->prices = $request->input('prices');
        $product->quantity = $request->input('quantity');
        $product->brands_id = $request->input('brands_id');
        $product->product_categories_id = $request->input('product_categories_id');
        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $product->image = 'images/' . $imageName;
        }
        $product->save();
        $details = $request->input('details', []);
        if(isset($details)){
            ProductDetails::where('products_id', $id)->delete();
            foreach ($details as $detail) {
                $productDetail = new ProductDetails();
                $productDetail->name = $detail['name'];
                $productDetail->description = $detail['description'];
                $productDetail->products_id = $id;
                $productDetail->save();
            }
        }
        return response()->json($product);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $delete = Product::destroy($id);
        ProductDetails::where('products_id', $id)->delete();
        Galery::where('products_id', $id)->delete();
        return response()->json($delete);
    }
}