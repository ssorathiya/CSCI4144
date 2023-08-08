// Author: Sahil Sorathiya

import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This function is used to get all booking done by the user
router.get("/mybookings", async (req, res) => {
  try {
    let collection = await db.collection("Events");
    let events = await collection.find({}).toArray();

    let collectionAttnd = await db.collection("Attendees");
    let objUserId = new ObjectId(req.query.userId);

    let attendee = await collectionAttnd.findOne({ userID: objUserId });
    if (attendee === null) {
      const allAttendees = await collectionAttnd.find().toArray();
      const createAttendee = {
        attendeeID: allAttendees[allAttendees.length - 1].attendeeID + 1,
        userID: objUserId,
        bookedTickets: [],
      };
      await collectionAttnd.insertOne(createAttendee);
      attendee = await collectionAttnd.findOne({ userID: objUserId });
    }
    const attended = attendee.bookedTickets.map((ticket) => ticket.eventID);

    // https://upmostly.com/tutorials/react-filter-filtering-arrays-in-react-with-examples
    events = events.filter((event) => attended.includes(event.eventId));

    events = events.map((event) => ({
      ...event,
      qty: attendee.bookedTickets.find(
        (ticket) => ticket.eventID === event.eventId
      ).ticketQuantity,
    }));

    res.send(events).status(200);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Server Error");
  }
});

// This fucntion is used to cancel thebooking by the user using userid and event id
router.post("/eventcancellation", async (req, res) => {
  try {
    const { userId, eventId } = req.body;
    let collection = await db.collection("Attendees");
    let objUserId = new ObjectId(userId);
    let attendee = await collection.findOne({ userID: objUserId });

    const eventTicket = attendee.bookedTickets.filter(
      (ticket) => ticket.eventID == eventId
    );
    const ticketQty = eventTicket[0].ticketQuantity;
    let collectionEvent = await db.collection("Events");
    let event = await collectionEvent.findOne({ eventId: eventId });
    event.totalCollection =
      event.totalCollection - ticketQty * event.ticketPrice;
    event.ticketsBooked = event.ticketsBooked - ticketQty;

    attendee.bookedTickets = attendee.bookedTickets.filter(
      (ticket) => ticket.eventID !== eventId
    );

    await collectionEvent.updateOne({ eventId: eventId }, { $set: event });
    await collection.updateOne({ _id: attendee._id }, { $set: attendee });
    res.send(attendee).status(200);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Server Error");
  }
});


// This function isused to modify the event booking by the user
router.post("/eventmodification", async (req, res) => {
  try {
    const { userId, eventId, qty } = req.body;
    let collection = await db.collection("Attendees");
    let objUserId = new ObjectId(userId);
    let attendee = await collection.findOne({ userID: objUserId });

    const eventTicket = attendee.bookedTickets.filter(
      (ticket) => ticket.eventID == eventId
    );
    const ticketQty = eventTicket[0].ticketQuantity;
    let collectionEvent = await db.collection("Events");
    let event = await collectionEvent.findOne({ eventId: eventId });

    if (ticketQty > qty) {
      event.totalCollection =
        event.totalCollection - (ticketQty - qty) * event.ticketPrice;
      event.ticketsBooked = event.ticketsBooked - (ticketQty - qty);
    } else {
      event.totalCollection =
        event.totalCollection + (qty - ticketQty) * event.ticketPrice;
      event.ticketsBooked = event.ticketsBooked + (qty - ticketQty);
    }

    attendee.bookedTickets = attendee.bookedTickets.map((ticket) => {
      if (ticket.eventID === eventId) {
        return { ...ticket, ticketQuantity: qty };
      } else {
        return ticket;
      }
    });

    await collectionEvent.updateOne({ eventId: eventId }, { $set: event });
    await collection.updateOne({ _id: attendee._id }, { $set: attendee });
    res.send(attendee).status(200);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Server Error");
  }
});

export default router;
