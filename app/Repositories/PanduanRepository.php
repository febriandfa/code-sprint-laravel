<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class PanduanRepository
{
    public function getAll()
    {
        return DB::table('panduans')->get();
    }

    public function getById(string $id)
    {
        return DB::table('panduans')->where('id', $id)->first();
    }

    public function getByRole(string $role)
    {
        return DB::table('panduans')->where('role', $role)->first();
    }

    public function update(array $data, string $id)
    {
        return DB::table('panduans')->where('id', $id)->update($data);
    }
}
