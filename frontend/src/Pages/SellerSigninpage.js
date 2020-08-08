import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/sellerActions';

export default function SellerSigninpage(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const sellerSignin = useSelector(state => state.sellerSignin);
    const { loading, sellerInfo, error } = sellerSignin;
    const dispatch = useDispatch();

    useEffect(() => 
    {
        if (sellerInfo) {
        props.history.push("/createshop/"+sellerInfo._id);
        }
        return () => {
        //
        };
    }, [sellerInfo]);

    const submitHandler = (e) => 
    {
        e.preventDefault();
        dispatch(signin(email, password));
    }

    return (
        <div>
            <div className="form">
            <form onSubmit={submitHandler} >
            <ul className="form-container">
                <li>
                <h2>Seller Sign-In</h2>
                </li>
                <li>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                </li>
                <li>
                <label htmlFor="email">
                    Email
                </label>
                <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
                </input>
                </li>
                <li>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
                </input>
                </li>
                <li>
                <button type="submit" className="button primary">Signin</button>
                </li>
                <li>
                New as a Seller on JaldiDe?
                </li>
                <li>
                <Link to="/register" className="button secondary text-center" >Create your JaldiDe Seller account</Link>
                </li>
            </ul>
            </form>
        </div>
        </div>
    )
}
