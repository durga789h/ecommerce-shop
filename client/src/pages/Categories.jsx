import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
import { Select } from "antd";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((c,i) => (
            <div key={i} className="flex items-center justify-center">
              <div className="bg-white shadow-md rounded-md p-4 w-full">
                <Link
                  to={`/category/${c.slug}`}
                  className="block text-center text-lg font-semibold text-primary hover:text-primary-dark"
                >
               {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
