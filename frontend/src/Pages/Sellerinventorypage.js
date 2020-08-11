import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/sellerActions';
 import { saveShop, listShops } from '../actions/shopActions';

export default function Sellerinventorypage(props) {

    let sellerid = props.match.params.id;

    const id = props.match.params.id;
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');

    const shopSave = useSelector(state => state.shopSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = shopSave;

    //This is to fetch all the shops
    const shopList = useSelector(state => state.shopList);
    const { shops, loading } = shopList;

    let object;
    if(!loading)
    {
        let selleridstring = ""+sellerid;
        object = shops.find( x => x.seller_id === selleridstring);
    }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listShops());
        if (successSave) {
            props.history.push("/addproducts/"+id);
        }
        //to check if shop already exsist if so redirect
        if (object) {
            if(object._id)
            {
                console.log(object._id);
                props.history.push("/addproducts/"+id);
            }
        }
        return () => {
          //
        };
      }, [successSave,loading]);


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShop({
            _id: id,
            name, desc, category,
        }));
    }

    return (
        
        <div className="content content-margined">

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
                    
                </ul>
                </form>
            </div>
            
    </div>
    )
}