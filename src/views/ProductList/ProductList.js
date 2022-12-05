import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ProductsToolbar, ProductCard, AdditionModal, UpdateModal } from './components';

import {
  Typography,
  Grid,
  IconButton,
} from '@mui/material'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

let allProducts; //Global variable to store all products

const ProductList = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [updatingProduct, setUpdatingProduct] = useState({});

  const [showAddModal, setAddModal] = useState(false);

  const handleAddModal = () => setAddModal(true);
  const handleCloseAddModal = () => setAddModal(false);

  const [showUpdateModal, setUpdateModal] = useState(false);

  const handleUpdateModal = (product) => {
    setUpdateModal(true);
    setUpdatingProduct(product)
  };
  const handleCloseUpdateModal = () => setUpdateModal(false);

  useEffect(() => {
    try {
      axios.get(`${process.env.REACT_APP_PRODUCTS}/getallproducts`)
        .then((response) => {
          setProducts(response.data.products);
          allProducts = response.data.products;
        })
        .catch((err) => {
          console.log(err);
        });
    }
    catch (error) {
      console.log('inside catch', error);
    }
  }, [])

  const handleDeletion = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.REACT_APP_PRODUCTS}/deleteproduct/${id}`)
          .then(() => {
            let newList = []
            products.forEach((product) => {
              if (product._id != id) newList.push(product);
            })
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            setProducts(newList);
            allProducts = newList;
          })
          .catch((err) => {
            console.log(err);
          })
      }
    })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleAddition = (event) => {
    event.preventDefault();
    handleCloseAddModal();
    Swal.fire({
      title: 'Are you sure you want to add this product?',
      showDenyButton: true,
      confirmButtonText: "Yes, I'm sure",
      denyButtonText: `Don't add`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let formData = {
          productName: event.target.productName.value,
          price: event.target.price.value,
          description: event.target.description.value,
          image: event.target.image.value,
          inStock: Number(event.target.inStock.value),
          category: event.target.category.value,
        }
        axios.post(`${process.env.REACT_APP_PRODUCTS}/addproduct`, formData)
          .then((response) => {
            Swal.fire('Added!', '', 'success');
            setProducts([response.data.data, ...products]);
            allProducts = [response.data.data, ...allProducts]
          })
          .catch((err) => {
            console.log(err);
          })
      } else if (result.isDenied) {
        Swal.fire('Product was not added', '', 'info')
      }
    })
  }

  const handleUpdate = (event, productId) => {
    event.preventDefault();
    handleCloseUpdateModal();
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let formData = {
          productName: event.target.productName.value,
          price: event.target.price.value,
          description: event.target.description.value,
          image: event.target.image.value,
          inStock: Number(event.target.inStock.value),
          category: event.target.category.value,
        }
        axios.patch(`${process.env.REACT_APP_PRODUCTS}/updateproduct/${productId}`, formData)
          .then(() => {
            let newProducts = products.map((product) => {
              if (product._id == productId) {
                product.productName = formData.productName;
                product.price = formData.price;
                product.description = formData.description;
                product.image = formData.image;
                product.inStock = formData.inStock;
                product.category = formData.category;
              }
              return product;
            })
            Swal.fire('Saved!', '', 'success')
            setProducts(newProducts);
          })
          .catch((err) => {
            console.log(err);
          })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  const handleSearch = (event) => {
    event.preventDefault();
    if (event.target.value != '') {
      let searchOutput = []
      allProducts.forEach((product) => {
        if (product.productName.toLowerCase().includes(event.target.value)) {
          searchOutput.push(product);
        }
        setProducts(searchOutput);
      })
    } else {
      setProducts(allProducts);
    }
  }

  return (
    <div className={classes.root}>
      <AdditionModal
        showModal={showAddModal}
        handleClose={handleCloseAddModal}
        handleAddition={handleAddition}
      />
      <UpdateModal
        showModal={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        handleUpdate={handleUpdate}
        product={updatingProduct}
      />
      <ProductsToolbar
        handleOpen={handleAddModal}
        handleSearch={handleSearch}
      />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {products.map(product => (
            <Grid
              item
              key={product._id}
              lg={4}
              md={6}
              xs={12}
            >
              <ProductCard
                product={product}
                handleDeletion={handleDeletion}
                handleUpdateModal={handleUpdateModal}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ProductList;
