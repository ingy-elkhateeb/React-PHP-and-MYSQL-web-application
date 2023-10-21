import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewProducts() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const result = await axios.get("https://testingscandi.000webhostapp.com/Backend/ViewProducts.php");
      console.log("data",result.data);
      console.log("reecords",result.data.records);

      if (result.data.records) {
        setProduct(result.data.records);
      }
    } catch (error) {
      console.error("Error loading products:", error);
      if (error.response) {
        console.error('Server Error:', error.response);
      } else if (error.request) {
        console.error('No Response:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  const deleteProducts = (id) => {
    
    const checkID = Array.isArray(id) ? id : [id];
    console.log("id is ", id);
    console.log("array?", checkID);
    axios.post("https://testingscandi.000webhostapp.com/Backend/Delete.php", {
      action: "DELETE",
      product_id: checkID,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        console.log("Response from server:", result.data);
        loadProducts();
      })
      .catch(() => {
        alert("Error occurred while deleting product");
      });

    
  }

  const handleCheckboxChange = (e, product) => {
    const updatedProducts = products.map((p) => {
      if (p.product_id === product.product_id) {
        return { ...p, select: e.target.checked };
      } else {
        return p;
      }
    });
    setProduct(updatedProducts);
  }

  const deleteCustomersbyIDs = () => {
    let selectedids = [];
    products.forEach((product) => {
      if (product.select) {
        selectedids.push(product.product_id);
      }
    });
    deleteProducts(selectedids);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light font-link d-flex ">
        <div className="row w-100">
          <div className="col text-left ">
            <a className="navbar-brand" >
              Scandi
            </a>
            
          </div>
          <div className="col">
            <div className="p-2">
              
            </div>
          </div>
          <div className="col-6 d-inline-flex pr-0 d-flex flex-row-reverse">
          

            <form className="form-inline px-2 my-2 my-lg-0 ">
              <button
                className="btn mr-2 btn-sm px-2 ml-auto btn-delete"
                type="submit"
                onClick={() => {
                  deleteCustomersbyIDs();
                }}
              >
                MASS DELETE
              </button>
            </form>
            <Link to="/add-product">
              <button className="btn btn-delete btn-sm px-2 font-weight-normal">ADD</button>
            </Link>

            {/* <button className="btn btn-delete px-4 font-weight-normal pr-2" to="/add-product">ADD</button> */}
            {/* <Link className="nav-link px-4 font-weight-normal pr-2" to="/add-product">
                ADD
              </Link> */}

          </div>
        </div>
      </nav>
      <div className="row font-link">
        <div className="col-md-12 text-center mb-4">
          <h1>Products List</h1>
        </div>
      </div>

      <div className="row font-link">
        {products &&
          products.map((product) => (
            <div className="col-sm" key={product.product_id}>
              <div
                className="card mb-3"
                style={{
                  minWidth: "15rem",
                  minHeight: "20rem",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  borderColor: "#FFBD18",
                }}
              >
                <div className="card-body text-center">
                  <div className="mb-3">
                    <input
                      className="form-check-input float-end delete-checkbox"
                      name={product.product_id}
                      type="checkbox"
                      id="checkboxNoLabel"
                      checked={product.select || false}
                      value={product.product_id}
                      aria-label="..."
                      onChange={(e) => handleCheckboxChange(e, product)}
                    />
                  </div>
                  {Object.keys(product).map((property) => {
                    if (property !== "product_id") {
                      if (property === "Dimensions" && typeof product[property] === "object") {
                        return (
                          <div key={property}>
                            <p style={{ color: "#555A5F", fontSize: "12px" }}> Dimensions L x W x H cm</p>
                            {Object.keys(product[property]).map((nested, index) => (
                              <div key={nested} style={{ display: "inline-flex" }}>
                                <div style={{ color: "#3B424A", fontSize: "20px" }}>{product[property][nested]}</div>
                                {index < Object.keys(product[property]).length - 1 && (
                                  <span style={{ color: "#3B424A", fontSize: "20px" }}>x</span>
                                )}
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return (
                        <div key={property} style={{ alignItems: "center", textAlign: "center" }}>
                          <span style={{ color: "#555A5F", fontSize: "12px" }} className="property">
                            {property}
                          </span>{" "}
                          <br></br>
                          {typeof product[property] === "object" ? (
                            Object.keys(product[property]).map((nested) => (
                              <div key={nested} style={{ display: "inline-flex" }}>
                                <div style={{ color: "#3B424A", fontSize: "20px" }}>{product[property][nested]}x</div>
                              </div>
                            ))
                          ) : typeof product[property] === "string" ? (
                            <span style={{ color: "#3B424A", fontSize: "20px" }}>
                              {product[property].replace(property + "=", "")}
                            </span>
                          ) : (
                            <span style={{ color: "#3B424A", fontSize: "20px" }}>{product[property]}</span>
                          )}
                        </div>
                      );
                    }
                  })}
                  <Link to={`/edit/${product.product_id}`}>
                    <i className="bi bi-pencil-square fa-2x" disabled></i>
                  </Link>
                  <Link to="" onClick={() => deleteProducts(product.product_id)}>
                    <i className="bi bi-trash fa-2x"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ViewProducts;