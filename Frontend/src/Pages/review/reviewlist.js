
//we use this since we are exporting the reciews list and design to the page where it wii be disp
const Reviewpage = ({reviews}) => {
    


    return (
        <div className="reviewpg">
            {reviews.map((review) => (
                <div className="ddt" key={review.review_id}>
                    <div className='fff'>
                        <h2> {review.rating} </h2>
                        <p> {review.comment }</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
 
export default Reviewpage;