import { shopInformationSchema } from 'validations/general-settings';

describe('shopInformationSchema', () => {
  const validData = {
    companyName: 'VIP Auto Repair',
    phoneMain: '(302) 555-1234',
    phoneL2: '',
    email: 'info@vipautorepair.com',
    street: '123 Mechanic Lane',
    city: 'Wilmington',
    state: 'DE',
    zipCode: '19802',
    fax: '',
    web: 'www.vipautorepair.com',
    contactName: 'John Doe',
    stateRegNo: '',
    epaNo: '',
  };

  it('validates correct data successfully', async () => {
    await expect(shopInformationSchema.validate(validData)).resolves.toBeTruthy();
  });

  it('requires companyName', async () => {
    await expect(
      shopInformationSchema.validate({ ...validData, companyName: '' }),
    ).rejects.toThrow('Company name is required');
  });

  it('requires phoneMain', async () => {
    await expect(
      shopInformationSchema.validate({ ...validData, phoneMain: '' }),
    ).rejects.toThrow('Main phone number is required');
  });

  it('requires a valid email', async () => {
    await expect(
      shopInformationSchema.validate({ ...validData, email: 'not-an-email' }),
    ).rejects.toThrow('Please provide a valid email address');
  });

  it('requires email to be present', async () => {
    await expect(
      shopInformationSchema.validate({ ...validData, email: '' }),
    ).rejects.toThrow('Email is required');
  });

  it('requires street', async () => {
    await expect(
      shopInformationSchema.validate({ ...validData, street: '' }),
    ).rejects.toThrow('Street is required');
  });

  it('requires city', async () => {
    await expect(
      shopInformationSchema.validate({ ...validData, city: '' }),
    ).rejects.toThrow('City is required');
  });

  it('requires state', async () => {
    await expect(
      shopInformationSchema.validate({ ...validData, state: '' }),
    ).rejects.toThrow('State is required');
  });

  it('requires zipCode', async () => {
    await expect(
      shopInformationSchema.validate({ ...validData, zipCode: '' }),
    ).rejects.toThrow('Zip code is required');
  });

  it('requires web', async () => {
    await expect(
      shopInformationSchema.validate({ ...validData, web: '' }),
    ).rejects.toThrow('Website is required');
  });

  it('requires contactName', async () => {
    await expect(
      shopInformationSchema.validate({ ...validData, contactName: '' }),
    ).rejects.toThrow('Contact name is required');
  });

  it('allows optional fields (phoneL2, fax, stateRegNo, epaNo) to be empty', async () => {
    const result = await shopInformationSchema.validate({
      ...validData,
      phoneL2: '',
      fax: '',
      stateRegNo: '',
      epaNo: '',
    });
    expect(result.phoneL2).toBe('');
    expect(result.fax).toBe('');
    expect(result.stateRegNo).toBe('');
    expect(result.epaNo).toBe('');
  });
});
