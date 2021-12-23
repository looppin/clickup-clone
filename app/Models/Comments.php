<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    use HasFactory;

    public $table = 'comments';

    public $fillable = [
        'task_id',
        'user_id',
        'comment'
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
