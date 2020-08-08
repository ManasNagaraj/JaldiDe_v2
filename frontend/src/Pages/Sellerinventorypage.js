import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/sellerActions';
 import { saveShop } from '../actions/shopActions';

export default function Sellerinventorypage(props) {

    const [modalVisible, setModalVisible] = useState(false);
    const id = props.match.params.id;
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');

    const shopSave = useSelector(state => state.shopSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = shopSave;
    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            props.history.push("/addproducts/"+id);
          //setModalVisible(false);
        }
        return () => {
          //
        };
      }, [successSave]);

    const openModal = (shop) => {
        setModalVisible(true);
        setName(shop.name);
        setDesc(shop.desc);
        setCategory(shop.category);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShop({
            _id: id,
            name, desc, category,
        }));
    }

    return (
        
        <div className="content content-margined">

            <div className="product-header">
            <button className="button primary" onClick={() => openModal({})}>Create your Virtual Shop</button>
            </div>
            {
            modalVisible &&
            <div className="form">
                <form onSubmit={submitHandler} >
                <ul className="form-container">
                    <li>
                    <h2>Create your virtual Shop</h2>
                    </li>
                    <li>
                    {loadingSave && <div>Loading...</div>}
                    {errorSave && <div>{errorSave}</div>}
                    </li>

                    <li>
                    <label htmlFor="name">
                        Shop Name
                    </label>
                    <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)}>
                    </input>
                    </li>

                    <li>
                    <label htmlFor="description">
                        Description
                    </label>
                    <textarea name="description" value={desc} id="desc" onChange={(e) => setDesc(e.target.value)}></textarea>
                    </li>
                    <li>

                    <li>
                    <label htmlFor="name">
                        Category
                    </label>
                    <input type="text" name="category" value={category} id="category" onChange={(e) => setCategory(e.target.value)}>
                    </input>
                    </li> 

                    <button type="submit" className="button primary">Create Shop</button>
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

{/* <div>
<h3>Wassup new Seller, you can make your own virtual shop here</h3>
<h2>{props.match.params.id}</h2>
</div> */}