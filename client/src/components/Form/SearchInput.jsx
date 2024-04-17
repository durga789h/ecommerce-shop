import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const { search, setSearch } = useSearch(); // Use object destructuring

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   
  };
  console.log(search)
const handclick=async()=>{
  try {
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/product/search/${search.keyword}` // Access keyword from search object
    );
    console.log(data);
    setSearch({ ...search, results: data }); // Update search object with new results
    navigate("/search");
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className="flex items-center">
      <form
        className="flex flex-grow search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="py-1 px-2 w-full md:w-64 rounded-md"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search.keyword} // Access keyword from search object
          onChange={(e) => setSearch({ ...search, keyword: e.target.value })} // Update search object with new keyword
        />
        <button className="bg-white text-black py-1 px-2 rounded-md ml-2 md:ml-0" type="submit" 
        onClick={handclick} >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
