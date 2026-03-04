import IconButton from '@mui/material/IconButton';
import IconifyIcon from 'components/base/IconifyIcon'

const Chat = () => {
  return (
    <IconButton aria-label="chat">
        <IconifyIcon icon="material-symbols:chat-outline-rounded" sx={(theme) => ({ fontSize: 22, color: theme.palette.neutral.contrastText })} />
      </IconButton>
  )
}

export default Chat