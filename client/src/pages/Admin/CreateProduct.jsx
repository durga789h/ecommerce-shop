import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/category/get-category");
      console.log(data);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping); // Add shipping to FormData
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/product/create-product",
        productData
      );
      console.log(data);
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container mx-auto px-4 py-8 lg:px-0">
        <div className="lg:flex justify-center">
          <div className="lg:w-1/4">
            <AdminMenu />
          </div>
          <div className="lg:w-3/4 lg:px-4">
            <h1 className="text-2xl font-bold mb-4 text-center lg:text-left">Create Product</h1>
            <div className="lg:w-3/4 mx-auto p-3">
              <Select
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3 w-full"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c, i) => (
                  <Option key={i} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-7 mt-3">
                <label className="btn rounded-full w-full cursor-pointer  btn-outline-secondary col-md-12 bg-amber-500 p-5 text-center hover:bg-red-500 hover:text-white">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    className=""
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="border-spacing-2"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3 mt-5">
                <input
                  type="text"
                  value={name}
                  placeholder="Product Name"
                  className="form-control p-3 border border-orange-500 rounded-full w-full"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  value={description}
                  placeholder="Product Description"
                  rows={10}
                  cols={8}
                  className="form-control p-3 border border-orange-500  w-full"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Product Price"
                  className="form-control p-3 border border-orange-500 rounded-full w-full"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Product Quantity"
                  className="form-control p-3 border border-orange-500 rounded-full w-full"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary bg-green-400 text-white rounded p-4 hover:bg-red-500 hover:text-white"
                  onClick={handleCreate}
                >
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
