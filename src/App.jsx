import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import FormProduct from "./components/ProductsForm";
import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import ProductsList from "./components/ProductsList";
function App() {
  const [productUpdate, setProductUpdate] = useState(null);
  const [isOpenes, setOpened] = useState(false);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://products-crud.academlo.tech/products/")
      .then((resp) => {
        console.log(resp.data);
        setProduct(resp.data);
      })
      .catch((error) => console.error(error));
    clolseModal();
  };

  const addProduct = (productData) => {
    axios
      .post("https://products-crud.academlo.tech/products/", productData)
      .then(() => {
        getData();
        Swal.fire(
          "¡Agregado!",
          "Su producto ha sido agregado.",
        );
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Ocurrio un error al agregar el producto!",
        });
      });
  };

  const deleteProduct = (idProduct) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡si, eliminar producto!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://products-crud.academlo.tech/products/${idProduct}/`)
          .then(() => {
            getData();
            Swal.fire(
              "¡Eliminado!",
              "Su producto ha sido eliminado.",
            );
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "¡Ocurrio un error al eliminar el producto!",
            });
          });
      }
    });
  };

  const selectProducto = (productData) => {
    setProductUpdate(productData);
    setOpened(true);
  };

  const opened = () => {
    selectProducto(null);
    setOpened(true);
  };
  const clolseModal = () => {
    setOpened(false);
  };

  const updateProduct = (productData) => {
    axios
      .put(
        `https://products-crud.academlo.tech/products/${productData.id}/`,
        productData
      )
      .then(() => {
        getData();
        setProductUpdate(null);
        Swal.fire(
          "¡Actualización!",
          "Su producto ha sido actualizado.",
        );
      })
      .catch((error) => {
        console.error(error)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Ocurrio un error al editar el producto!",
        });
      });
    clolseModal();
  };

  return (
    <div className={`App ${isOpenes ? "blur" : ""}`}>
      <div className="header">
        <div className="title">
          <h1>Lista de Productos</h1>
        </div>
        <button className="btnAdd" onClick={opened}>
          Crear nuevo Producto
        </button>
        {isOpenes && (
          <FormProduct
            onClose={clolseModal}
            selectedProduct={productUpdate}
            updateProduct={(data) => updateProduct(data)}
            createProduct={(data) => addProduct(data)}
          />
        )}
      </div>

      <ProductsList
        product={product}
        deleteProduct={(id) => deleteProduct(id)}
        selectProduct={(data) => selectProducto(data)}
      />
    </div>
  );
}

export default App;
