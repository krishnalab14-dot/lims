<?php

namespace App\Services;

use App\Models\Patient;
use App\Repositories\Contracts\PatientRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PatientService
{
    public function __construct(private readonly PatientRepositoryInterface $patients)
    {
    }

    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return $this->patients->paginate($perPage);
    }

    public function create(array $payload): Patient
    {
        return $this->patients->create($payload);
    }

    public function findOrFail(int $id): Patient
    {
        $patient = $this->patients->findById($id);

        abort_if(!$patient, 404, 'Patient not found');

        return $patient;
    }
}
