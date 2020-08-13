import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  Button,
  List,
  ListItem,
  CardMedia,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Icon,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { listByShop } from "./api-product";

const useStyles = makeStyles(theme => ({
  products: {
    padding: "24px",
  },
  addButton: {
    float: "right",
  },
  leftIcon: {
    marginRight: "8px",
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: "1.2em",
  },
  subheading: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  cover: {
    width: 110,
    height: 100,
    margin: "8px",
  },
  details: {
    padding: "10px",
  },
}));

export default function MyProducts(props) {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listByShop({ shopId: props.shopId }, signal).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const removeProduct = product => {
    const updatedProducts = [...products];
    const index = updatedProducts.indexOf(product);
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <Card className={classes.products}>
      <Typography type="title" className={classes.title}>
        Products
        <span className={classes.addButton}>
          <Link to={"/seller/" + props.shopId + "/products/new"}>
            <Button color="primary" variant="contained">
              <Icon className={classes.leftIcon}>add_box</Icon> New Product
            </Button>
          </Link>
        </span>
      </Typography>
      <List dense>
        {products.map((product, i) => {
          return (
            <span key={i}>
              <ListItem>
                <CardMedia
                  className={classes.cover}
                  image={
                    "/api/product/image/" +
                    product._id +
                    "?" +
                    new Date().getTime()
                  }
                  title={product.name}
                />
                <div className={classes.details}>
                  <Typography
                    type="headline"
                    component="h2"
                    color="primary"
                    className={classes.productTitle}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    type="subheading"
                    component="h4"
                    className={classes.subheading}
                  >
                    Quantity: {product.quantity} | Price: ${product.price}
                  </Typography>
                </div>
                <ListItemSecondaryAction>
                  <Link
                    to={
                      "/seller/" +
                      product.shop._id +
                      "/" +
                      product._id +
                      "/edit"
                    }
                  >
                    <IconButton aria-label="Edit" color="primary">
                      <Edit />
                    </IconButton>
                  </Link>
                  <DeleteProduct
                    product={product}
                    shopId={props.shopId}
                    onRemove={removeProduct}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </span>
          );
        })}
      </List>
    </Card>
  );
}

MyProducts.propTypes = {
  shopId: PropTypes.string.isRequired,
};
