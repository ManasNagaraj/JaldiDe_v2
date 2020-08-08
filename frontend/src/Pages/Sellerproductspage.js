
import React, { useEffect ,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listShops } from '../actions/shopActions';

export default function Sellerproductspage(props) {

    const [modalVisible, setModalVisible] = useState(false);
    const sellerid = props.match.params.id;
    const [pname, setPName] = useState('');
    const [pdesc, setPDesc] = useState('');
    const [pprice, setPPrice] = useState('');

    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

    const shopList = useSelector(state => state.shopList);
    const { shops, loading, error } = shopList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listShops());
        if (successSave) {
            //props.history.push("/addproducts/"+id);
          //setModalVisible(false);
        }
        return () => {
          //
        };
      }, [successSave]);

    const openModal = (product) => {
        setModalVisible(true);
        setPName(product.pname);
        setPDesc(product.pdesc);
        setPPrice(product.pprice);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({
            _id: sellerid,
            pname, pdesc, pprice,
        }));
    }

    // if(shops)
    // {
    //     //console.log(shops)
    //     const stuf = shops.find( x => x.seller_id === sellerid);
    //     console.log(stuf.name);
    // }

    return (
        
        <div className="content content-margined">

            <div className="product-header">
            <button className="button primary" onClick={() => openModal({})}>Add Products to your Shop</button>
            </div>
            {
            modalVisible &&
            <div className="form">
                <form onSubmit={submitHandler} >
                <ul className="form-container">
                    <li>
                    <h2>Add Products/Items</h2>
                    </li>
                    <li>
                    {loadingSave && <div>Loading...</div>}
                    {errorSave && <div>{errorSave}</div>}
                    </li>

                    <li>
                    <label htmlFor="name">
                        Product Name
                    </label>
                    <input type="text" name="pname" value={pname} id="pname" onChange={(e) => setPName(e.target.value)}>
                    </input>
                    </li>

                    <li>
                    <label htmlFor="description">
                        Product Description
                    </label>
                    <textarea name="description" value={pdesc} id="pdesc" onChange={(e) => setPDesc(e.target.value)}></textarea>
                    </li>
                    <li>

                    <li>
                    <label htmlFor="name">
                        Product Price
                    </label>
                    <input type="text" name="price" value={pprice} id="pprice" onChange={(e) => setPPrice(e.target.value)}>
                    </input>
                    </li> 

                    <button type="submit" className="button primary">Create Product</button>
                    </li>
                    <li>
                    <button type="button" onClick={() => setModalVisible(false)} className="button secondary">Back</button>
                    </li>
                </ul>
                </form>
            </div>
            }
    </div>
    )
}