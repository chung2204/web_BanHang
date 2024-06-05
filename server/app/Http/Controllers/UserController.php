<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('username', 'LIKE', "%{$search}%");
                //   ->orWhere('email', 'LIKE', "%{$search}%");
            });
        }

        $users = $query->get();

        return response()->json($users);
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
                'birthday' => 'date',
                'email' => 'string|max:255',
                'phone' => 'string|max:11',
                'username' => 'required|string|max:50|unique:users,username',
                'password' => 'required|string|min:6',
            ]);
            $birthday = $request->input('birthday');
            $email = $request->input('email');
            $phone = $request->input('phone');
            if(isset($birthday)&& isset($email) &&isset($phone)){
                $user = User::create([
                    'name' => $request->name,
                    'birthday' => $request->birthday,
                    'email' =>  $request->email,
                    'phone' => $request->phone,
                    'username' => $request->username,
                    'password' => Hash::make($request->password),
                ]);
            }else{
                $user = User::create([
                    'name' => $request->name,
                    'birthday' => "1900-01-01",
                    'email' => " ",
                    'phone' =>" ",
                    'username' => $request->username,
                    'password' => Hash::make($request->password),
                ]);
            }
          

            return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
        } catch (\Exception $e) {
            Log::error('Error adding user: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while adding ', 'details' => $e->getMessage()], 500);
        }
    }
    /**
     * Display the specified resource.
     */
    public function show($users_id)
    {
        $show = User::findOrFail($users_id);
        return response()->json($show);
     
    }
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = Auth::user();

            return response()->json([
                'message' => 'Login successful',
                'user' => $user
            ], 200);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logout successful'], 200);
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
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);


        $request->validate([
            'name' => 'required|string|max:255',
            'birthday' => 'required|date',
            'email' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'username' => 'required|string|max:50',
            'password' => 'required|string|min:6',
        ]);

        $user->update([
            'name' => $request->name,
            'birthday' => $request->birthday,
            'email' => $request->email,
            'phone' => $request->phone,
            'username' => $request->username,
            'password' =>Hash::make($request->password),
        ]);

        return response()->json($user);
        
       
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $delete = User::destroy($id);
        return response()->json($delete);
        // if (!$user) {
        //     return response()->json(['error' => 'User not found'], 404);
        // }
    
        // try {
        //     $user->delete();
        //     return response()->json(null, 204);
        // } catch (\Exception $e) {
        //     return response()->json(['error' => 'Failed to delete user'], 500);
        // }
    
    }
}