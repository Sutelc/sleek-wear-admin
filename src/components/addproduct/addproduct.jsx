import React, { useState } from 'react';
import './addproduct.css';
import upload_area from '../../assets/upload_area.svg';

const Addproduct = () => {
    const [image, setImage] = useState(null); // Fix initial state to null
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        if (!image) {
            alert('Please upload an image');
            return;
        }

        let formData = new FormData();
        formData.append('product', image);

        try {
            const response = await fetch('https://sleek-wear-backend.onrender.com/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

            responseData = await response.json();

            if (responseData.success) {
                product.image = responseData.image_url;
                console.log(product);
                // Optionally: send product details to another API to store in the database
                await fetch ('https://sleek-wear-backend.onrender.com/addproduct', {
                    method: 'POST',
                    headers:{
                       Accept: 'application/json',
                       'Content-Type':'application/json',
                    },
                    body:JSON.stringify(product),
                    
                }).then((resp)=>resp.json()).then((data)=>{
                    data.success?alert("Product Added"):alert("Failed")
                })



            } else {
                console.error('Image upload failed:', responseData.message);
            }
        } catch (error) {
            console.error('Error during image upload:', error);
        }
    };

    return (
        <div className='addproduct'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} alt="Product" className='addproduct-thumnail-img' />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={Add_Product} className='addproduct-btn'>Add</button>
        </div>
    );
};

export default Addproduct;
