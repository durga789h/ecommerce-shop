import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/prices";
import { useCart } from "../context/card";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";

const text4 = {
  textShadow: '2px 2px 4px fuchsia', // Adding text shadow
  textDecoration: 'aqua',
};

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8000/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Handle category filter
  const handleFilter = (value, id) => {
    if (value) {
      setChecked([...checked, id]);
    } else {
      setChecked(checked.filter((c) => c !== id));
    }
  };

  useEffect(() => {
    if (!checked.length && !radio) {
      getAllProducts();
    } else {
      filterProducts();
    }
  }, [checked, radio]);

  // Filter products
  const filterProducts = async () => {
    try {
      const { data } = await axios.post("http://localhost:8000/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8000/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Add product to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item added to cart");
  };

  return (
    <Layout title={"All Products - Best Offers"}>
      <img
        src="/images/banner.png"
        className="banner-img"
        alt="banner image"
        style={{ width: "100%" }}
      />
      <div className="container mx-auto mt-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Sidebar for filters */}
          <div className="md:col-span-1">
            <h4 className="text-center">Filter By Category</h4>
            <div className="flex flex-col">
              {categories?.map((c, index) => (
                <Checkbox
                  key={index}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="flex flex-col">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p, index) => (
                  <div key={index}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="flex flex-col mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
          {/* Products list */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products?.map((p, index) => (
              <div className="card" key={index}>
                <img
                  src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-red-700 text-center mb-2">{p.name}</h5>
                  <h5 className="card-title card-price text-lime-600 text-center">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                  <p className="card-text text-center mt-2">{p.description.substring(0, 60)}...</p>
                  <div className="card-actions flex justify-center mt-4">
                    <button
                      className="btn btn-info ms-1"
                      style={text4}
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1 bg-fuchsia-700 text-white rounded-md p-2"
                      onClick={() => addToCart(p)}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Load more button */}
          <div className="md:col-span-4 flex justify-center">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={() => setPage(page + 1)}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    Load More <AiOutlineReload className="ml-2" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
