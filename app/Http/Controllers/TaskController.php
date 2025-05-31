<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Dotenv\Util\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function index() {
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

    public function store(Request $request){
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

    public function show(string $id) {
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


    public function update(string $id, Request $request)  {
        $task = Task::find($id);
        if (!$task) {
            return response()->json([
                 "success" => false,
                "message" => "Resource not found",
            ], 404);
        }

        //validator
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:100',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,jpg,png',
            'deadline' => 'required|date|after:now',
            'user_id' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
            'status_id' => 'required|exists:task_statuses,id',
            'priority_id' => 'required|exists:priority_levels,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        //data update
        $data = [
            'title' => $request->title,
            'description' => $request->description,
            'deadline' => $request->deadline,
            'user_id' => $request->user_id,
            'category_id' => $request->category_id,
            'status_id' => $request->status_id,
            'priority_id' => $request->priority_id
        ];

        // handle image (upload & delete image)
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image->store('tasks', 'public');

            if ($task->image) {
                Storage::disk('public')->delete('tasks/' . $task->image);
            }
            $data['image'] = $image->hashName();
        }

        $task->update($data);

        // update data baru ke database
        $task->update($data);
        return response()->json([
            "success" => true,
            "message" => "Resource updated successfully!.",
            "data" => $task
        ],200);
    }

    // diguanakan untuk menghapus data
    public function destroy(string $id) {
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
        ],200);

    }
}
