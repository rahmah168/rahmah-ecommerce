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
    formData.append("fileName", file.name);
    alert(file.name)
    const config = {
      
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log("im in console post")
      alert("inside axios post")
      console.log(response.data);
    });

    try {
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
      formData.append("fileName", file.name);
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
    <Container fluid className="admin-page-content" style={{marginTop: "15vh"}}>
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
                <i className="bi bi-trash-fill"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="post" encType="multipart/form-data" noValidate validated={validated} onSubmit={handleSubmitAdd}>
            <Form.Group className="mb-3" controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your Product Name"
                autoFocus
                onChange={(e) => setProductName(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please choose a product name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductDesc">
              <Form.Label>Product Description</Form.Label>
              <Form.Control as="textarea" rows={3} 
                required
                placeholder="Enter product description"
                onChange={(e) => setPDesc(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter a product description.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductPrice">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                required
                type="float"
                placeholder="Enter product price"
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter a product price.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategoryId">
              <Form.Label>Category Id</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter Category Id"
                onChange={(e) => setCatId(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter a Category Id.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control type="file" onChange={handleChange} />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAdd}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmitEdit}>
            <Form.Group className="mb-3" controlId="formProductNameEdit">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={productname}
                placeholder="Enter Product Name"
                autoFocus
                onChange={(e) => setProductName(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please choose a product name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductDescEdit">
              <Form.Label>Product Description</Form.Label>
              <Form.Control as="textarea" rows={3} 
                required
                value={pdesc}
                placeholder="Enter product description"
                onChange={(e) => setPDesc(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter a product description.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductPriceEdit">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                required
                type="float"
                value={price}
                placeholder="Enter product price"
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter a product price.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategoryIdEdit">
              <Form.Label>Category Id</Form.Label>
              <Form.Control
                required
                type="number"
                value={catid}
                placeholder="Enter Category Id"
                onChange={(e) => setCatId(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter a Category Id.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formFileEdit" className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control type="file" onChange={handleChange} />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEdit}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default AdminPage;
