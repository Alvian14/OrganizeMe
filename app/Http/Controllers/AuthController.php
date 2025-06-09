<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function index()
    {

        $user = User::all();

        if ($user->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resource data not found!",
                "data" => null
            ], 200);
        }

        return response()->json([
            "success" => true,
            "message" => "Get All Resource",
            "data" => $user
        ], 200);
    }

    // fungsi untuk menghapus data
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully'
        ], 200);
    }

    // fungsi untuk update data
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found!',
                'data' => null
            ], 404);
        }

        // Validasi hanya field role
        $request->validate([
            'role' => 'required|string|in:admin,user' // ubah sesuai opsi role yang kamu pakai
        ]);

        // Update hanya role
        $user->role = $request->role;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Role updated successfully',
            'data' => $user
        ], 200);
    }
}
