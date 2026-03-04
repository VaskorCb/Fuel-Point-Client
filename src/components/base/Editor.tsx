'use client';
import { useRef, useEffect } from 'react';
import { SxProps } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { toggleButtonClasses } from '@mui/material/ToggleButton';
import { Extensions } from '@tiptap/core';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import {
  type ImageNodeAttributes,
  MenuButtonAlignCenter,
  MenuButtonAlignJustify,
  MenuButtonAlignLeft,
  MenuButtonAlignRight,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonEditLink,
  MenuButtonImageUpload,
  LinkBubbleMenu,
  LinkBubbleMenuHandler,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonRedo,
  MenuButtonUnderline,
  MenuButtonUndo,
  MenuControlsContainer,
  MenuDivider,
  RichTextEditor,
  RichTextEditorProps,
  type RichTextEditorRef,
} from 'mui-tiptap';
import IconifyIcon from './IconifyIcon';

interface EditorProps extends Omit<RichTextEditorProps, 'extensions'> {
  onChange?: (content: string) => void;
  isValid?: boolean;
  editorHeight?: number;
  placeholder?: string;
  imageUploadHandler?: (files: File[]) => Promise<ImageNodeAttributes[]>;
  extensions?: Extensions;
  ref?: React.Ref<RichTextEditorRef>;
  sx?: SxProps;
  initialContent?: string;
}

export const editorDefaultToolbar = (imageUploadHandler?: any) => {
  const handleImageUpload = async (files: File[]): Promise<ImageNodeAttributes[]> => {
    return imageUploadHandler
      ? imageUploadHandler(files)
      : files.map((file) => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }));
  };
  return (
    <MenuControlsContainer>
      <MenuButtonUndo
        IconComponent={() => (
          <IconifyIcon
            sx={{ pointerEvents: 'none' }}
            icon="material-symbols:undo-rounded"
            fontSize={36}
          />
        )}
      />
      <MenuButtonRedo
        IconComponent={() => (
          <IconifyIcon
            sx={{ pointerEvents: 'none' }}
            icon="material-symbols:redo-rounded"
            fontSize={36}
          />
        )}
      />
      <MenuDivider />
      <MenuButtonBold
        IconComponent={() => (
          <IconifyIcon
            sx={{ pointerEvents: 'none' }}
            icon="material-symbols:format-bold-rounded"
            fontSize={36}
          />
        )}
      />
      <MenuButtonItalic
        IconComponent={() => (
          <IconifyIcon
            sx={{ pointerEvents: 'none' }}
            icon="material-symbols:format-italic-rounded"
            fontSize={36}
          />
        )}
      />
      <MenuButtonUnderline
        IconComponent={() => (
          <IconifyIcon
            sx={{ pointerEvents: 'none' }}
            icon="material-symbols:format-underlined-rounded"
            fontSize={36}
          />
        )}
      />
      <MenuDivider />
      <MenuButtonAlignLeft
        IconComponent={() => (
          <IconifyIcon
            sx={{ pointerEvents: 'none' }}
            icon="material-symbols:format-align-left-rounded"
            fontSize={36}
          />
        )}
      />
      <MenuButtonAlignRight
        IconComponent={() => (
          <IconifyIcon
            sx={{ pointerEvents: 'none' }}
            icon="material-symbols:format-align-right-rounded"
            fontSize={36}
          />
        )}
      />
      <MenuButtonAlignCenter
        IconComponent={() => (
          <IconifyIcon
            sx={{ pointerEvents: 'none' }}
            icon="material-symbols:format-align-center-rounded"
            fontSize={36}
          />
        )}
      />
      <MenuButtonAlignJustify
        IconComponent={() => (
          <IconifyIcon
            sx={{ pointerEvents: 'none' }}
            icon="material-symbols:format-align-justify-rounded"
            fontSize={36}
          />
        )}
      />
      <MenuDivider />
      <MenuButtonBulletedList
        disabled={false}
        IconComponent={() => (
          <IconifyIcon
            sx={{ pointerEvents: 'none' }}
            icon="material-symbols:format-list-bulleted-rounded"
            fontSize={36}
          />
        )}
      />
      <MenuButtonOrderedList
        disabled={false}
        IconComponent={() => (
          <IconifyIcon
            sx={{ pointerEvents: 'none' }}
            icon="material-symbols:format-list-numbered-rounded"
            fontSize={36}
          />
        )}
      />
      <MenuDivider />
      <MenuButtonImageUpload
        onUploadFiles={handleImageUpload}
        IconComponent={() => (
          <IconifyIcon
            sx={{ pointerEvents: 'none' }}
            icon="material-symbols:imagesmode-outline-rounded"
            fontSize={36}
          />
        )}
      />
      <MenuButtonEditLink
        IconComponent={() => (
          <IconifyIcon
            sx={{ pointerEvents: 'none' }}
            icon="material-symbols:attachment-rounded"
            fontSize={36}
          />
        )}
      />
    </MenuControlsContainer>
  );
};

