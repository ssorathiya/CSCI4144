//Author : Ayush Awasthi
//Date created : 25th July, 2023

// Tutorial 7: https://dal.brightspace.com/d2l/le/content/274269/viewContent/3608669/View
// Tutorial 5: https://dal.brightspace.com/d2l/le/content/274269/viewContent/3608654/View
// Used the above tutorials to configure API

import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from 'mongodb';

const router = express.Router();
// Create a new collection for discussions if it doesn't exist
db.createCollection("Discussions").catch((err) => {
  if (err.codeName === "NamespaceExists") {
    // Since the collection already exists we do not need to make any changes
  } else {
    console.error("Error creating 'Discussions' collection:", err);
  }
});


// This section helps get discussion.
router.get("/discussions/", async (req, res) => {
  const { email } = req.params;

  try {
    const objectId = new ObjectId(email);
    const collection = await db.collection("Discussions");
    const discussion = await collection.find().toArray();

    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }

    res.json(discussion);
  } catch (error) {
    console.error("Error fetching discussion details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// This section helps create a new discussion.
router.post("/discussions/:userId", async (req, res) => {
  try {
    const { email, content } = req.body;
    const userId = req.params;
    // Validate the incoming data 
    if ( !content || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newDiscussion = {
        userId,
    email,
      content,
      createdAt: new Date(),
    };

    const collection = await db.collection("Discussions");
    const result = await collection.insertOne(newDiscussion);
    res.json(result);
  } catch (error) {
    console.error("Error creating a new discussion:", error);
    res.status(500).json({ message: "Internal server error" + error});
  }
});

// This section helps fetch all discussions.
router.get("/discussions", async (req, res) => {
  try {
    const collection = await db.collection("Discussions");
    const discussions = await collection.find().toArray();
    res.json(discussions);
  } catch (error) {
    console.error("Error fetching discussions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;