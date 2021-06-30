import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup"; //bir sayfada birden fazla export var, bunlar da fonksiyon, siz yıldız koydugunuzda hepsine ulasabiliyorsunuz
import { FormField, Button } from "semantic-ui-react";
import { Select } from 'formik-semantic-ui-react';
import MyTextInput from "../utilities/customFormControls/MyTextInput";
import { useEffect, useState } from "react";
import ProductService from "../services/productService";
import CategoryService from "../services/categoryService";

//binding
export default function ProductAdd() {
  const [categories, setCategories] = useState([]);

  let productService = new ProductService();

  useEffect(() => {
    let categoryService = new CategoryService();
    categoryService
      .getCategories()
      .then((result) => setCategories(result.data.data));
  }, []);

  const initialValues = {
    productName: "",
    unitPrice: 10,
    unitsInStock: 5,
    quantityPerUnit: "Product Description",
    categoryId: 0,
  };

  const schema = Yup.object({
    productName: Yup.string().required("Ürün adı zorunlu"),
    unitPrice: Yup.number().required("Ürün fiyatı zorunlu"),
    unitsInStock: Yup.number().required("Stok adedi zorunlu"),
    quantityPerUnit: Yup.string(),
    categoryId: Yup.number().required("Kategori zorunlu"),
  });

  var categoryOptions = categories.map(function (category) {
    return {
      key: category.categoryId,
      text: category.categoryName,
      value: category.categoryId,
      id: category.categoryId,
    };
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          //values kendi map ediyor, yazdigimiz fieldlere gore
          console.log(values);
          productService
            .add(values)
            .then((response) => console.log(response.data.message));
        }} //submit oldugunda bu fonksiyon calissin(objenin icerisinde fonksiyon)
      >
        {({values,
          handleChange,
          handleBlur,}) => (
          <Form className="ui form">
            {/*kendimi tekrar etmiyorum ve custom formumu, controlumu yaziyorum*/}
            <MyTextInput name="productName" placeholder="Ürün Adı" />
            {/* <FormField>
            <Field name="productName" placeholder="Ürün Adı"></Field>
            <ErrorMessage name="productName" render={error=>
                <Label pointing basic color="red" content={error}></Label>
            }></ErrorMessage>
          </FormField> */}
            {/* <FormField>
            <Field name="unitPrice" placeholder="Ürün Fiyatı"></Field>
            <ErrorMessage name="unitPrice" render={error=>
                <Label pointing basic color="red" content={error}></Label>
            }></ErrorMessage>
          </FormField> */}
            <MyTextInput name="unitPrice" placeholder="Ürün Fiyatı" />
            <MyTextInput name="unitsInStock" placeholder="Stok Adedi" />
            <MyTextInput name="quantityPerUnit" placeholder="Ürün Açıklaması" />
            <FormField>
              <Select
                name="categoryId"
                id={categoryOptions.text}
                onChange={handleChange}
                options={categoryOptions}
                label="Category"
                value={values.categoryId || ""}
                onBlur={handleBlur}
                touched={values.categoryId}
                style={{ display: "block" }}
              ></Select>
            </FormField>
            <Button color="green" type="submit">
              Ekle
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
