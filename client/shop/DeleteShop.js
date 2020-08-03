import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Dialog,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import auth from "./../auth/auth-helper";
import { remove } from "./api-shop";

export default function DeleteShop(props) {
  const [open, setOpen] = useState(false);
  const jwt = auth.isAuthenticated();

  const clickButton = () => {
    setOpen(true);
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  const deleteShop = () => {
    remove({ shopId: props.shop._id }, { t: jwt.token }).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOpen(false);
        props.onRemove(props.shop);
      }
    });
  };

  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete " + props.shop.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your shop {props.shop.name}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteShop} color="secondary" autoFocus="authFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}

DeleteShop.propTypes = {
  shop: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};
