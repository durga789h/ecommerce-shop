import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="mb-3 w-full md:w-3/4 lg:w-1/2">
          <input
            type="text"
            className="py-2 px-4 w-full rounded-md"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md w-full md:w-auto">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
