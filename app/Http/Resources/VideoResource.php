<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VideoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'thumbnailUrl' => $this->thumbnailUrl,
            'videoUrl' => $this->videoUrl,
            'duration' => $this->duration,
            'views' => $this->views,
            'uploadDate' => $this->uploadDate,
            'author' => $this->author,
            'category' => $this->category,
            'tags' => $this->tags,  
        ];
    }
}
