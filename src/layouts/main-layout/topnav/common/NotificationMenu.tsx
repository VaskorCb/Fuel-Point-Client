'use client';

import { useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { paperClasses } from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import { notifications as notificationsData } from 'data/notifications';
import dayjs from 'dayjs';
import { useSettingsContext } from 'providers/SettingsProvider';
import paths from 'routes/paths';
import { DatewiseNotification } from 'types/notification';
import IconifyIcon from 'components/base/IconifyIcon';
import SimpleBar from 'components/base/SimpleBar';
import NotificationList from 'components/sections/notification/NotificationList';

interface NotificationMenuProps {
  type?: 'default' | 'slim';
}

const NotificationMenu = ({ type = 'default' }: NotificationMenuProps) => {
  const [notifications, setNotifications] = useState<DatewiseNotification>({
    today: [],
    older: [],
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const {
    config: { textDirection },
  } = useSettingsContext();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const datewiseNotification = notificationsData.reduce(
      (acc: DatewiseNotification, val) => {
        if (dayjs().diff(dayjs(val.createdAt), 'days') === 0) {
          acc.today.push(val);
        } else {
          acc.older.push(val);
        }
        return acc;
      },
      {
        today: [],
        older: [],
      },
    );

    setNotifications(datewiseNotification);
  }, [notificationsData]);

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={(theme) => ({
          border: '1px solid',
          borderColor: 'divider',
          color: 'text.primary',
          '&:hover': {
            bgcolor: 'action.hover',
            borderColor: 'divider',
          },
        })}
      >
        <Badge badgeContent={1} color="error" variant="dot">
          <IconifyIcon
            icon={
              type === 'slim'
                ? 'material-symbols:notifications-outline-rounded'
                : 'material-symbols-light:notifications-outline-rounded'
            }
            sx={{
              fontSize: type === 'slim' ? 18 : 22,
              color: 'text.primary',
            }}
          />
        </Badge>
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        id="notification-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{
          horizontal: textDirection === 'rtl' ? 'left' : 'right',
          vertical: 'top',
        }}
        anchorOrigin={{
          horizontal: textDirection === 'rtl' ? 'left' : 'right',
          vertical: 'bottom',
        }}
        sx={{
          [`& .${paperClasses.root}`]: {
            width: 400,
            height: 650,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Box sx={{ pt: 2, flex: 1, overflow: 'hidden' }}>
          <SimpleBar disableHorizontal>
            <NotificationList
              title="Today"
              notifications={notifications.today}
              variant="small"
              onItemClick={handleClose}
            />
            <NotificationList
              title="Older"
              notifications={notifications.older}
              variant="small"
              onItemClick={handleClose}
            />
          </SimpleBar>
        </Box>
        <Stack
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            py: 1,
          }}
        >
          <Button
            component={Link}
            underline="none"
            href={paths.notifications}
            variant="text"
            color="primary"
          >
            Load more notifications
          </Button>
        </Stack>
      </Popover>
    </>
  );
};

export default NotificationMenu;
