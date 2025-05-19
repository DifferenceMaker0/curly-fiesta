<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Video extends Model
{
    use HasFactory, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [ 
        'id', 
        'title',
        'description',
        'thumbnailUrl',
        'videoUrl',
        'duration',
        'views',
        'uploadDate',
        'author',
        'category',
        'tags'
    ];

}
