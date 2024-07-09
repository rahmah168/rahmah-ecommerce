import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import './ProductList.css';  // Import the CSS file here

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3004/api/product");
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3004/api/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterProducts(event.target.value, selectedCategory);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    filterProducts(searchTerm, event.target.value);
  };

  const filterProducts = (term, category) => {
    let filtered = products;

    // Apply search term filter
    if (term) {
      filtered = filtered.filter((product) =>
        product.ProductName.toLowerCase().includes(term.toLowerCase())
      );
    }

    // Apply category filter
    if (category) {
      filtered = filtered.filter((product) => product.CategoryId === parseInt(category));
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    // Implement your add to cart logic here
    console.log("Added to cart:", product);
  };

  return (
    <Container style={{marginTop: "15vh"}}>
      <div className="search-filter-container mb-3 " >
        <Form className="d-flex align-items-center gap-3">
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <Form.Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="category-dropdown"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.CategoryId} value={category.CategoryId}>
                {category.CategoryName}
              </option>
            ))}
          </Form.Select>
        </Form>
      </div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <Col key={p.Id}>
              <Card className="h-100 shadow-sm">
                <div className="product-image">
                  <Card.Img
                    variant="top"
                    src={`images/${p.ProductImage}`} 
                    alt={p.ProductName}
                    className="img-fluid"
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{p.ProductName}</Card.Title>
                  <Card.Text style={{ textAlign: 'justify' }}>{p.ProductDescription}</Card.Text>
                  <Card.Text>Price: {p.ProductPrice} OMR</Card.Text>
                  <Button variant="primary" onClick={() => handleAddToCart(p)}>
                    ADD TO CART
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No products found.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ProductList;
