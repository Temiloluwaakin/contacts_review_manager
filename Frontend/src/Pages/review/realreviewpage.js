import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Reviewpage from './reviewlist';

//this page is where the revies from the database is put. so we fetch from the review database and 
//puts it in the constant reviews. the id is so that it also brings the id of the selected contacts
const Rreviewpage = () => {


    const [reviews, setReviews] = useState([]);
    const { id } = useParams();


    const getReview = async () => {
        try{
            const response = await fetch(`http://localhost:5000/contacts/${id}/reviews`);
            const jsonData = await response.json();

            setReviews(jsonData);//when it fetches the review from db, it insertts it into (setreview, review)
            console.log(reviews);
        }catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        getReview();
    }, []);


    return (


        <div className="review page">
            {reviews &&//              here, it puts the reviewpage/reviewlist design here and inserts the revieews into it by making the name similar
                <Reviewpage // 0r get the reviews from the -const review- and design it like the reviewpage design
                    reviews={reviews}
                />
            }
        </div>
    );
}
 
export default Rreviewpage;