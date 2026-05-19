import { PatientRegistrationForm } from '../../modules/patients/types';

type PatientRegistrationFormProps = {
  defaultValues: PatientRegistrationForm;
};

export function PatientRegistrationFormView({ defaultValues }: PatientRegistrationFormProps) {
  return (
    <section>
      <h2>Patient Registration Form</h2>
      <form>
        <input defaultValue={defaultValues.firstName} placeholder='First name' />
        <input defaultValue={defaultValues.lastName} placeholder='Last name' />
        <input defaultValue={defaultValues.dateOfBirth} placeholder='YYYY-MM-DD' />
        <input defaultValue={defaultValues.gender} placeholder='Gender' />
        <input defaultValue={defaultValues.doctorReference} placeholder='Doctor reference' />
        <input defaultValue={defaultValues.mobileNumber} placeholder='Mobile number' />
        <input defaultValue={defaultValues.address} placeholder='Address' />
        <input defaultValue={defaultValues.emergencyContactName} placeholder='Emergency contact name' />
        <input defaultValue={defaultValues.emergencyContactRelation} placeholder='Emergency contact relation' />
        <input defaultValue={defaultValues.emergencyContactMobile} placeholder='Emergency contact mobile' />
      </form>
    </section>
  );
}
