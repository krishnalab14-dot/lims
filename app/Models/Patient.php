<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $table = 'patients';

    protected $fillable = [
        'patient_id',
        'first_name',
        'last_name',
        'gender',
        'date_of_birth',
        'doctor_reference',
        'mobile_number',
    ];
}
