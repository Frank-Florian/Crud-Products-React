import React from "react";

const ProductsList = ({ product, selectProduct, deleteProduct }) => {
  return (
    <div className="productList">
      <ul className="conteiner-card">
        {product?.map((product) => (
          <li key={product.id} className="cardProduct">
            <h4>
              <span>Nombre: {product.name}</span>
            </h4>
            <h4>
              <span>Categoria: {product.category}</span>
            </h4>
            <h4>
              <span>Precio: {product.price}</span>
            </h4>
            <h4>
              <span style={{ color: product.isAvailable ? '#00FF00' : '#8B0000' }}>
                Stock: {product.isAvailable ? 'Disponible' : 'No Disponible'}
              </span>
            </h4>
            <div className="containerBtn">
              <button
                onClick={() => deleteProduct(product.id)}
                className="btnDelete"
                title="Eliminar producto"
              >
                <i className="bx bxs-x-square"></i>
              </button>
              <button
                onClick={() => selectProduct(product)}
                className="btnUpdate"
                title="Actualizar producto"
              >
                <i className="bx bxs-edit-alt"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
