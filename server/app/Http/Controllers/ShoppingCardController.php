<?php

namespace App\Http\Controllers;

use App\Models\ShoppingCard;
use Illuminate\Http\Request;
use App\Models\ShoppingCardItem;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ShoppingCardController extends Controller
{
    public function addItem(Request $request)
    {
        // Lấy users_id từ request
        $users_id = $request->input('users_id');

        // Kiểm tra xem users_id có tồn tại không
        if (!$users_id) {
            return response()->json(['message' => 'User ID not provided'], 400);
        }

        // Tìm hoặc tạo giỏ hàng cho người dùng hiện tại
        $shoppingCard = ShoppingCard::firstOrCreate(['users_id' => $users_id]);

        // Thêm sản phẩm vào giỏ hàng hoặc cập nhật nếu sản phẩm đã có trong giỏ
        $item = ShoppingCardItem::updateOrCreate(
            [
                'shopping_cards_id' => $shoppingCard->shopping_cards_id,
                'products_id' => $request->input('products_id')
            ],
            [
                'name_product' => $request->input('name_product'),
                'prices' => $request->input('prices'),
                'image' => $request->input('image'),
                'total_product' =>  $request->input('total_product'),
                'total' => \DB::raw('total + ' . $request->input('total'))
            ]
        );

        // Cập nhật tổng số lượng sản phẩm và tổng giá trị giỏ hàng
        $shoppingCard->total_product += $request->input('total');
        $shoppingCard->total_prices += $request->input('total') * $request->input('prices');
        $shoppingCard->save();

        return response()->json(['shoppingCard' => $shoppingCard, 'message' => 'Item added successfully']);
    }

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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ShoppingCard $shoppingCard)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ShoppingCard $shoppingCard)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ShoppingCard $shoppingCard)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ShoppingCard $shoppingCard)
    {
        //
    }
    public function deleteCard($id)
    {
        $delete = ShoppingCard::destroy($id);
        return response()->json($delete);
    }
    public function showShoppingCardDetail($users_id)
    {
        
        $shoppingCard = ShoppingCard::where('users_id', $users_id)->first();

        if (!$shoppingCard) {
            return response()->json(null);
        }
        $shoppingCardItems = ShoppingCardItem::where('shopping_cards_id', $shoppingCard->shopping_cards_id)->get();
        return response()->json($shoppingCardItems);
    }
    public function showShoppingCard($users_id)
    {
        $shoppingCard = ShoppingCard::where('users_id', $users_id)->first();
        return response()->json($shoppingCard);
    }

    public function updateItem(Request $request ,$itemId)
    {
        $userId = $request->input('users_id');
        if (!$userId) {
            return response()->json(['message' => 'User ID not provided'], 400);
        }
    
        $shoppingCard = ShoppingCard::where('users_id', $userId)->first();
    
        if (!$shoppingCard) {
            return response()->json(['message' => 'Shopping card not found'], 404);
        }
    
        $item = $shoppingCard->items()->where('shopping_card_items_id', $itemId)->first();
        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }
    
        $item->total = $request->input('total');
        $item->save();
    
        // Cập nhật tổng số sản phẩm và giá
        $shoppingCard->total_product = $shoppingCard->items()->sum('total');
        $shoppingCard->total_prices = $shoppingCard->items()->sum(DB::raw('total * prices'));
        $shoppingCard->save();
    
        return response()->json(['shoppingCard' => $shoppingCard, 'message' => 'Item updated successfully']);
        
    }

    public function removeItem($itemId, Request $request)
    {
        $userId = $request->input('users_id');
        if (!$userId) {
            return response()->json(['message' => 'User ID not provided'], 400);
        }
    
        $shoppingCard = ShoppingCard::where('users_id', $userId)->first();
    
        if (!$shoppingCard) {
            return response()->json(['message' => 'Shopping card not found'], 404);
        }
    
        $item = $shoppingCard->items()->where('shopping_card_items_id', $itemId)->first();
        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }
    
        $item->delete();
    
        // Cập nhật tổng số sản phẩm và giá
        $shoppingCard->total_product = $shoppingCard->items()->sum('total');
        $shoppingCard->total_prices = $shoppingCard->items()->sum(DB::raw('total * prices'));
        $shoppingCard->save();
    
        return response()->json(['shoppingCard' => $shoppingCard, 'message' => 'Item removed successfully']);
    }
}