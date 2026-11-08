import { useForm } from 'vee-validate'
import { formValidationSchema } from './validationSchema'

export function useDetailsForm() {
  const {handleSubmit, resetForm} = useForm({
  validationSchema: formValidationSchema,
  validateOnBlur: true,
  validateOnInput: false,
  validateOnChange: false,
  validateOnModelUpdate: false,
  initialValues: {
    name: '',
    email: '',
    phone: '',
    message: ''
  }
})

 
  return {
    handleSubmit,
    resetForm,
  
  }
}