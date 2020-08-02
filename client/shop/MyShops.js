import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  Button,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import auth from "./../auth/auth-helper";
import { listByOwner } from "./api-shop";

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(
      1
    )}px`,
    color: theme.palette.protectedTitle,
    fontSize: "1.2em",
  },
  addButton: {
    float: "right",
  },
  leftIcon: {
    marginRight: "8px",
  },
}));

export default function MyShops() {
  const classes = useStyles();
  const [shops, setShops] = useState([]);
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listByOwner({ userId: jwt.user._id }, { t: jwt.token }, signal).then(
      data => {
        if (data.error) {
          setRedirectToSignin(true);
        } else {
          setShops(data);
        }
      }
    );

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const removeShop = shop => {
    const updatedShops = [...shops];
    const index = updatedShops.indexOf(shop);
    updatedShops.splice(index, 1);
    setShops(updatedShops);
  };

  if (redirectToSignin) {
    return <Redirect to="/signin/" />;
  }

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Your Shops
          <span className={classes.addButton}>
            <Link to="/seller/shop/new">
              <Button color="primary" variant="contained">
                <Icon className={classes.leftIcon}>add_box</Icon> New Shop
              </Button>
            </Link>
          </span>
        </Typography>
        <List dense>
          {shops.map((shop, i) => {
            return (
              <span key={i}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar
                      src={
                        "/api/shops/logo/" +
                        shop._id +
                        "?" +
                        new Date().getTime()
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={shop.name}
                    secondary={shop.description}
                  />
                  {auth.isAuthenticated().user &&
                    auth.isAuthenticated().user._id === shop.owner._id && (
                      <ListItemSecondaryAction>
                        <Link
                          to={"/seller/orders/" + shop.name + "/" + shop._id}
                        >
                          <Button aria-label="Orders" color="primary">
                            View Orders
                          </Button>
                        </Link>
                        <Link to={"/seller/shop/edit/" + shop._id}>
                          <IconButton aria-lael="Edit" color="primary">
                            <Edit />
                          </IconButton>
                        </Link>
                        <DeleteShop shop={shop} onRemove={removeShop} />
                      </ListItemSecondaryAction>
                    )}
                </ListItem>
                <Divider />
              </span>
            );
          })}
        </List>
      </Paper>
    </div>
  );
}