const Editor = ({
  onChange,
  editorHeight = 236,
  isValid = true,
  placeholder = 'Write a description...',
  imageUploadHandler,
  extensions = [] as Extensions,
  sx,
  ref,
  initialContent = "",
  ...rest
}: EditorProps) => {
  const defaultRef = useRef<RichTextEditorRef>(null);
  const editorRef = ref || defaultRef;
  const theme = useTheme();

  const defaultExtensions = [
    StarterKit,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Underline,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        rel: 'noopener noreferrer',
        target: '_blank',
      },
    }),
    LinkBubbleMenuHandler,
    Image,
    Placeholder.configure({ placeholder }),
    ...extensions,
  ];

  useEffect(() => {
    if (editorRef && 'current' in editorRef && editorRef.current) {
      const editor = editorRef.current.editor;
      if (editor && editor.getHTML() !== initialContent) {
        editor.commands.setContent(initialContent);
      }
    }
  }, [initialContent, editorRef]);

  return (
    <RichTextEditor
      ref={editorRef}
      content={initialContent}
      extensions={defaultExtensions}
      immediatelyRender={false}
      renderControls={() => editorDefaultToolbar(imageUploadHandler)}
      onUpdate={({ editor }) => {
        const html = editor.getHTML();
        if (onChange) {
          onChange(editor.isEmpty ? '' : html);
        }
      }}
      sx={{
        bgcolor: !isValid ? 'error.lighter' : '',
        overflow: 'hidden',
        borderRadius: 2,
        p: 0,
        '&:hover': {
          bgcolor: isValid ? '' : undefined,
          '& .MuiTiptap-MenuBar-root': {
            bgcolor: !isValid ? 'error.lighter' : 'background.elevation3',
          },
          '& .MuiTiptap-FieldContainer-notchedOutline': {
            borderColor: !isValid ? 'error.main' : 'unset',
            borderWidth: !isValid ? 1 : undefined,
          },
        },
        '& .MuiTiptap-MenuBar-root': {
          bgcolor: !isValid ? 'error.lighter' : 'background.elevation1',
          borderRadius: 2,
          border: 'none',
          [`& .${toggleButtonClasses.root}`]: {
            color: 'neutral.dark',
            [`&:hover, &.${toggleButtonClasses.selected}`]: {
              bgcolor: 'background.elevation4',
            },
            [`&.${toggleButtonClasses.disabled}`]: {
              opacity: 0.3,
            },
          },
        },
        '& .MuiTiptap-RichTextContent-root': {
          padding: 2,

          '.tiptap': {
            minHeight: editorHeight,
            maxHeight: editorHeight,
            overflow: 'auto',
            '& p[data-placeholder]::before': {
              color:
                (!isValid ? theme.vars.palette.error.main : theme.vars.palette.text.disabled) +
                ' !important',
            },
          },
        },
        '&.MuiTiptap-FieldContainer-focused': {
          // bgcolor: !isValid ? 'error.lighter' : 'primary.lighter',

          '& .MuiTiptap-MenuBar-root': {
            // bgcolor: !isValid ? 'error.lighter' : 'primary.lighter',
          },

          '.MuiTiptap-FieldContainer-notchedOutline': {
            // borderWidth: '1px !important',
            // borderColor: !isValid ? 'error.main' : 'primary.main',
          },
        },
        '& .MuiTiptap-FieldContainer-notchedOutline': {
          borderWidth: !isValid ? 1 : 0,
          borderColor: !isValid ? 'error.main' : 'unset',
        },
        ...sx,
      }}
      {...rest}
    >
      {() => <LinkBubbleMenu />}
    </RichTextEditor>
  );
};

export default Editor;
