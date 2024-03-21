import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  //Fields 
  firstnames: string;
  surname: string;
  registrationnumber:number;
  status:string;
  categoriesofpractice: string;
  subcategories:string;
  
}

interface Props {
  handleClose: () => void;
}

const ApplicationForLicenseForm: React.FC<Props> = ({ handleClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    field1: '',
    field2: '',
   
    // Initialize more fields
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    handleClose(); // Close dialog after form submission
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div>
      <h2>License Application Form {step}</h2>
      {step === 1 && (
        <form onSubmit={nextStep}>
          {/* Step 1 form fields */}
          <input type="text" name="firstnames" value={formData.firstnames} onChange={handleChange} />
          <input type="text" name="surname" value={formData.field1} onChange={handleChange} />
          <button type="submit">Next</button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleSubmit}>
          {/* Step 2 form fields */}
          <input type="text" name="field2" value={formData.field2} onChange={handleChange} />
          <button type="button" onClick={prevStep}>Previous</button>
          <button type="submit">Submit</button>
        </form>
      )}
      {/* Add more steps as needed */}
    </div>
  );
};

export default ApplicationForLicenseForm;
