import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {
  const {search, setSearch} = useSearch();
  console.log(search)

  return (
    <Layout title={"Search results"}>
      <div className="container mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold mt-8">Search Results</h1>
          <h6 className="mt-2">
            {search?.results && search.results.length < 1
              ? "No Products Found"
              : `Found ${search?.results.length}`}
          </h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
            {search?.results && search.results.map((p,i) => (
              <div key={i} className="card">
                <img
                  src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <p className="card-text"> $ {p.price}</p>
                  <div className="flex justify-center">
                    <button className="btn btn-primary mx-1">More Details</button>
                    <button className="btn btn-secondary mx-1">ADD TO CART</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
