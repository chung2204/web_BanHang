<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

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
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'birthday' => 'required|date',
                'email' => 'required|string|max:255',
                'phone' => 'required|string|max:15',
                'username' => 'required|string|max:50',
                'password' => 'required|string|min:6',
            ]);

         
            $user = User::create($validatedData);

            return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
        } catch (\Exception $e) {
            Log::error('Error adding user: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while adding ', 'details' => $e->getMessage()], 500);
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