<?php

namespace App\Repositories\Eloquent;

use App\Models\Patient;
use App\Repositories\Contracts\PatientRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PatientRepository implements PatientRepositoryInterface
{
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return Patient::query()->latest('id')->paginate($perPage);
    }

    public function create(array $attributes): Patient
    {
        return Patient::query()->create($attributes);
    }

    public function findById(int $id): ?Patient
    {
        return Patient::query()->find($id);
    }
}
