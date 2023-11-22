import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";


import { Context } from "../store/appContext";

export const Contactform = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()


    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAdress] = useState("")
    const [phone, setPhone] = useState("")

    const formData = {
        full_name: fullName,
        email: email,
        address: address,
        phone: phone,
        agenda_slug: "Nuno"
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        actions.createContact(formData)
        navigate("/")
    }


    return (
        <div className="container">
            <form className="form-control " onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="fullname" required value={fullName} onChange={event => setFullName(event.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" required value={email} onChange={event => setEmail(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" required value={address} onChange={event => setAdress(event.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone" required value={phone} onChange={event => setPhone(event.target.value)}/>
                    <input type="submit" value="Send Request" />
                </div>
            </form>
        </div>
    );
};