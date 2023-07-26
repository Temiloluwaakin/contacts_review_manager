import { Link, useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Reviewpage from '../review/reviewlist';
// this page is meant to show the selected contact/ individual contact
// it gets the -id- of the selected contact and get the contact info from the db
//it has its own index code to -get a contact-

const Contactpage = () => {

    const [contacts, setContacts] = useState([]);
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const handleCancel = () => {
        // Handle the cancel action here
        console.log('Cancelled!');
        setShowModal(false);
    };
    


    const getContact = async () => {
        try{
            const response = await fetch(`http://localhost:5000/contacts/${id}`);
            const jsonData = await response.json();

            setContacts(jsonData);
        }catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        getContact();
    }, []);





    const [reviews, setReviews] = useState([]);
    const displayReview = reviews.slice(0, 2);
    const showEllipsis = reviews.length > 2;


    const getReview = async () => {
        try{
            const response = await fetch(`http://localhost:5000/contacts/${id}/reviews`);
            const jsonData = await response.json();

            setReviews(jsonData);
            console.log(reviews);
        }catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        getReview();
    }, []);




    const deleteContact = async id => {
        try {
            const deleteContact = await fetch(`http://localhost:5000/contacts/${id}`, {
                method: "DELETE"
            });
            window.location = '/';

        } catch (err) {
            console.error(err.message);
        }
    }


    

    const [comment, setComment] = useState([]);
    const [rating, setRating] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const body = {rating, comment};//what is inside descr,make it have a new name of body,,,,then fetch the db
            const response = await fetch(`http://localhost:5000/contacts/${id}/reviews`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)// post what  is inside the body const
        });
        window.location.reload()

        }catch (err) {
            console.error(err.message);
        }
        
    };


    return (
        <div className="contactpg">
            <p> deatail of contact with id</p> 
            <span>
                <button className='btndel' onClick={() => setShowModal(true)}>DEL</button>
                {showModal && (
                    <div className="modal">
                    <div className="modal-content">
                        <p>Are you sure?</p>
                        <button onClick={() => deleteContact(contacts.contact_id)}>Yes</button>
                        <button onClick={handleCancel}>No</button>
                    </div>
                    </div>
                )}



                <button className='addreview' onClick={() => setShowModal2(true)}>Add review</button>
                {showModal2 && (
                    <div className="modal">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="numeric"
                                required
                                value={rating}//it is displaying the value in const description here
                                placeholder="Rating /10"
                                onChange={(e) => setRating(e.target.value)}// if we chage wat is inside here, 
                                //the const  description will also change
                            />
                            <input 
                                type="text"
                                required
                                value={comment}//it is displaying the value in const description here
                                placeholder="Comment"
                                onChange={(e) => setComment(e.target.value)}// if we chage wat is inside here, 
                                //the const  description will also change
                            />
                            <button>Yes</button>
                        </form>
                    </div>
                    </div>
                )}
            </span>
            

            {contacts && (//get the contact from CONST CONTACT AND DESIGN IT LITH THE BELOW
                <div className="ddt">
                    <div className='fff'>
                        <h2> {contacts.first_name} </h2>
                        <p> {contacts.last_name }</p>
                        <p> {contacts.email} </p>
                        <p> {contacts.phone_number} </p>
                        <p> {contacts.birthday} </p>
                    </div>
                    <div className='review'>
                        <Link to={`/contacts/${contacts.contact_id}/reviews`} className='con-ind-prev'>
                            REVIEWS
                        </Link>
                        {reviews &&
                            <Reviewpage 
                                reviews={displayReview}
                            />
                        }
                        <Link to={`/contacts/${contacts.contact_id}/reviews`} className='con-ind-prev'>
                            {showEllipsis && <h2>(....)</h2>}
                        </Link>
                    </div>
                </div>
            )}
            
        </div>
    );
}
 
export default Contactpage;