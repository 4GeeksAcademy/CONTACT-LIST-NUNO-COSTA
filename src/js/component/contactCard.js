import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const ContactCard = () => {
    const { store, actions } = useContext(Context);




    return (
        <>
            <ul className="list-group">
                {store.contacts.map((item, index) => {
                    return (
                        <li key={index} style={{ listStyle: "none" }}>
                            <div className="row border mt-1">
                                <div className="col-10">
                                    <h5 className="card-title mt-2 ms-3">{item.full_name}</h5>
                                    <p className="card-text m-1 ms-3">{item.email}</p>
                                    <p className="card-text m-1 ms-3">{item.address}</p>
                                    <p className="card-text m-1 ms-3">{item.phone}</p>
                                </div>
                                <div className="col-2 d-flex flex-row-reverse align-items-center">
                                    <Link to={`/contactformupdate/${item.id}`}>
                                        <i className="fas fa-pen fa-2x"></i>
                                    </Link>
                                    <i className="fas fa-trash me-2 fa-2x"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            actions.deleteContacts(item.id);
                                        }}></i>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    );
};