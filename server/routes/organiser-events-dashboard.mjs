//Author: Rachit Hans
import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb/lib/bson.js";

const router = express.Router();


router.get("/organiser-dashboard", async (req, res) => {
    try {
        
        const collection = await db.collection("Organizers");
        const  organizerId   = 1;
        const objUserId = new ObjectId(req.query.userId)

        const organizer = await collection.findOne({  userID: objUserId});
    
        if (!organizer) {
          return res.status(200).json({ events: [] });
        }
    
        const events = organizer.eventIDs || []; // If 'events' is undefined or null, set it as an empty array
        const eventsCollection = await db.collection("Events");
        const projection = { _id: 0, ticketsBooked: 1, totalCollection: 1, overallRating: 1 };
        const matchingEvents = await eventsCollection.find({ eventId: { $in: events } }, projection).toArray();
       
        const totalTickets = matchingEvents.reduce((sum, event) => sum + (event.ticketsBooked || 0), 0);
        const totalCollection = matchingEvents.reduce((sum, event) => sum + (event.totalCollection || 0), 0);
        const overallRatingsSum = matchingEvents.reduce((sum, event) => sum + parseInt(event.overallRating || 0), 0);
        const totalEvents = matchingEvents.length;
        // Calculate the average of 'overallRating'
        const averageOverallRating = overallRatingsSum / totalEvents;

        return res.status(200).json({  totalTickets, averageOverallRating,totalCollection,totalEvents });  
      } catch (error) {
        console.error("Error while fetching events:", error);
        return res.status(500).json({ error: "Internal Server Error" + error });
      }
    
  });
  
  
router.get("/eventsList", async (req, res) => {
    try {
        const collection = await db.collection("Organizers");
        const { userId }  = req.params;
        const objUserId = new ObjectId(req.query.userId)
        const organizerID = 1;
        const organizer = await collection.findOne({ userID: objUserId });
        if (!organizer) {
          return res.status(200).json({ events: [] });
        }
    
        const events = organizer.eventIDs || []; // If 'events' is undefined or null, set it as an empty array
        const eventsCollection = await db.collection("Events");
        const projection = { _id: 0, ticketsBooked: 0, totalCollection: 0};
        const matchingEvents = await eventsCollection.find({ eventId: { $in: events } }, projection).toArray();

        // Calculate the average of 'overallRating'
        return res.status(200).json({ events: matchingEvents });  
      } catch (error) {
        console.error("Error while fetching events:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    
  });
  router.get("/eventRevenue", async (req, res) => {
    try {
        const collection = await db.collection("Organizers");
        const organizerID = 1;
        const objUserId = new ObjectId(req.query.userId)
        var projection = { _id: 0, eventId: 1 }; // Include only the "eventId" field and exclude the "_id" field
        const organizer = await collection.findOne({ userID: objUserId },projection);
    
        if (!organizer) {
          return res.status(200).json({ events: [] });
        }
    
        const events = organizer.eventIDs || []; // If 'events' is undefined or null, set it as an empty array
        const eventsCollection = await db.collection("Events");
         projection = { _id: 0, totalCollection: 1, eventName: 1 }; // Include only the "eventId" field and exclude the "_id" field
        const matchingEvents = await eventsCollection.find({ eventId: { $in: events } }, projection).toArray();
        const eventName = matchingEvents.map(event => event.eventName);
const totalCollection = matchingEvents.map(event => event.totalCollection);

        // Calculate the average of 'overallRating'
        return res.status(200).json({ totalCollection, eventName });
    

        return res.status(200).json({ events: matchingEvents });  
      } catch (error) {
        console.error("Error while fetching events:", error);
        return res.status(500).json({ error: "Internal Server Error" + error });
      }
    
  });
  router.get("/eventReviews", async (req, res) => {
    try {
        const collection = await db.collection("Organizers");
        const organizerID = 1;
        const objUserId = new ObjectId(req.query.userId)

        const projection = { _id: 0, eventId: 1 }; // Include only the "eventId" field and exclude the "_id" field
        const organizer = await collection.findOne({ userID: objUserId },projection);
    
        if (!organizer) {
          return res.status(200).json({ events: [] });
        }
    
        const events = organizer.eventIDs || []; // If 'events' is undefined or null, set it as an empty array
        const eventsCollection = await db.collection("Events");
        const matchingEvents = await eventsCollection.find({ eventId: { $in: events } }).toArray();
        // Calculate the average of 'overallRating'
        const eventReviews = matchingEvents.map(event => event.eventReviews || []);
        const eventName   = matchingEvents.map(event => event.eventName || []);
        const eventDate   =  matchingEvents.map(event => event.eventDate || []);

        return res.status(200).json({ eventReviews,eventName,eventDate  });
    
      } catch (error) {
        console.error("Error while fetching events:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    
  });

export default router;