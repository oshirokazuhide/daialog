import * as React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import NewInvitationList from "./dialog";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

export default function AddUserButton() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <Button
        sx={{ bgcolor: "#7F56D9" }}
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<PersonAddOutlinedIcon />}
      >
        ユーザー追加
      </Button>
      <NewInvitationList
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
}
