<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePatientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'patient_id' => ['required', 'string', 'max:50'],
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'gender' => ['required', 'in:MALE,FEMALE,OTHER'],
            'date_of_birth' => ['required', 'date'],
            'doctor_reference' => ['required', 'string', 'max:120'],
            'mobile_number' => ['required', 'string', 'max:20'],
        ];
    }
}
