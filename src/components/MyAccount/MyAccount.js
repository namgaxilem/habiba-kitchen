import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { updateUser } from '../../store/userStore';

function MyAccount() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [company_name, setCompany_name] = useState('');
    const [vat, setVat] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [country_id, setCountry_id] = useState('');
    const [state_id, setState_id] = useState('');
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8069/frontend/my/account', {
            method: 'GET',
            mode: 'no-cors',
            withCredentials: true,
        }).then(result => {
            console.log('my_account', result.data);
            setEmail(result.data.email);
            setName(result.data.name);
            setCompany_name(result.data.company_name);
            setVat(result.data.vat);
            setPhone(result.data.phone);
            setStreet(result.data.street);
            setCity(result.data.city);
            setZip(result.data.zip);
            setCountry_id(result.data.country_id);
            setState_id(result.data.state_id);
            setCountries(result.data.countries);
            setStates(result.data.states);
        }, (error) => {
            console.log("error my_account", error);
        });
    }, []);

    const confirm = () => {
        axios({
            method: "POST",
            withCredentials: true,
            mode: 'no-cors',
            url: `http://localhost:8069/frontend/my/account`,
            params: {
                name: name,
                email: email,
                company_name: company_name,
                vat: vat,
                phone: phone,
                street: street,
                city: city,
                zipcode: zip,
                country_id: country_id,
                state_id: state_id,
            },
            headers: {
                'Content-Type': 'application/text;text/plain;charset=utf-8',
            },
        }).then(value => {
            console.log(value.data)
        });
    };

    return (
        <div class="container">
            <div className="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Company Name</label>
                <input type="text" className="form-control" value={company_name} onChange={(e) => setCompany_name(e.target.value)} />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">VAT Number</label>
                <input type="text" className="form-control" value={vat} onChange={(e) => setVat(e.target.value)} />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Phone</label>
                <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Street</label>
                <input type="text" className="form-control" value={street} onChange={(e) => setStreet(e.target.value)} />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">City</label>
                <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Zip / Postal Code</label>
                <input type="text" className="form-control" value={zip} onChange={(e) => setZip(e.target.value)} />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Country</label>
                <select className="form-control" value={country_id} onChange={(e) => setCountry_id(e.target.value)} >
                    {countries.map(country => <option value={country.id}>{country.name}</option>)}
                </select>
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">State</label>
                <select className="form-control" value={state_id} onChange={(e) => setState_id(e.target.value)} >
                    {states.map(state => <option value={state.id}>{state.name}</option>)}
                </select>
            </div>
            <div class="mt-3 mb-3 dont_have_an_account">
                <a className="btn btn-dark w-100 ms-2" onClick={() => confirm()}>Confirm</a>
            </div>
        </div>
    );
}
export default MyAccount;