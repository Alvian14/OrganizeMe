<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Dotenv\Util\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function index()
    {
        $task = Task::with('user', 'category', 'status', 'priority')->get();

        if ($task->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resource data not found!",
                "data" => null
            ], 200);
        }

        return response()->json([
            "success" => true,
            "message" => "Get All Resource",
            "data" => $task
        ], 200);
    }

    public function store(Request $request)
    {
        //validator
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:100',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,jpg,png',
            'deadline' => 'required|date|after:now',
            'user_id' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
            'status_id' => 'required|exists:task_statuses,id',
            'priority_id' => 'required|exists:priority_levels,id',
        ]);

        //cek validator
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        //upload image
        $image = $request->file('image');
        $image->store('tasks', 'public');

        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $image->hashName(),
            'deadline' => $request->deadline,
            'user_id' => $request->user_id,
            'category_id' => $request->category_id,
            'status_id' => $request->status_id,
            'priority_id' => $request->priority_id
        ]);

        // response
        return response()->json([
            "success" => true,
            "message" => "Resource added successfully!",
            "data" => $task
        ], 201);
    }

    public function show(string $id)
    {
        $task = Task::with('user', 'category', 'status', 'priority')->find($id);

        // respone untuk data tidak ditemukan
        if (!$task) {
            return response()->json([
                "success" => false,
                "message" => "Resource not found",
            ], 404);
        }

        // response data ditemukan
        return response()->json([
            "success" => true,
            "message" => "Get detail resource",
            "data" => $task
        ], 200);
    }


    public function update(string $id, Request $request)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                "success" => false,
                "message" => "User not found!",
            ], 404);
        }

        // Validasi input
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:50',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'image' => 'nullable|image|mimes:jpg,jpeg,png',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        // Data yang akan diupdate
        $data = [
            'username' => $request->username,
            'email' => $request->email,
        ];

        // Jika ada file image yang diupload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image->store('users', 'public');

            // Hapus gambar lama jika ada
            if ($user->image) {
                Storage::disk('public')->delete('users/' . $user->image);
            }

            $data['image'] = $image->hashName();
        }

        // Update ke database
        $user->update($data);

        return response()->json([
            "success" => true,
            "message" => "User updated successfully!",
            "data" => $user
        ], 200);
    }


    // diguanakan untuk menghapus data
    public function destroy(string $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json([
                "success" => false,
                "message" => "Resource not found.",
                "data" => $task
            ], 200);
        }

        if ($task->image) {
            Storage::disk('public')->delete('tasks/' . $task->image);
        }

        $task->delete();
        return response()->json([
            "success" => true,
            "message" => "Delete resource successfully!.",
        ], 200);
    }


    // TaskController.php
    public function getTasksByUserId($id)
    {
        $user = User::with('tasks')->find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found',
                'data' => null
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Tasks retrieved successfully',
            'data' => $user->tasks
        ]);
    }
}
