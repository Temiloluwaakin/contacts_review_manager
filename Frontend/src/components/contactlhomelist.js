import { Link } from 'react-router-dom';
import './contacthomelist.css'

const Contacthmlist = ({contacts}) => {


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


    return (
        <div className="chl">
            {contacts.map((contact) => (
                <div className="contact-preview" key={contact.contact_id}>
                    <Link to={`/contacts/${contact.contact_id}`} className='con-ind-prev'>
                        <h3>{contact.first_name} { contact.last_name}</h3>
                        <p>{ contact.phone_number} </p>
                    </Link>
                    <button onClick={() => deleteContact(contact.contact_id)}>del</button>
                </div>
            ))}
        </div>
    );
}
 
export default Contacthmlist;