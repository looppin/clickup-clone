<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tags extends Model
{
    use HasFactory;

    public $table = 'tags';

    public $fillable = [
        'title',
        'user_id'
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
