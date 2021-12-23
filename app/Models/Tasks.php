<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    use HasFactory;

    public $table = 'tasks';

    public $fillable = [
        'user_id',
        'title',
        'description',
        'begins_at',
        'ends_at',
        'status',
        'price'
    ];

    public $guarded = [
        'id'
    ];

    /**
     * Müşteriye bağlı pek çok kullanıcı var
     */
    public function users()
    {
        return $this->hasMany('App\Models\User');
    }

}
