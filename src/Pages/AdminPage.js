import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import swal from "sweetalert";

function AdminPage({ onCreatedProduct }) {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [products, setProducts] = useState([]);

  const [productname, setProductName] = useState("");
  const [pdesc, setPDesc] = useState("");
  const [price, setProductPrice] = useState("");
  const [id, setId] = useState(0);
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [catid, setCatId] = useState("");

  const [validated, setValidated] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://rahmahsaif-app-9ed0f6bb8452.herokuapp.com/api/product");
      setProducts(response.data);
    } catch (error) {
      swal("Error", error.message, "error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCloseAdd = () => {
    setShowAdd(false);
    setValidated(false);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setValidated(false);
  };

  const handleShowAdd = () => setShowAdd(true);

  const handleShowEdit = () => setShowEdit(true);

  const handleSubmitAdd = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      await addProduct();
    }
    setValidated(true);
  };

  const handleSubmitEdit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      await modifyProduct(id);
    }
    setValidated(true);
  };

  const handleChange = (event) => {
    setImage(event.target.files[0].name);
    setFile(event.target.files[0]);
  };

  const addProduct = async () => {
    const url = "https://rahmahsaif-react-8a5b146dcade.herokuapp.com/images";
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      await axios.post(url, formData, config);
      await axios.post("https://rahmahsaif-app-9ed0f6bb8452.herokuapp.com/api/product", {
        productName: productname,
        productDescription: pdesc,
        productPrice: price,
        productImage: image,
        categoryid: catid,
      });
      onCreatedProduct();
      fetchProducts();
      setValidated(false);
      handleCloseAdd();
      swal("Success", "Product added successfully!", "success");
    } catch (error) {
      swal("Error", error.message, "error");
    }
  };

  const getProductEdit = async (id) => {
    try {
      const response = await axios.get(`https://rahmahsaif-app-9ed0f6bb8452.herokuapp.com/api/product/${id}`);
      setId(response.data[0].Id);
      setProductName(response.data[0].ProductName);
      setPDesc(response.data[0].ProductDescription);
      setProductPrice(response.data[0].ProductPrice);
      setImage(response.data[0].ProductImage);
      setCatId(response.data[0].CategoryId);
      handleShowEdit();
    } catch (error) {
      alert("error:" + error);
    }
  };

  const modifyProduct = async (id) => {
    if (file) {
      const url = "https://rahmahsaif-react-8a5b146dcade.herokuapp.com/images";
      const formData = new FormData();
      formData.append("file", file);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      await axios.post(url, formData, config);
    }

    try {
      await axios.put(`https://rahmahsaif-app-9ed0f6bb8452.herokuapp.com/api/product/${id}`, {
        id: id,
        productName: productname,
        productDescription: pdesc,
        productPrice: price,
        productImage: image,
        categoryid: catid,
      });
      fetchProducts();
      handleCloseEdit();
      swal("Success", "Product updated successfully!", "success");
    } catch (error) {
      swal("Error", error.message, "error");
    }
  };

  const deleteProduct = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover Product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`https://rahmahsaif-app-9ed0f6bb8452.herokuapp.com/api/product/${id}`);
          fetchProducts();
          swal("Product has been deleted!", {
            icon: "success",
          });
        } catch (error) {
          swal("Error", error.message, "error");
        }
      } else {
        swal("Product is safe!");
      }
    });
  };

  return (
    <Container fluid className="admin-page-content" style={{ marginTop: "15vh" }}>
      <h2>Admin Panel</h2>
      <Button variant="primary" onClick={handleShowAdd}>
        Add Product
      </Button>

      <Table striped bordered hover responsive className="mt-4 text-wrap">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Product Image</th>
            <th>Category Id</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.Id}>
              <td>{p.Id}</td>
              <td>{p.ProductName}</td>
              <td>{p.ProductDescription}</td>
              <td>{p.ProductPrice}</td>
              <td>
                <img
                  variant="top"
                  src={`https://rahmahsaif-react-8a5b146dcade.herokuapp.com/images/${p.ProductImage}`}
                  alt={p.ProductName}
                  className="img-fluid"
                  style={{ maxWidth: '100px' }}
                />
              </td>
              <td>{p.CategoryId}</td>
              <td onClick={() => getProductEdit(p.Id)} style={{ cursor: 'pointer' }}>
                <i className="bi bi-pencil-square"></i>
              </td>
              <td onClick={() => deleteProduct(p.Id)} style={{ cursor: 'pointer' }}>
                <i className="bi bi-trash3"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Form noValidate validated={validated} onSubmit={handleSubmitAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter product name"
                value={productname}
                onChange={(e) => setProductName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a product name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter product description"
                value={pdesc}
                onChange={(e) => setPDesc(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a product description.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter product price"
                value={price}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a product price.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formProductCategoryId">
              <Form.Label>Category Id</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter category id"
                value={catid}
                onChange={(e) => setCatId(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a category id.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formProductImage">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                required
                type="file"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please select an image.
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAdd}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Form noValidate validated={validated} onSubmit={handleSubmitEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter product name"
                value={productname}
                onChange={(e) => setProductName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a product name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter product description"
                value={pdesc}
                onChange={(e) => setPDesc(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a product description.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter product price"
                value={price}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a product price.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formProductCategoryId">
              <Form.Label>Category Id</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter category id"
                value={catid}
                onChange={(e) => setCatId(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a category id.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formProductImage">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                required
                type="file"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please select an image.
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default AdminPage;
