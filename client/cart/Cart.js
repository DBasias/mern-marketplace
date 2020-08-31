import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import CartItems from "./CartItems";
import Checkout from "./Checkout";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
}));

export default function Cart() {
  const classes = useStyles();
  const [checkout, setCheckout] = useState(false);

  const showCheckout = val => {
    setCheckout(val);
  };

  return (
    <Grid container spacing={24}>
      <Grid item xs={6} sm={6}>
        <CartItems checkout={checkout} setCheckout={showCheckout} />
      </Grid>
      {checkout && (
        <Grid item xs={6} sm={6}>
          <Checkout />
        </Grid>
      )}
    </Grid>
  );
}
