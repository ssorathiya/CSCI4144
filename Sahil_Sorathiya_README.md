<!--- The following README.md sample file was adapted from https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md by Gabriella Mosquera for academic use --->

# Assignment 3 -Individual and Group

- _Date Created_: 25 07 2023
- _Last Modification Date_: 28 07 2023
- _GitLab URL_: https://git.cs.dal.ca/sorathiya/csc-4177-group-20/-/tree/sahil?ref_type=heads
- _GitLab Group URL_: https://git.cs.dal.ca/sorathiya/csc-4177-group-20
- _Website URL_: https://eventmastera3.netlify.app/

## Authors

- [Sahil Sorathiya](sahil.sorathiya@dal.ca) - _(Part of Group Assignment)_

## Feature Worked On
1.  Booking System
    1. Book for an event
    2. Modify event booking
    3. Cancel event booking


## Files Worked On
- [Bookings.mjs](https://git.cs.dal.ca/sorathiya/csc-4177-group-20/-/blob/sahil/server/routes/Bookings.mjs) - This file provides api that is required to make modify and delete the recent tickets.Also provide api to get list of my bookings
- [Events.mjs](https://git.cs.dal.ca/sorathiya/csc-4177-group-20/-/blob/sahil/server/routes/Events.mjs) - This file provides api to book fortickets and list all the available events
- [EventList.js](https://git.cs.dal.ca/sorathiya/csc-4177-group-20/-/blob/sahil/frontend/src/components/EventList.js) - this file is used to display front end for events list and used to book for event
- [MyBooking.js](https://git.cs.dal.ca/sorathiya/csc-4177-group-20/-/blob/sahil/frontend/src/components/MyBooking.js) - this file is used to display front end for booking list and used to modify and cancel booking for the event
- made minor changes into fewfiles to accomodate my work


## Testing

For login use:  email => sahils@gmail.com   Password => Dal@6699
Or  create new acount as attendee

Test 1: Open the website -> go to "Event List" -> try booking with 0 registration -> it will show error message.

Test 2: Open the website -> go to "Event list" -> increment the number of reservation-> click on "Book Now" button -> it will show booking successful message with the total price. And event will beadded to my booking list. 

Test 3: Open the website -> go to" My Bookings" -> increment or decrement the number of registration -> click on "Modify Booking" button -> it will show modification successful message with the new total price.

Test 4: Open the website -> go to" My Bookings" -> make number of registration equals 0 -> click on "Modify Booking" button -> it will show error message.

Test 5: Open the website -> go to" My Bookings" -> select event with more than 0 registrations -> click on "Cancel Booking" -> it will show cancellation successful messagewith total refund amount.It will also revmove event from my bookings list.

Test 6:All the tasks are also updating the database collections. When user booked thetickets, number of tickets booked, total revenue generated are updatedito events colection. Also booked tickets for attendeeisalso updatedin attendee collection.

## Deployment

Front-End
1. Create a react app using `npx create-reate-app my-app` in terminal.
2. Make changes or add file to the main folder.
3. Run `npm run build` to build the app from which build folder will be published.
4. Open an account on https://www.netlify.com. Upload the build folder to your account using add new site.
5. Click on open production delopy button to check the deployment.

Back-End
1. Uploded server to Github
2. Server is hosted on render by linking the github with the Render account.



## Built With

- [React.js](https://react.dev/) - Used to create user interface.
- [Netlify](https://www.netlify.com/) - Used for front-end deployment of the project.
- [Bootstrap](https://getbootstrap.com/) - Used for CSS framework.
- [React Bootstrap](https://react-bootstrap.netlify.app/) - Used for CSS framework
- [MERN Stack](https://www.mongodb.com/languages/mern-stack-tutorial) - Used access the database
- [MongoDB](https://www.mongodb.com/) - Used for data storage
- [Render](https://render.com/) - Used to host server for API

## Sources Used

1. https://react-bootstrap.github.io/components -- for all the components
2. https://bootstrap-cheatsheet.themeselection.com --for the bootstrap classes
3. https://www.w3schools.com/tags/att_form_novalidate.asp -- for learning noValidate attribute
4. https://dev.to/codebucks/form-validation-in-reactjs-by-building-reusable-custom-hook-1bg7 -- to learn how to resuable hook to grab updated values from the form submission
5. https://react-bootstrap.netlify.app/docs/forms/validation -- for learning form validation and for bootstrap components.
6. https://react.dev/learn/tutorial-tic-tac-toe -- for learning about spread operator and hooks and useState.
7. https://www.lipsum.com/feed/html -- for lorem ipsum text
8. https://unsplash.com/s/photos/events -- for photos
9. https://chat.openai.com/ -- used to fill the data into collections(MongoDB), took help in coding when error occurs, also for leraning MERN stack in an efficient way, genrated faq question and answers using this.
10. https://getbootstrap.com/docs/5.3/components/modal/ -- used to create modal that is used to notify the user about the actions.
11. https://www.mongodb.com/languages/mern-stack-tutorial-- Used to setup environment for mern and coding style. Also used for basic code that needto create APIs.
12. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date -- for accessing the date
13. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart -- for padding the time
14. https://render.com/ -- for server hosting

### Event.js

*Lines 34 - 41*

```
  const countDecrease = (eventId) => {
    if (count[eventId] > 0) {
      setCount((prevCount) => ({
        ...prevCount,
        [eventId]: prevCount[eventId] - 1,
      }));
    }
  };

  const countIncrease = (eventId) => {
    setCount((initialCount) => ({
      ...initialCount,
      [eventId]: initialCount[eventId] + 1,
    }));
  };

```

The code above was created by adapting the code in [Stackoverflow](https://stackoverflow.com/questions/47647269/how-to-get-spread-operator-updating-state-with-react) as shown below: 

```
this.setState(prevState => ({
  ...prevState,
  metawords: evt.target.value,
}))

```


*Lines 52 - 84*

```
 const handleBooking = async (eventId, qty, price) => {
    if (qty > 0) {
      const data = {
        userId: userId,
        eventId: eventId,
        qty: qty,
      };

      try {
        const response = await fetch(
          "http://localhost:5050/events/eventbooking",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        setModalTitle("Booking Successful!!");
        setModalBody([
          "Your ticket are booked. Enjoy your  event.",
          `Total Price ($${price * qty}) = Qty(${qty}) X Price($${price})`,
        ]);
      } catch (error) {
        setModalTitle("Booking Failed!!");
        setModalBody(["Please try again.", ``]);
      }
    } else {
      setModalTitle("Please Enter Number of Tickets");
      setModalBody(["Use '+' button to enter number of tickets.", ``]);
    }
  };

```

The code above was created by adapting the code in [MongoDB](https://www.mongodb.com/languages/mern-stack-tutorial) as shown below: 

```
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:5050/record", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 }

```


*Lines 141 - 158*

```
<div className=" text-center mx-auto my-4">
<button onClick={countDecrease} style={setCountBtn}>
    -
</button>
<input
    value={count}
    readOnly
    style={inputCount}
    id={props.eventId}
></input>
<button onClick={countIncrease} style={setCountBtn}>
    +
</button>
</div>

```

The code above was created by adapting the code in [CodePen](https://codepen.io/rkoms/pen/OJbrGKX) as shown below: 

```
<div class="number">
	<span class="minus">-</span>
	<input type="text" value="1"/>
	<span class="plus">+</span>
</div>

```




*Lines 177 - 208*

```
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"> <div className="modal-dialog">
    <div className="modal-content">
        <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">
            {modalTitle}
        </h1>
        {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
        </div>
        <div className="modal-body">
        <p>{modalBody[0]}</p>
        <p>{modalBody[1]}</p>
        </div>
        <div className="modal-footer">
        <button type="button" className="bg-primary" data-bs-dismiss="modal" onClick={getRecords}>
            Close
        </button>
        </div>
    </div>
    </div>
</div>

```

The code above was created by adapting the code in [Bootstrap](https://getbootstrap.com/docs/5.3/components/modal/) as shown below: 

```
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

```


### MyBooking.js

*Lines 37 - 51*

```
const countDecrease = (eventId) => {
if (count[eventId] > 0) {
    setCount((prevCount) => ({
    ...prevCount,
    [eventId]: prevCount[eventId] - 1,
    }));
}
};

const countIncrease = (eventId) => {
setCount((initialCount) => ({
    ...initialCount,
    [eventId]: initialCount[eventId] + 1,
}));
};

```

The code above was created by adapting the code in [Stackoverflow](https://stackoverflow.com/questions/47647269/how-to-get-spread-operator-updating-state-with-react) as shown below: 

```
this.setState(prevState => ({
  ...prevState,
  metawords: evt.target.value,
}))

```

*Lines 53 - 126*

```
const handleCancellation = async (eventId, price) => {
const data = {
    userId: userId,
    eventId: eventId,
};

try {
    const response = await fetch(
    "http://localhost:5050/bookings/eventcancellation",
    {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }
    );

    setModalTitle("Cancellation Successful!!");
    setModalBody([
    "Your tickets are cancelled. Have a nice day.",
    `Return amount ($${price * checkCount[eventId]}) = Qty(${
        checkCount[eventId]
    }) X Price($${price})`,
    ]);
} catch (error) {
    setModalTitle("Cancellation Failed!!");
    setModalBody(["Please try again.", ``]);
}
};

const handleModification = async (eventId, qty, price) => {
if (count[eventId] === checkCount[eventId]) {
    setModalTitle("Please Modify Tickets");
    setModalBody([
    "Please user '-' to decrease the number of tickets or '+' to increase the number of tickets.",
    ]);
} else if (qty > 0) {
    const data = {
    userId: userId,
    eventId: eventId,
    qty: qty,
    };

    try {
    const response = await fetch(
        "http://localhost:5050/bookings/eventmodification",
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        }
    );
    setModalTitle("Modification Successful!!");
    setModalBody([
        "Your ticket are modified. Enjoy your  event.",
        `New Total Price ($${price * qty}) = Qty(${qty}) X Price($${price})`,
    ]);
    setTimeout(200);
    getRecords();
    } catch (error) {
    setModalTitle("Modify Failed!!");
    setModalBody(["Please try again.", ``]);
    }
} else {
    setModalTitle("Please Enter Number of Tickets");
    setModalBody([
    "To modify the tickets, you should have atleast 1 ticket.",
    ``,
    ]);
}
};

```

The code above was created by adapting the code in [MongoDB](https://www.mongodb.com/languages/mern-stack-tutorial) as shown below: 

```
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:5050/record", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 }

```

*Lines 263 - 293, 218 - 248*

```
<div
    className="modal fade"
    id="cancelButton"
    tabindex="-1"
    aria-labelledby="cancelButtonLabel"
    aria-hidden="true"
>
    <div className="modal-dialog">
    <div className="modal-content">
        <div className="modal-header">
        <h1 className="modal-title fs-5" id="cancelButtonLabel">
            {modalTitle}
        </h1>
        </div>
        <div className="modal-body">
        <p>{modalBody[0]}</p>
        <p>{modalBody[1]}</p>
        </div>
        <div className="modal-footer">
        <button
            type="button"
            className="bg-primary"
            data-bs-dismiss="modal"
            onClick={getRecords}
        >
            Close
        </button>
        </div>
    </div>
    </div>
</div>

```

The code above was created by adapting the code in [Bootstrap](https://getbootstrap.com/docs/5.3/components/modal/) as shown below:

```
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```


### Events.mjs
1. Used boilerplate code from [MongoDB](https://www.mongodb.com/languages/mern-stack-tutorial).This helpme to learnabout fucntion used in MERN and how to create API. I also learned about gettinf andpushing data into MongoDB.

### Bookings.mjs
1. Used boilerplate code from [MongoDB](https://www.mongodb.com/languages/mern-stack-tutorial).This helpme to learnabout fucntion used in MERN and how to create API. I also learned about gettinf and pushing data into MongoDB.



## Acknowledgments

* [CodeWithHarry](https://www.youtube.com/watch?v=RGKi6LSPDLU&t=1s&ab_channel=CodeWithHarry)'s youtube tutorial video was used to gain basic understanding of react.
* [CodePen](https://codepen.io/rkoms)'s code was you to take an idea about counter.
* [Coolors](https://coolors.co/0a2239-2176ff-48a9a6-e74c3c-27ae60-2b303a-737373-f6f7fa) was used to create colour pallet.
* [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/) was used to see different class of bootstrap framework.
* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* [React](https://legacy.reactjs.org/docs/hooks-effect.html) was used to learn about use Effect.
* [Render](https://render.com/) was used to host the server.
* [MongoDB](https://www.mongodb.com/languages/mern-stack-tutorial) was used to learn about MERN stack.
* [Netlify](https://www.netlify.com/) - Used for deployment of the project.


## References

1. S. Sorathiya, “CSCI 4177 INDIVIDUAL ASSIGNMENT 1.” Summer Term, Dalhousie University, [online document, code], 2023. [Accessed June 18, 2023]
2. S. Sorathiya, “CSCI 4177 TUTORIAL 3.” Summer Term, Dalhousie University, [online document], 2023. [Accessed June 18, 2023]
3. S. Sorathiya, R. Hans, B. Jain, A. Awasthi, M. Eltazy, Group 20“CSCI 4177 GROUP ASSIGNMENT 1.” Summer Term, Dalhousie University, [online document], 2023. [Accessed June 18, 2023]
4. B. Jain, “CSCI 4177 INDIVIDUAL ASSIGNMENT 1.” Summer Term, Dalhousie University, [online document], 2023. [Accessed June 18, 2023]
5. S. Sorathiya, R. Hans, B. Jain, A. Awasthi, M. Eltazy, Group 20“CSCI 4177 Project Proposal” Summer Term, Dalhousie University, [online document, code], 2023. [Accessed July 26, 2023]