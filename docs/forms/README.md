# Forms Usage Guide

This document describes how forms are built and used in the VIP Shop Management client. It is based on **React Hook Form** with **Yup** for validation and **MUI** components.

---

## Table of Contents

- [Overview](#overview)
- [Two Form Patterns](#two-form-patterns)
- [Simple Form (Single Component)](#1-simple-form-single-component)
- [Nested Form (FormProvider + Child Components)](#2-nested-form-formprovider--child-components)
- [Form Fields Reference](#form-fields-reference)
- [File Structure](#file-structure)

---

## Overview

| Dependency | Purpose |
|------------|---------|
| `react-hook-form` | Form state, validation, and field registration |
| `@hookform/resolvers` | Bridges Yup schemas with React Hook Form |
| `yup` | Validation schema definitions |

---

## Two Form Patterns

We use two main form patterns depending on whether the form lives in one component or is split across multiple child components.

---

## 1. Simple Form (Single Component)

Use when the entire form is in one component (e.g. Shop Information).

### Setup

```tsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { shopInformationSchema, ShopInformationFormValues } from 'validations/general-settings';

const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ShopInformationFormValues>({
    resolver: yupResolver(shopInformationSchema),
    defaultValues: {
      companyName: '',
      email: '',
      // ...
    },
  });

  const onSubmit = (data: ShopInformationFormValues) => {
    console.log(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <StyledTextField
        label="Company name"
        {...register('companyName')}
        error={!!errors.companyName}
        helperText={errors.companyName?.message}
      />
    </Box>
  );
};
```

### Guidelines

- Use `register` for standard MUI `TextField` / `StyledTextField` text inputs.
- Always pass `error` and `helperText` from `formState.errors` for validation feedback.
- Define a validation schema in `src/validations/` and a form values type.
- Wrap the form in a `<Box component="form">` or `<form>` and use `handleSubmit`.

**Example:** `ShopInformationTabPanel.tsx`

---

## 2. Nested Form (FormProvider + Child Components)

Use when the form is split across parent and child components (e.g. Sales Tax).

### Parent Component

```tsx
import { FormProvider, useForm } from 'react-hook-form';
import { SalesTaxFormValues } from 'types/general-settings';

const SalesTax = () => {
  const methods = useForm<SalesTaxFormValues>({
    defaultValues: {
      taxRateConfiguration: { /* ... */ },
      applyTaxes: { /* ... */ },
    },
  });

  const onSubmit = (data: SalesTaxFormValues) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <TaxRateConfiguration taxrateCurrency={taxrateCurrency} />
        <ApplyTaxes taxType={taxType} />
      </Box>
    </FormProvider>
  );
};
```

### Child Components

Use `useFormContext` to access the form in any child under `FormProvider`:

```tsx
import { Controller, useFormContext } from 'react-hook-form';
import { SalesTaxFormValues } from 'types/general-settings';

const TaxRateConfiguration = ({ taxrateCurrency }) => {
  const { control, setValue, unregister } = useFormContext<SalesTaxFormValues>();

  return (
    <Controller
      name="taxRateConfiguration.r1TaxRate.rate"
      control={control}
      render={({ field }) => (
        <NumberTextField {...field} />
      )}
    />
  );
};
```

### Guidelines

- Wrap the form tree with `FormProvider {...methods}`.
- Use `useFormContext<YourFormValues>()` in children.
- Use `Controller` for non-standard inputs (Select, Switch, NumberTextField).
- Use `register` for simple text inputs when used in children.
- Use `watch` for values needed to drive conditional UI.
- Use `setValue` / `unregister` for programmatic changes (e.g. optional fields).

**Examples:** `SalesTax.tsx` (parent), `TaxRateConfiguration.tsx`, `ApplyTaxes.tsx` (children)

---

## Form Fields Reference

### When to Use What

| Input Type | Approach | Example |
|------------|----------|---------|
| Text input (TextField) | `register` | `{...register('companyName')}` |
| Select (MenuItem) | `Controller` | See [Select](#select) |
| Switch | `Controller` | See [Switch](#switch) |
| NumberTextField | `Controller` | See [NumberTextField](#numbertextfield) |
| Conditional / optional fields | `setValue` + `unregister` | See [Optional Fields](#optional-fields) |

### Text Input (register)

```tsx
<StyledTextField
  label="Company name"
  {...register('companyName')}
  error={!!errors.companyName}
  helperText={errors.companyName?.message}
/>
```

### Select (Controller)

```tsx
<Controller
  name="taxRateConfiguration.r1TaxRate.currency"
  control={control}
  render={({ field }) => (
    <StyledTextField {...field} select>
      {options.map((opt) => (
        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
      ))}
    </StyledTextField>
  )}
/>
```

### Switch (Controller)

```tsx
<Controller
  name="applyTaxes.parts.active"
  control={control}
  render={({ field }) => (
    <Switch
      {...field}
      checked={field.value}
      onChange={(e) => {
        field.onChange(e.target.checked);
        if (!e.target.checked) {
          setValue('applyTaxes.parts.taxType', null);
        }
      }}
    />
  )}
/>
```

### NumberTextField (Controller)

```tsx
<Controller
  name="taxRateConfiguration.r1TaxRate.rate"
  control={control}
  render={({ field }) => (
    <NumberTextField variant="custom" size="large" fullWidth {...field} />
  )}
/>
```

### Select with Conditional Disable + "N" for null

When a select is disabled and the value is `null`, display `"N"`:

```tsx
<Controller
  name="applyTaxes.parts.taxType"
  control={control}
  render={({ field }) => (
    <StyledTextField
      {...field}
      select
      disabled={!isActive}
      value={field.value ?? ""}
      SelectProps={{
        displayEmpty: true,
        renderValue: (selected: unknown): React.ReactNode => {
          if (!isActive) return "N";
          if (selected == null || selected === "") return "";
          return String(selected);
        },
      }}
    >
      {taxType.map((type) => (
        <MenuItem key={type} value={type}>{type}</MenuItem>
      ))}
    </StyledTextField>
  )}
/>
```

### Optional Fields (setValue + unregister)

For optional fields shown/hidden by user action:

```tsx
const [showAdditionalTax, setShowAdditionalTax] = useState(false);

const handleAddAdditionalTax = () => {
  setValue('taxRateConfiguration.r2TaxRate.additionalTax', '0.00');
  setShowAdditionalTax(true);
};

const handleRemoveAdditionalTax = () => {
  unregister('taxRateConfiguration.r2TaxRate.additionalTax');
  setShowAdditionalTax(false);
};
```

---

## File Structure

```
src/
├── types/
│   └── general-settings.ts    # Form value interfaces (e.g. SalesTaxFormValues)
├── validations/
│   └── general-settings.ts    # Yup schemas (e.g. shopInformationSchema)
└── components/
    └── sections/
        └── general-settings/
            ├── sales-tax/
            │   ├── SalesTax.tsx           # Parent form (FormProvider)
            │   ├── TaxRateConfiguration.tsx  # Child (useFormContext)
            │   └── ApplyTaxes.tsx         # Child (useFormContext)
            └── shop-information/
                └── ShopInformationTabPanel.tsx  # Simple form (useForm)
```

---

## Quick Checklist

- [ ] Form values type defined in `types/`
- [ ] Validation schema in `validations/` (if using Yup)
- [ ] `FormProvider` when form spans multiple components
- [ ] `Controller` for Select, Switch, NumberTextField
- [ ] `register` for standard text inputs
- [ ] `error` and `helperText` wired to `formState.errors`
- [ ] `handleSubmit` on the form element
- [ ] Form wrapped in a `<form>` or `Box component="form"`
