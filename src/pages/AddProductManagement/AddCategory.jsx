import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import SelectComponent from '../../components/SelectComponent';
import { addCategory, addChildCategory, addSubCategory, getAllCategories, getSubCategorybyCategory } from '../../api/admin-api';
import { convertToBase64 } from '../../utils/additionalFunction';
import Swal from 'sweetalert2';
import PageLoader from '../../components/ui/PageLoader';
import ButtonWithIcon from '../../components/ButtonWithIcon';

const CategoryTabs = () => {
  const [tab, setTab] = useState('category');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [categoryInput, setCategoryInput] = useState({ name: '', image: '' });
  const [subcategoryInput, setSubcategoryInput] = useState({ category: '', subcategory: '' });
  const [subSubcategoryInput, setSubSubcategoryInput] = useState({ category: '', subcategory: '', subsubCategory: '' });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    // fetchCategories();
  }, []);


  const handleAddCategory = async () => {
    try {
      setLoading(true);
      const response = await addCategory(categoryInput);
      setCategories((prev) => [...prev, response?.category]);
      setCategoryInput({ name: '', image: '' });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Category added successfully',
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.message || 'Something went wrong',
      })
    } finally {
      setLoading(false);
    }
  };




  const tabVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const base64 = await convertToBase64(file);
      setCategoryInput({ ...categoryInput, image: base64 });
    } catch (err) {
      console.error("Error converting image to base64:", err);
    }
  };

  // useEffect(() => {
  //   const fetchSubcategories = async () => {
  //     try {
  //       const response = await getSubCategorybyCategory(subSubcategoryInput.category);
  //       setSubcategories(response?.subcategories);
  //     } catch (error) {
  //       console.error('Error fetching subcategories:', error);
  //     }
  //   };

  //   if (subSubcategoryInput.category) {
  //     fetchSubcategories();
  //   }


  // }, [subSubcategoryInput.category])

  return (
    <>
      {console.log(tab)}
      {loading && (<PageLoader />)}
      <div className="p-6 bg-white shadow-xl rounded-xl">
        {/* Tabs */}
        <div className="flex justify-around  p-4 rounded-md">
          <ButtonWithIcon title="Add Category" bgcolor={tab === 'category' ? "bg-red-500" : ""}
            onClick={() => setTab('category')}
            className={tab === 'category' ? "border-b border-white" : ""}
          />
        
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {tab === 'category' && (
            <motion.div
              key="category"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 mt-4"
            >

              <InputField
                type="text"
                label={"Category Name"}
                placeholder="Category Name"
                value={categoryInput.name}
                onChange={(e) => setCategoryInput({ ...categoryInput, name: e.target.value })}
                className="border p-2 rounded w-full"
              />
              <input
                type="file"

                accept="image/*"
                placeholder="Category Image URL"
                onChange={handleImageChange}
                className="border p-2 rounded"
              />


              <Button title={"Add Category"} onClick={handleAddCategory} />

            </motion.div>
          )}

        
          {/* {tab === 'subsubcategory' && (
            <motion.div
              key="subsubcategory"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 mt-4"
            >
              <SelectComponent
                options={categories}
                optionlabel="name"
                optionvalue="name"
                value={subSubcategoryInput.category}
                onChange={(e) => setSubSubcategoryInput({ ...subSubcategoryInput, category: e.target.value })}
                label={"Select Category"}
                placeholder={"Select Category"}
                name={"category"}
              />

              {subcategories.length > 0 ? (
                <>
                  <SelectComponent
                    optionlabel="name"
                    optionvalue="name"
                    options={subcategories}
                    value={subSubcategoryInput.subcategory}
                    onChange={(e) =>
                      setSubSubcategoryInput({
                        ...subSubcategoryInput,
                        subcategory: e.target.value,
                      })
                    }
                    label={"Select Subcategory"}
                    placeholder={"Select Subcategory"}
                    name={"subcategory"}
                  />
                  <InputField
                    type="text"
                    placeholder="Child Category Name"
                    value={subSubcategoryInput.name}
                    onChange={(e) => setSubSubcategoryInput({ ...subSubcategoryInput, subsubCategory: e.target.value })}
                    className="border p-2 rounded"
                  />

                  <Button title={"Add Child Category"} onClick={handleAddSubSubcategory} disabled={subcategories.length === 0} />
                </>

              ) : (
                <div className="text-red-500 text-sm">
                  No subcategories available for the selected category.
                </div>
              )}



            </motion.div>
          )} */}
        </AnimatePresence>
      </div>
    </>

  );
};

export default CategoryTabs;
