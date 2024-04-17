import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/card";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const [category, setCategories] = useState([]); //taken from cateogories.jsx
  const [products, setProducts] = useState([]);  //taken from homepage.jsx

  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  useEffect(() => {
    getAllCategory();
  }, []);

  // Get product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/get-product/${params.slug}`
      );
      console.log(data);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
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







  //category data 
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/category/get-category");
      console.log(data)
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/related-product/${pid}/${cid}`
      );
      console.log(data)
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center md:justify-between">
          <div className="md:w-1/2">
            <img
              src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="card-img-top h-auto w-full md:w-96 mx-auto"
            />
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <h1 className="text-center md:text-left text-2xl mb-4">
              Product Details
            </h1>
            <hr className="mb-4" />
            <h6>Name: {product.name}</h6>
            <h6>Description: {product.description}</h6>
            <h6>
              Price:{" "}
              {product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h6>
            <h6>Category: {category ? category.name : 'N/A'}</h6>

            <button className="btn btn-secondary mt-4 md:mt-6 bg-blue-800 text-white rounded-md p-4"   onClick={() => {
                          setCart([...cart, products]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, products])
                          );
                          toast.success("Item Added to cart");
                        }}>ADD TO CART</button>
          </div>
        </div>
      </div>
      <hr className="my-8" />
      <div className="container mx-auto">
        <h4 className="text-center mb-4">Similar Products ➡️</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {relatedProducts.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          {relatedProducts?.map((p) => (
            <div className="card" key={p._id}>
              <img
                src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="card-text">{p.description.substring(0, 60)}...</p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
