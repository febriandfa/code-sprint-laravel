<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    protected $table = 'user_details';

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }
}
