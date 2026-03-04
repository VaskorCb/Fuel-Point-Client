import { useEffect, useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { convertFileToAttachment } from 'lib/utils';
import { FileAttachment } from 'types/common';
import IconifyIcon from 'components/base/IconifyIcon';


interface ProfileLogoDropZoneProps extends DropzoneOptions {
  error?: string;
  onRemove?: () => void;
  defaultFile?: File | null;
  sx?: BoxProps['sx'];
}

const ProfileLogoDropZone = ({
  onDrop,
  error,
  onRemove,
  defaultFile,
  sx,
  ...rest
}: ProfileLogoDropZoneProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<FileAttachment | null>(null);

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    onRemove?.();
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    multiple: false,
    maxFiles: 1,
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles, fileRejections, event) => {
      const selectedFile = acceptedFiles[0];
      if (!selectedFile) return;

      setFile(selectedFile);
      setPreview(convertFileToAttachment(selectedFile));

      onDrop?.(acceptedFiles, fileRejections, event);
    },
    ...rest,
  });

  useEffect(() => {
    if (defaultFile) {
      setFile(defaultFile);
      setPreview(convertFileToAttachment(defaultFile));
    }
  }, [defaultFile]);

  return (
    <Stack spacing={0} alignItems="center" direction="column">
      <Box
        {...getRootProps()}
        sx={{
          width: 420,
          borderRadius: 3,
          px:2,
          py:2.5,
          borderColor: error ? 'error.main' : 'divider',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          cursor: 'pointer',
          overflow: 'hidden',
          transition: (theme) =>
            theme.transitions.create('background-color', {
              duration: theme.transitions.duration.short,
            }),
          ...sx,
        }}
      >
        <input {...getInputProps()} />

        {!preview ? (
          <Stack spacing={4} direction="column" alignItems="center">
            <IconifyIcon
              icon="material-symbols:add-a-photo-outline-rounded"
              sx={{ fontSize: 48, color: 'text.secondary' }}
            />

            <Stack spacing={1} direction="column" alignItems="center">
              <Typography fontSize={18} fontWeight={700}>
                Upload logo
              </Typography>

              <Typography
                variant='subtitle2'
                color="text.secondary"
                // sx={{ fontSize: 14 }}
              >
                We support your best PNGs, JPEGs, JPGs, and WEBPs portraits under 10MB
              </Typography>
            </Stack>
          </Stack>
        ) : (
          <Box
          sx={{
            position: 'relative',
            display: 'inline-block', // 👈 important
          }}
        >
          <Box
            component="img"
            src={preview.preview ?? ''}
            alt="logo"
            sx={{
              maxWidth: 200,
              borderRadius: 2,
              display: 'block',
            }}
          />
      
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveFile();
            }}
            sx={(theme) => ({
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: theme.vars.palette.background.elevation4,
              borderRadius: 2,
              p: '6px',
            })}
          >
            <IconifyIcon
              icon="material-symbols:delete"
              sx={{ fontSize: 16 }}
            />
          </IconButton>
        </Box>
        )}
      </Box>

      <Button
        variant="contained"
        onClick={(e) => {
          e.stopPropagation();
          open();
        }}
        sx={{ px: 4, borderRadius: 2 }}
      >
        Select file
      </Button>

      {error && <FormHelperText error>{error}</FormHelperText>}
    </Stack>
  );
};

export default ProfileLogoDropZone;