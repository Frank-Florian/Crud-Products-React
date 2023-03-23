import React from "react";
import ReactDOM from "react-dom";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import Select from "react-select";

const modalContainer = document.querySelector("#modal");

const ProductsForm = ({
  onClose,
  createProduct,
  selectedProduct,
  updateProduct,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  useEffect(() => {
    if (selectedProduct) {
      reset(selectedProduct);
    } else {
      emptyForm();
    }
  }, [selectedProduct]);

  const submit = (data) => {
    if (selectedProduct) {
      updateProduct(data);
    } else {
      createProduct(data);

      emptyForm();
    }
  };

  const emptyForm = () => {
    reset({
      name: "",
      category: "",
      price: "",
      isAvailable: false,
    });
  };

  const options = [
    { value: true, label: "Disponible" },
    { value: false, label: "No Disponible" },
  ];

  return ReactDOM.createPortal(
    <div className="container-form">
      <form onSubmit={handleSubmit(submit)} className="form">
        <div className="formTitle">
          <h1>Producto</h1>
          <button className="btnCloseForm" onClick={onClose}>
            <i className="bx bxs-x-square"></i>
          </button>
        </div>

        <div className="input">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            className="inputText"
            {...register("name", { required: true })}
          />
        </div>
        <div className="input">
          <label htmlFor="category">Categoria</label>
          <input
            type="text"
            id="category"
            className="inputText"
            {...register("category", { required: true })}
          />
        </div>
        <div className="input">
          <label htmlFor="price">Precio</label>
          <input
            type="text"
            id="price"
            className="inputText"
            {...register("price", { required: true })}
          />
        </div>
        <div className="input">
          <label htmlFor="isAvailable">Stock</label>
          <select {...register("isAvailable")}>
          <option value={true} style={{color: 'green', fontWeight: 'bold'}}>Disponible</option>
          <option value={false} style={{color: 'red', fontWeight: 'bold'}}>No Disponible</option>
          </select>
        </div>
        <button className="btnSubmit" type="submit">
          {selectedProduct? 'Editar producto': 'agregar producto'}
        </button>
      </form>
    </div>,
    modalContainer
  );
};

export default ProductsForm;
