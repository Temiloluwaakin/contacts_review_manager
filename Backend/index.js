/////1111111111111111/////////////////////
const express = require("express");
const app = express();
const cors = require("cors");
//33333333333333333////
const pool = require("./db");




//11111111////////middleware
app.use(cors());
app.use(express.json());



//create a contact---------------creating a contact and posting to contacts
app.post('/contacts', async (req,res) => {
    try{
        const { first_name } = req.body;
        const { last_name } = req.body;
        const { phone_number } = req.body;
        const { email } = req.body;
        const { birthday } = req.body;
        const { notes } = req.body;
        const newcontact = await pool.query(
            'INSERT INTO contact (first_name, last_name, phone_number, email, birthday, notes) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            [first_name, last_name, phone_number, email, birthday, notes]
        );//RETURNING usd when udt,retur or dlting to clear the jargons in postman along with the [0] innewcontact

        res.json(newcontact.rows[0]);
    }catch (err) {
        console.error(err.message);
    }
});



//CREATE A reviews inside contact
app.post('/contacts/:id/reviews', async (req,res) => {
    try{
        const {id} = req.params
        const {rating} = req.body
        const {comment} = req.body
        const contact_review = await pool.query(
            'INSERT INTO reviews ( rating, comment, contacts_id) VALUES ($1, $2, $3) RETURNING *',
            [ rating, comment, id]
        );
        //select all(*) contacts from contact where the contact id = 1d

        res.json(contact_review.rows[0]);
    }catch (err) {
        console.error(err.message);
    }
});



//get all contacts------------geting all contacts from contacts
app.get('/contacts', async (req,res) => {
    try{
        const allContact = await pool.query('SELECT * FROM contact')

        res.json(allContact.rows);//we dont need [0] because we are returning all
    }catch (err) {
        console.error(err.message);
    }
});



//get all reviews for a contact------------geting all reviewa for a contact
app.get('/contacts/:id/reviews', async (req,res) => {
    try{
        const {id} = req.params;
        const reviews = await pool.query('SELECT * FROM reviews WHERE contacts_id = $1', [id]);
        //select all(*) REVIEWS from REVIEWS where the contact id = 1d

        res.json(reviews.rows);
    }catch (err) {
        console.error(err.message);
    }
});





//get a contact-----------------get a contact(/:id) from all the contacts(/contacts)
app.get('/contacts/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const contact = await pool.query('SELECT * FROM contact WHERE contact_id = $1', [id])
        //select all(*) contacts from contact where the contact id = 1d

        res.json(contact.rows[0]);
    }catch (err) {
        console.error(err.message);
    }
});





//delete a contact
app.delete('/contacts/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const deleteContact = await pool.query('DELETE FROM contact WHERE contact_id = $1', [id]);

        res.json('Contact was deleted!');
    }catch (err) {
        console.error(err.message);
    }
});

///////////////////////////////for heroku////
//app.get("/*", function (req, res) {
//    res.sednFile(
//        path.json(__dirname, "../Frontend/build/index.html"),
//        function (err) {
//            if (err) {
//                res.status(500).send(err);
//            }
//        }
//    );
//});


//const PORT = process.env.PORT || 5001;
//Backend.listen(PORT, () => console.log("listening to port" + PORT));

//2222222/////////////////////////////
app.listen(5000, () => {
    console.log("server has started running on port 5000")
});
