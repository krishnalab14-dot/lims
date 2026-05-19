<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'patientId' => $this->patient_id,
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'gender' => $this->gender,
            'dateOfBirth' => $this->date_of_birth,
            'doctorReference' => $this->doctor_reference,
            'mobileNumber' => $this->mobile_number,
        ];
    }
}
