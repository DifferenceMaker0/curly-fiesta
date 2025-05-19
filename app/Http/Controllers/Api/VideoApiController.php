<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator; 
use App\Http\Resources\VideoResource;
use App\Models\Video; 

class VideoApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $videos = Video::get();
        if ($videos->count() > 0) {
            return VideoResource::collection($videos);
        } else {
            return response()->json([
                'message' => 'No videos found'
            ], 404);
        }
    } 

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [ 
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'thumbnailUrl' => 'required|string|url',
            'videoUrl' => 'required|string|url',
            'duration' => 'numeric|between:0,999999.99',
            'author' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'uploadDate' => 'required|date',  
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'error' => $validator->messages(),
                'errors' => $validator->errors()
            ], 422);
        }

        $video = Video::create([
            'id' => $request->id,
            'title' => $request->title,
            'description' => $request->description,
            'thumbnailUrl' => $request->thumbnailUrl,
            'videoUrl' => $request->videoUrl,
            'duration' => $request->duration,
            'views' => $request->views,
            'uploadDate' => $request->uploadDate,
            'author' => $request->author,
            'category' => $request->category,
            'tags' => $request->tags
        ]);

        return response()->json([
            'message' => 'Video created successfully',
            'data' => $video
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function show($id)
    public function show(Video $video)
    {
        return new VideoResource($video);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, Video $video)
    {
        $validator = Validator::make($request->all(), [ 
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'thumbnailUrl' => 'required|string|url',
            'videoUrl' => 'required|string|url',
            'duration' => 'numeric|between:0,999999.99',
            'author' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'uploadDate' => 'required|date',  
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'error' => $validator->messages(),
                'errors' => $validator->errors()
            ], 422);
        }

        $video->update([
            'id' => $request->id,
            'title' => $request->title,
            'description' => $request->description,
            'thumbnailUrl' => $request->thumbnailUrl,
            'videoUrl' => $request->videoUrl,
            'duration' => $request->duration,
            'views' => $request->views,
            'uploadDate' => $request->uploadDate,
            'author' => $request->author,
            'category' => $request->category,
            'tags' => $request->tags
        ]);

        return response()->json([
            'message' => 'UPDATED Video successfully',
            'data' => $video
        ], 200);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Video $video)
    {
        $video->delete();
        return response()->json([
            'message' => 'DELETED Video successfully'
        ], 200);
    }
}
