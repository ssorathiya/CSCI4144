import express from "express";
import cors from "cors";
import LoginInfo from "./routes/Login.mjs";
import organiserDb from "./routes/organiser-events-dashboard.mjs"
import Events from "./routes/Events.mjs";
import Bookings from "./routes/Bookings.mjs";
import NewEventInfo from "./routes/newEventInfo.mjs";
import discussionDb from "./routes/discussions.mjs"

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/loginInfo", LoginInfo);
app.use("/organiserDashboard", organiserDb);
app.use("/events", Events);
app.use("/bookings", Bookings);
app.use("/newEventInfo", NewEventInfo);
app.use("/discussion", discussionDb);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});