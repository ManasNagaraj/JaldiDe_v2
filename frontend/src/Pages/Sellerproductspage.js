import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listShops, deleteProduct } from '../actions/shopActions';
import Axios from 'axios';

export default function Sellerproductspage(props) {
  let sellerid = props.match.params.id;

  const [modalVisible, setModalVisible] = useState(false);
  const [pname, setPName] = useState('');
  const [pdesc, setPDesc] = useState('');
  const [pprice, setPPrice] = useState('');
  const [p_id, setId] = useState('');
  const [image, setImage] = useState('');
  const [Uploading, setUploading] = useState(false);

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const shopList = useSelector((state) => state.shopList);
  const { shops, loading } = shopList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listShops());
    if (successSave) {
      //props.history.push("/addproducts/"+id);
      setModalVisible(false);
    }
    return () => {
      //
    };
  }, [successSave]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setPName(product.pname);
    setPDesc(product.pdesc);
    setPPrice(product.pprice);
    setImage(product.image);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: sellerid,
        pname,
        pdesc,
        pprice,
        product_id: p_id,
        image,
      })
    );
  };

  //getting the particular productItems from the whole shop object via Seller_id
  let products;
  if (!loading) {
    let selleridstring = '' + sellerid;
    let object = shops.find((x) => x.seller_id === selleridstring);
    if (object) {
      products = object.productItems;
    }
  }

  const UploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    Axios.post('api/upload/s3', bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  const deleteHandler = (product) => {
    dispatch(deleteProduct({ prod_id: product._id, sel_id: sellerid }));
  };

  return (
    <div className='content content-margined'>
      <div className='product-header'>
        <button className='button primary' onClick={() => openModal({})}>
          Add Products to your Shop
        </button>
      </div>
      {modalVisible && (
        <div className='form'>
          <form onSubmit={submitHandler}>
            <ul className='form-container'>
              <li>
                <h2>Add Products/Items</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor='name'>Product Name</label>
                <input
                  type='text'
                  name='pname'
                  value={pname}
                  id='pname'
                  onChange={(e) => setPName(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor='description'>Product Description</label>
                <textarea
                  name='description'
                  value={pdesc}
                  id='pdesc'
                  onChange={(e) => setPDesc(e.target.value)}
                ></textarea>
              </li>
              <li>
                <label htmlFor='image'>Image</label>
                <input
                  type='text'
                  name='image'
                  value={image}
                  id='image'
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                <input type='file' onChange={UploadFileHandler}></input>
                {Uploading && <div>Uploading...</div>}
              </li>
              <li>
                <li>
                  <label htmlFor='name'>Product Price</label>
                  <input
                    type='text'
                    name='price'
                    value={pprice}
                    id='pprice'
                    onChange={(e) => setPPrice(e.target.value)}
                  ></input>
                </li>

                <button type='submit' className='button primary'>
                  Create Product
                </button>
              </li>
              <li>
                <button
                  type='button'
                  onClick={() => setModalVisible(false)}
                  className='button secondary'
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      {products ? (
        <div className='product-list'>
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <div>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.pname}</td>
                    <td>{product.pprice}</td>
                    <td>{product.pdesc}</td>
                    <td>
                      <button
                        className='button'
                        onClick={() => openModal(product)}
                      >
                        Edit
                      </button>{' '}
                      <button
                        className='button'
                        onClick={() => deleteHandler(product)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </div>
            </tbody>
          </table>
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}
