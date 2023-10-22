import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProduct() {
    let history = useNavigate();
    const [product, setProduct] = useState({
        Name: "",
        SKU: "",
        Price: 0,
    });

    const { Name, SKU, Price } = product;

    const [Book, setBook] = useState({
        Weight: '',
        Book_description: ''
    });
    const { Weight, Book_description } = Book;
    const handleBook = (e) => {
        setBook({
            ...Book, [e.target.name]: e.target.value
        })
    }

    const BookObject = {
        ...product,
        ...Book
    }

    const [DVD, setDVD] = useState({
        size: '',
        DVD_description: ''
    });
    const { size, DVD_description } = DVD;
    const handleDVD = (e) => {
        setDVD({
            ...DVD, [e.target.name]: e.target.value
        })
    }
    const DVDObject = {
        ...product,
        ...DVD
    }

    const [Furniture, setFurniture] = useState({
        Dimensions: {
            Length: 0,
            Width: 0,
            Height: 0
        },
        Furniture_description: ''
    });
    const { Dimensions, Furniture_description } = Furniture;
    const handleFurniture = (e) => {
        if (e.target.name === "Furniture_description") {
            setFurniture({
                ...Furniture,
                Furniture_description: e.target.value
            })
        }
        else {
            setFurniture({
                ...Furniture, Dimensions: { ...Furniture.Dimensions, [e.target.name]: e.target.value },
            })
        }
    }

    const FurnitureObject = {
        ...product,
        Dimensions: { ...Furniture.Dimensions },
        Furniture_description
    }

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
        responseType: "json",
    };

    const submitDVD = async (e) => {
        e.preventDefault();
        
        if (product.Name.trim().length < 1 || product.SKU.trim().length < 1 || DVD.size.trim().length < 1 || DVD.DVD_description.trim().length < 1) {
            toast.error("Please fill in all required fields.");
            return;
        }
        try {
            const result = await axios.post("https://testingscandi.000webhostapp.com/Backend/DVD.php", DVDObject, config);
            if (result.data.status === 'valid') {
                history('/');
            } else {
                toast.error("Error occurred while adding the product");
            }
        } catch (error) {
            toast.error("Error:", error);
            toast.error("Error occurred while making the request");
            if (error.response) {
                toast.error('Server Error:', error.response);
            } else if (error.request) {
                toast.error('No Response:', error.request);
            } else {
                toast.error('Error:', error.message);
            }
        }
    }

    const submitBook = async (e) => {
        e.preventDefault();

        if (product.Name.trim().length < 1 || product.SKU.trim().length < 1 || Book.Weight.trim().length < 1 || Book.Book_description.trim().length < 1) {
            toast.error("Please fill in all required fields.");
            return;
        }
        try {
            const result = await axios.post("https://testingscandi.000webhostapp.com/Backend/Book.php", BookObject, config);

            if (result.data.status === 'valid') {
                history('/');
            } else {
                toast.error(result.data.message || "Error occurred while adding the product");
            }
        } catch (error) {
            toast.error("Error:", error);
            toast.error("Error occurred while making the request");
        }
    }

    const submitFurniture = async (e) => {
        e.preventDefault();
       
        if (product.Name.trim().length < 1 || product.SKU.trim().length < 1 || Furniture.Dimensions.Length.trim().length < 1 || Furniture.Dimensions.Width.trim().length < 1 || Furniture.Dimensions.Height.trim().length < 1 || Furniture.Furniture_description.trim().length < 1) {
            toast.error("Please fill in all required fields.");
            return;
        }
        try {
            const result = await axios.post("https://testingscandi.000webhostapp.com/Backend/Furniture.php", FurnitureObject, config);

            if (result.data.status === 'valid') {
                history('/');
            } else {
                const errorMessage = result.data.message || "Error occurred while adding the product";
                toast.error(errorMessage);
            }
        } catch (error) {
            toast.error("Error:", error);
            toast.error("Error occurred while making the request");
            if (error.response) {
                toast.error('Server Error:', error.response);
            } else if (error.request) {
                toast.error('No Response:', error.request);
            } else {
                toast.error('Error:', error.message);
            }
        }
    }

    const [selectedOption, setSelectedOption] = useState('');
    const options = [
        { id: 'DVD', text: 'DVD' },
        { id: 'Book', text: 'Book' },
        { id: 'Furniture', text: 'Furniture' }

    ];
    const handleSelectedOption = (e) => {
        setSelectedOption(e.target.value);
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <form className="add-product font-link" id="product_form">
                <div className="product-wrapper">
                    <div className="row title-wrapper ">
                        <div className="col-md-12 text-center mx-4">
                            <h1>Add Product</h1>
                        </div>
                    </div>
                    <div className="row w-50 d-flex justify-content-center text-center">
                        <div className="col-md-12">                          
                                <input
                                    type="text"
                                    name="Name"
                                    id="name"
                                    className="form_control w-100"
                                    placeholder="Product Name *"
                                    value={Name}
                                    onChange={e => handleChange(e)}
                                    required
                                    autoFocus
                                />                         
                        </div>
                    </div>
                    <div className="row w-50 d-flex justify-content-center text-center">
                        <div className="col-md-12">                         
                                <input
                                    type="text"
                                    name="SKU"
                                    id="sku"
                                    className="form_control w-100"
                                    placeholder="Product SKU *"
                                    value={SKU}
                                    onChange={e => handleChange(e)}
                                    required
                                />                         
                        </div>
                    </div>
                    <div className="row w-50 d-flex justify-content-center text-center">
                        <div className="col-md-12">                         
                                <input
                                    type="number"
                                    name="Price"
                                    id="price"
                                    min="0"
                                    className="form_control w-100"
                                    placeholder="Product Price *"
                                    value={Price}
                                    onChange={e => handleChange(e)}
                                    required
                                    autoFocus
                                />                       
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">

                        <select className="mt-2" size='md' variant="dark" id="productType" title="Dropdown button"
                            value={selectedOption} onChange={(e) => handleSelectedOption(e)}>
                            <option>Type Switcher</option>
                            {options.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.text}
                                </option>
                            ))}
                        </select>
                    
                    <button type="button" className="btn btn-add" name="Submit" value="cancel" onClick={e => history('/')}>Cancel</button>
                    </div>

                    <div className={selectedOption === "DVD" ? `DVD` : "DVD d-none"}>
                        <form id="form-dvd">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body dvd-card">
                                            <h5 className="card-title">DVD</h5>
                                            <input
                                                type="number"
                                                name="size"
                                                id="size"
                                                min="0"
                                                className="form_control w-75"
                                                placeholder="Size in MB *"
                                                value={size}
                                                onChange={e => handleDVD(e)}
                                                required
                                                autoFocus
                                            />
                                            <div>
                                                <input
                                                    type="text"
                                                    name="DVD_description"
                                                    className="form_control dvd-card w-75"
                                                    placeholder="DVD Description *"
                                                    value={DVD_description}
                                                    onChange={e => handleDVD(e)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <button type="button" onClick={(e) => submitDVD(e)} className="btn btn-add mt-2" name="Submit" value="Add Product">Save</button>

                            </div>
                        </form>
                    </div>
                    <div className={selectedOption === "Book" ? `Book` : "Book d-none"}>
                        <form id="form-book">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-body book-card">
                                            <h5 className="card-title">Books</h5>
                                            <input
                                                type="number"
                                                name="Weight"
                                                id="weight"
                                                className="form_control w-75"
                                                placeholder="Weight in KG *"
                                                min="0"
                                                value={Weight}
                                                onChange={e => handleBook(e)}
                                                required
                                                autoFocus
                                            />
                                            <div>
                                                <p className="card-text">Product Description</p>
                                                <input
                                                    type="text"
                                                    name="Book_description"
                                                    className="form_control book-card w-75"
                                                    placeholder="Book Description *"
                                                    value={Book_description}
                                                    onChange={e => handleBook(e)}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <button type="button" onClick={(e) => submitBook(e)} className="btn btn-add mt-2" name="Submit" value="Add Product">Save</button>

                            </div>
                        </form>
                    </div>
                    <div className={selectedOption === "Furniture" ? `Furniture` : "Furniture d-none"}>
                        <form id="form-furniture">
                            <div className="row w-75">
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-body furniture-card">
                                            <h5 className="card-title">Furniture</h5>
                                            <p className="card-text">Product Dimensions in cm</p>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col">
                                                        <p>Height *</p>
                                                        <input
                                                            type="number"
                                                            name="Height"
                                                            id="height"
                                                            min="0"
                                                            className="form_control w-75"
                                                            value={Furniture.Dimensions.Height}
                                                            onChange={e => handleFurniture(e)}
                                                            required
                                                            autoFocus
                                                        />
                                                    </div>

                                                    <div className="col">
                                                        <p>Width *</p>
                                                        <form>
                                                            <input
                                                                type="number"
                                                                name="Width"
                                                                id="width"
                                                                className="form_control w-75"
                                                                min="0"
                                                                value={Furniture.Dimensions.Width}
                                                                onChange={e => handleFurniture(e)}
                                                                required
                                                                autoFocus
                                                            />
                                                        </form>
                                                    </div>

                                                    <div className="col">
                                                        <p>Length *</p>
                                                        <form>
                                                            <input
                                                                type="number"
                                                                name="Length"
                                                                id="length"
                                                                min="0"
                                                                className="form_control w-75"
                                                                value={Furniture.Dimensions.Length}
                                                                onChange={e => handleFurniture(e)}
                                                                required
                                                                autoFocus
                                                            />
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    name="Furniture_description"
                                                    placeholder="Furniture Description *"
                                                    className="form_control furniture-card"
                                                    value={Furniture.Furniture_description}
                                                    onChange={e => handleFurniture(e)}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <button type="button" onClick={(e) => submitFurniture(e)} className="btn btn-add mt-2" name="Submit" value="Add Product">Save</button>

                            </div>
                        </form>
                    </div>
                </div>

            </form>
        </>
    );
}

export default AddProduct;