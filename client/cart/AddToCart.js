import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import {
  AddShoppingCart as AddCartIcon,
  RemoveShoppingCart as DisabledCartIcon,
} from "@material-ui/icons";
import cart from "./cart-helper";

const useStyles = makeStyles(theme => ({
  iconButton: {
    width: "28px",
    height: "28px",
  },
  disabledIconButton: {
    color: "#7f7563",
    width: "28px",
    height: "28px",
  },
}));

export default function AddToCart(props) {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);

  const addToCart = () => {};

  if (redirect) {
    return <Redirect to="/cart" />;
  }

  return (
    <span>
      {props.item.quantity >= 0 ? (
        <IconButton color="secondary" dense="dense" onClick={addToCart}>
          <AddCartIcon className={props.cartStyle || classes.iconButton} />
        </IconButton>
      ) : (
        <IconButton disabled={true} color="secondary" dense="dense">
          <DisabledCartIcon
            className={props.cartStyle || classes.disabledIconButton}
          />
        </IconButton>
      )}
    </span>
  );
}

AddToCart.propTypes = {
  item: PropTypes.object.isRequired,
  cartStyle: PropTypes.string,
};
