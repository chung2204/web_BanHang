<?php

namespace App\Http\Controllers;

use App\Models\ShopOrders;
use App\Models\ShopOrderDetails;
use Illuminate\Http\Request;

class ShopOrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $bill = ShopOrders::with(['orderdetails']);

        if ($request->has('search')) {
            $search = $request->input('search');
            $bill->where(function ($q) use ($search) {
                $q->where('full_name', 'LIKE', "%{$search}%")->orWhere('status_order', 'LIKE', "%{$search}%");
            });
        }

        $bill = $bill->orderBy('created_at', 'desc')->get();

        return response()->json($bill);
    }
    public function addOrder(Request $request)
    {
        $order = new ShopOrders();
        $order->date_order = $request->input('date_order');
        $order->full_name = $request->input('full_name');
        $order->email = $request->input('email');
        $order->phone = $request->input('phone');
        $order->address = $request->input('address');
        $order->total_prices = $request->input('total_prices');
        $order->total_product = $request->input('total_product');
        $order->status_order = $request->input('status_order');
        $order->users_id  = $request->input('users_id');
     
        $order->save();
        $detail = $request->input('details');
        if(isset($detail)){
            foreach ($request->input('details') as $detail) {
                $orderDetail = new ShopOrderDetails();
                $orderDetail->name_product = $detail['name_product'];
                $orderDetail->image = $detail['image'];
                $orderDetail->prices = $detail['prices'];
                $orderDetail->total_product = $detail['total_product'];
                $orderDetail->shop_orders_id  = $order->shop_orders_id ;
                $orderDetail->products_id  = $detail['products_id'];
                $orderDetail->save();
            }  
        }
      
        return response()->json($order, 201);
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
    public function show($id = null)
    { 
        
        $order = ShopOrders::with(['orderdetails'])->where('users_id', $id)->orderBy('created_at', 'desc')->get();
     
        return response()->json($order);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ShopOrders $shopOrders)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $bill = ShopOrders::findOrFail($id);
        $bill->update([
            'status_order' => $request->input('status_order'),
        ]);

        return response()->json($bill);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $delete = ShopOrders::destroy($id);
        return response()->json($delete);
    }
}