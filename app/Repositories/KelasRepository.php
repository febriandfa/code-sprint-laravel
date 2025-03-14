<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class KelasRepository
{
    public function create(array $data)
    {
        return DB::table('kelases')->insertGetId($data);
    }

    public function update(array $data, string $id)
    {
        return DB::table('kelases')->where('id', $id)->update($data);
    }

    public function delete(string $id)
    {
        return DB::table('kelases')->where('id', $id)->delete();
    }
}
