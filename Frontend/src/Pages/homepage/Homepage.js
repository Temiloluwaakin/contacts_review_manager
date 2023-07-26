import Contacthmlist from "../../components/contactlhomelist";
import {useState, useEffect} from 'react';
import './homepage.css'
import Homeheader from "../../components/headerforhompg";


const Homepage = () => {

    const [contacts, setContacts] = useState([]);



    //to display the contacts by geting from db...it gets the contacts from db and then make them = const contacts above
    const getContacts = async () => {
        try{
            const response = await fetch('http://localhost:5000/contacts');
            const jsonData = await response.json();

            setContacts(jsonData);
        }catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        getContacts();
    }, []);
    

    return (
        <div className="homepage">
            <Homeheader />
            <h2>ALL CONTACTS</h2>
            <div>
                {contacts &&
                    <Contacthmlist 
                        contacts={contacts}
                    />
                }
                
            </div>
        </div>
    );
}


 
export default Homepage;