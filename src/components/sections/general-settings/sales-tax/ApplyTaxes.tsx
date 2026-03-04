import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import IconifyIcon from "components/base/IconifyIcon";
import StyledTextField from "components/styled/StyledTextField";
import { Controller, useFormContext } from "react-hook-form";
import { SalesTaxFormValues } from "types/general-settings";

const taxFields = [
  { key: "parts", label: "Parts", id: "field-apply-tax-parts" },
  { key: "labor", label: "Labor", id: "field-apply-tax-labor" },
  { key: "fees", label: "Fees", id: "field-apply-tax-fees" },
  { key: "epa", label: "EPA", id: "field-apply-tax-epa" },
  { key: "shop_supplies", label: "Shop supplies", id: "field-apply-tax-shop-supplies" },
  { key: "tires", label: "Tires", id: "field-apply-tax-tires" },
  { key: "subcontract", label: "Subcontract", id: "field-apply-tax-subcontract" },
  { key: "discount", label: "Discount", id: "field-apply-tax-discount" },
] as const;

const ApplyTaxes = ({ taxType }: { taxType: string[] }) => {
  const { control, watch, setValue } = useFormContext<SalesTaxFormValues>();

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconifyIcon
          icon="material-symbols:public"
          sx={{ fontSize: 24, color: "text.primary" }}
        />
        <Typography variant="h6" fontWeight={700}>
          Apply taxes on:
        </Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        {taxFields.map(({ key, label, id }, index) => {
          const isActive = watch(`applyTaxes.${key}.active`);

          return (
            <Box key={key} id={id}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                gap={2}
              >
                <FormControlLabel
                  control={
                    <Controller
                      name={`applyTaxes.${key}.active`}
                      control={control}
                      render={({ field }) => (
                        <Switch
                          {...field}
                          checked={field.value}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            field.onChange(checked);
                            const currentValue = watch(`applyTaxes.${key}.taxType`);
                            if (!checked) {
                              setValue(`applyTaxes.${key}.taxType`, null);
                            } else if (!currentValue) {
                              setValue(`applyTaxes.${key}.taxType`, "R1");
                            }
                          }}
                        />
                      )}
                    />
                  }
                  label={label}
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      marginLeft: '4px',
                      fontWeight: 700,
                      fontSize: 14,
                    },
                    ml: 0,
                    gap: 2,
                  }}
                />

                <Controller
                  name={`applyTaxes.${key}.taxType`}
                  control={control}
                  render={({ field }) => (
                    <StyledTextField
                      select
                      disabled={!isActive}
                      value={isActive ? field.value ?? "" : ""}
                      onChange={field.onChange}
                      sx={{ minWidth: 120 }}
                      slotProps={{
                        select: {
                          displayEmpty: true,
                          renderValue: (selected: unknown) =>
                            !isActive ? "N" : selected ? String(selected) : taxType[0],
                        },
                      }}
                    >
                      {taxType.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </StyledTextField>
                  )}
                />
              </Stack>
              {index !== taxFields.length - 1 && <Divider sx={{ my: 2 }} />}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ApplyTaxes;
