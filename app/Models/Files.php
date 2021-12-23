<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Files extends Model
{
    use HasFactory;

    public $table = 'files';

    public $fillable = [
        'file_name',
        'task_id',
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
