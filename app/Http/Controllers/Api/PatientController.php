<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePatientRequest;
use App\Http\Resources\PatientResource;
use App\Services\PatientService;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PatientController extends Controller
{
    public function __construct(private readonly PatientService $patientService)
    {
    }

    public function index(): AnonymousResourceCollection
    {
        return PatientResource::collection($this->patientService->paginate());
    }

    public function store(StorePatientRequest $request): PatientResource
    {
        $patient = $this->patientService->create($request->validated());

        return new PatientResource($patient);
    }

    public function show(int $patient): PatientResource
    {
        return new PatientResource($this->patientService->findOrFail($patient));
    }
}
