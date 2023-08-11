import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";


const router = express.Router();

const generateRandomEventID = () => {
    return Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
};

async function updateOrganizerWithEventId(organizerId, eventId) {
  
    try {
      
      const organizerCollection = db.collection('Organizers');
  
      // Convert the organizerId to an ObjectId for querying MongoDB
      const objectId = new ObjectId(organizerId);
  
      // Update the Organizer document with the event ID
      await organizerCollection.updateOne(
        { userID: objectId },
        { $addToSet: { eventIDs: eventId } }
      );
  
      console.log('Organizer document updated successfully.');
    } catch (error) {
      console.error('Error updating Organizer document:', error);
    } 
  }

// This section will help you create a new record.
// This section also inserts new Events, and adds the events ID in the organizer collection.
router.post("/create", async (req, res) => {

    try{
        
        const collection = await db.collection("Events");
        let isUnique = false;
         let newEventID;

        while (!isUnique) {
            newEventID = generateRandomEventID();

            const existingEvent = await collection.findOne({ eventId: newEventID });

            if (!existingEvent) {
                isUnique = true;
            }
        }

        const newDocument = {
            eventId: newEventID,
            eventVenue: req.body.location,
            eventDate: new Date(req.body.date),
            ticketsBooked: 0,
            totalTickets: parseFloat(req.body.capacity),
            eventStatus: "upcoming",
            totalCollection: 0,
            ticketPrice: parseFloat(req.body.price),
            eventReviews: [],
            overallRating: 0,
            eventName: req.body.eventName,
            description: req.body.description
        };
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);

        const collectionOrg = await db.collection("Organizers");
        const objUserId = new ObjectId(req.body.organizerID);
        const orgUser = await collectionOrg.findOne({ userID: objUserId });

        if(orgUser === null){
            const allOrgs = await collectionOrg.find().toArray();
            const createOrg = {
                    organizerID: allOrgs[allOrgs.length - 1].organizerID+1,
                    userID: objUserId,
                    eventIDs:[newEventID]
            } 
            await collectionOrg.insertOne(createOrg);
            orgUser = await collectionOrg.findOne({ userId: objUserId });

        }
        
        await updateOrganizerWithEventId(req.body.organizerID, newEventID);
        }catch(error){
            console.log(error);
            res.send("Internal server error").status(500);
        }
    
    });
    

export default router;