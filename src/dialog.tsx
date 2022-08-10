import * as React from "react";
import {
  Avatar,
  Box,
  IconButton,
  TextField,
  List,
  Stack,
  Typography,
  ListItemText,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

type InvitationProps = {
  items: { email: string }[];
};

const InvitationList: React.FC<InvitationProps> = (props) => {
  return (
    <div>
      {props.items.map((invitation) => (
        <Stack direction="row">
          <Avatar sx={{ mr: 1, mb: 1 }} />
          <ListItemText primary={invitation.email} />
        </Stack>
      ))}
    </div>
  );
};

const EmailVaildPattern =
  "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$";

type NewInvitationProps = {
  onAddInvitation: (invitationText: string) => void;
};

const NewInvitationList: React.FC<NewInvitationProps> = (props) => {
  const emailRef = React.useRef<HTMLInputElement>();
  const [emailError, setEmailError] = React.useState(false);
  const [text, setText] = React.useState("");
  const invationSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredtext = emailRef.current!.value;
    props.onAddInvitation(enteredtext);
    setText("");
  };

  const EmailValidation = (): boolean => {
    let valid = true;
    const e = emailRef?.current;
    if (e) {
      const ok = e.validity.valid;
      setEmailError(!ok);
      valid &&= ok;
      e.setCustomValidity("メールアドレス");
    }
    return valid;
  };

  return (
    <form onSubmit={invationSubmitHandler}>
      <div>
        <TextField
          id=""
          label=""
          size="small"
          variant="filled"
          color="secondary"
          focused
          inputRef={emailRef}
          error={emailError}
          helperText={emailError && emailRef?.current?.validationMessage}
          inputProps={{
            pattern: EmailVaildPattern,
            required: true,
          }}
          placeholder="メールアドレスを入力"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mb: 2 }}
        />
      </div>
    </form>
  );
};

const InvitationDialog: React.FC = (props) => {

  const [invitations, setInvitations] = React.useState<{ email: string }[]>([]);
  const invitationAddHandler = (text: string) => {
    setInvitations((prevInvitations) => [...prevInvitations, { email: text }]);
  };

  const onClickOpenInvitationDaialog = () => {
    props.setOpenDialog(false);
  };

  const onClickCloseInvitationDaialog = () => {
    setInvitations([]);
    props.setOpenDialog(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={onClickOpenInvitationDaialog}>
        ユーザー追加
      </Button> */}
      <List>
        <Dialog
          open={props.openDialog}
          onClose={onClickCloseInvitationDaialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">
            <Box display="flex" alignItems="center">
              <Box flexGrow={1}>ユーザーを追加</Box>
              <Box>
                <IconButton>
                  <CloseIcon fontSize="small" onClick={onClickCloseInvitationDaialog}/>
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent>
            <NewInvitationList onAddInvitation={invitationAddHandler} />
            <Stack direction="row" alignItems="center" spacing={40}>
              <Typography variant="caption" display="block" gutterBottom>
                メールアドレス
              </Typography>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ mr: 3 }}
              >
                権限
              </Typography>
            </Stack>
            <InvitationList items={invitations} />
          </DialogContent>
          <DialogActions>
            <Button
              startIcon={<AddBoxOutlinedIcon />}
              onClick={onClickCloseInvitationDaialog}
              sx={{ color: "#344054", border: 1, borderColor: "#D0D5DD" }}
            >
              インポート
            </Button>
            <Button
              startIcon={<EmailOutlinedIcon />}
              onClick={onClickOpenInvitationDaialog}
              autoFocus
              sx={{ color: "#6941C6", bgcolor: "#F9F5FF" }}
            >
              招待
            </Button>
          </DialogActions>
        </Dialog>
      </List>
    </div>
  );
};

export default InvitationDialog;