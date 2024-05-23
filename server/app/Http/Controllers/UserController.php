<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return $users;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return "create";
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validate dữ liệu từ request
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'birthday' => 'required|date',
                'email' => 'required|string|email|max:255|unique:users',
                'phone' => 'required|string|max:15',
                'username' => 'required|string|max:50|unique:users',
                'password' => 'required|string|min:6',
            ]);

            // Tạo một người dùng mới dựa trên dữ liệu được xác thực
            $user = User::create($validatedData);

            // Trả về thông tin của người dùng mới được tạo
            return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
        } catch (\Exception $e) {
            // Xử lý lỗi và trả về thông báo lỗi
            return response()->json(['error' => 'An error occurred while adding user'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return "show";
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return "edit";
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        return "update";
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        return "destroy";
    }
}