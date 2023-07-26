import React, { useState } from 'react';
import './headerforhompg.css';


const Homeheader = () => {

    const [isOpen, setIsOpen] = useState(false);

    const [first_name, setFirstname] = useState('');
    const [last_name, setLastname] = useState('');
    const [phone_number, setPhonenumber] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [notes, setNotes] = useState('')

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const body = {first_name, last_name, phone_number, email, birthday, notes};//what is inside descr,make it have a new name of body,,,,then fetch the db
            const response = await fetch('http://localhost:5000/contacts', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)// post what  is inside the body const
        });

        window.location = "/";
        }catch (err) {
            console.error(err.message);
        }
        
    };
    

    const toggleModal = () => {
        setIsOpen(!isOpen);
        setFirstname('');
        setLastname('');
        setPhonenumber('');
        setEmail('');
        setBirthday('');
        setNotes('');
    }

    return (
        <div className="homeheader">
            <button onClick={toggleModal}>ADD</button>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={toggleModal}><button>&times;</button></span>
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text"
                                required
                                value={first_name}//it is displaying the value in const description here
                                placeholder="Firstname"
                                onChange={(e) => setFirstname(e.target.value)}// if we chage wat is inside here, 
                                //the const  description will also change
                            />
                            <input 
                                type="text"
                                required
                                value={last_name}//it is displaying the value in const description here
                                placeholder="Lastname"
                                onChange={(e) => setLastname(e.target.value)}// if we chage wat is inside here, 
                                //the const  description will also change
                            />
                            <input 
                                type="text"
                                required
                                value={phone_number}//it is displaying the value in const description here
                                placeholder="Phonenumber"
                                onChange={(e) => setPhonenumber(e.target.value)}// if we chage wat is inside here, 
                                //the const  description will also change
                            />
                            <input 
                                type="text"
                                value={email}//it is displaying the value in const description here
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}// if we chage wat is inside here, 
                                //the const  description will also change
                            />
                            <input 
                                type="text"
                                value={birthday}//it is displaying the value in const description here
                                placeholder="Birthday"
                                onChange={(e) => setBirthday(e.target.value)}// if we chage wat is inside here, 
                                //the const  description will also change
                            />
                            <input 
                                type="text"
                                value={notes}//it is displaying the value in const description here
                                placeholder="Notes"
                                onChange={(e) => setNotes(e.target.value)}// if we chage wat is inside here, 
                                //the const  description will also change
                            />
                            <button>Add</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default Homeheader;