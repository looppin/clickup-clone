<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckLists extends Model
{
    use HasFactory;

    public $table = 'checklists';

    public $fillable = [
        'title',
        'description',
        'status',
        'task_id'
    ];

    public $guarded = [
        'id'
    ];

}
