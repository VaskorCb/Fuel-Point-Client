import * as yup from 'yup';


export const shopInformationSchema = yup
  .object({
    companyName: yup.string().required('Company name is required'),
    phoneMain: yup.string().required('Main phone number is required'),
    phoneL2: yup.string().default(''),
    email: yup
      .string()
      .email('Please provide a valid email address')
      .required('Email is required'),
    street: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    zipCode: yup.string().required('Zip code is required'),
    fax: yup.string().default(''),
    web: yup.string().required('Website is required'),
    contactName: yup.string().required('Contact name is required'),
    stateRegNo: yup.string().default(''),
    epaNo: yup.string().default(''),
  })
  .required();
