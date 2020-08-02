import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, Typography, Avatar } from "@material-ui/core";
import { read } from "./api-shop";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    textAlign: "center",
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: "1.2em",
  },
  subheading: {
    marginTop: theme.spacing(1),
    color: theme.palette.openTitle,
  },
  bigAvatar: {
    width: 100,
    height: 100,
    margin: "auto",
  },
  productTitle: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      1
    )}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    width: "100%",
    fontSize: "1.2em",
  },
}));

export default function Shop({ match }) {
  const classes = useStyles();
  const [shop, setShop] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ shopId: match.params.shopId }, signal).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setShop(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.shopId]);

  const logoUrl = shop._id
    ? `/api/shops/logo/${shop._id}?${new Date().getTime()}`
    : "/api/shops/defaultPhoto";

  return (
    <CardContent>
      <Typography type="headline" component="h2" className={classes.title}>
        {shop.name}
      </Typography>
      <br />
      <Avatar src={logoUrl} className={classes.bigAvatar} />
      <br />
      <Typography
        type="subheading"
        component="h2"
        className={classes.subheading}
      >
        {shop.description}
      </Typography>
      <br />
    </CardContent>
  );
}
