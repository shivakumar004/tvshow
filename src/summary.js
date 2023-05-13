import axios from "axios";
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { useLocation ,useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Summary = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [ticketData, setTicketData] = useState({})

  const { summary, name, image, rating, genres, language, status, premiered } =  location?.state?.show; // getting this from home screen
  
  // Avoided using Api call again to improve efficiency  


  
  /**
   * handleClose 
   * handleShow
   * 
   * Both functions are Toggle Logic for Form Modal
   *
   */
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  /**
   * handleTicketInput
   * used to handle events from input fields in side of form
   * @param { Event } event 
   */
  const handleTicketInput = (event) =>{
    let name = event.target.name
    let value = event.target.value
    setTicketData(e=>({...e,[name]:value}))
  }

  
  /**
   * handleTicket
   * used  to handle booking of ticket here 
   * it is used to save in local Storage along with other booked tickets in the past
   * @param void
   *
   */
  const handleTicket = () => {
    console.log(localStorage.getItem("ticketBookings"))
    let oldRecords = localStorage.getItem("ticketBookings") !== "undefined" ? JSON.parse(localStorage.getItem("ticketBookings")) : []
    let updatedData = JSON.stringify([...oldRecords,{timeStamp: new Date(), ticketData,showDetails:location?.state?.show}])
    localStorage.setItem("ticketBookings",updatedData) // saving ticket
    setTicketData({}) // emptying Ticket data state to avoid confusion
    setShow(false) // closing Form
    navigate("/") // redirecting to Home Page
  };


  return (
    <Card className="text-white" style={{ height: "100vh" }}>
      <Card.Img
        src={image?.original}
        alt="Card image"
        style={{
          height: "100vh",
          backgroundSize: "contain",
          padding: 10,
          borderRadius: 20,
        }}
      />
     {/* Overlay style from  Bootstrap */}
      <Card.ImgOverlay>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            margin: 30,
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: "5rem" }}>{name}</div>
          <div style={{ fontSize: "2rem" }}>
            {rating?.average || 0} / 10 <i className="star"></i>
          </div>
          <div style={{ fontSize: "1rem" }}>
            {language} . {status} . {genres.join(" / ")}
          </div>
          <div style={{ fontSize: "1rem" }}>In theaters {premiered}</div>
          <div style={{ fontSize: "1rem" }}></div>
        </div>
        <div style={{ fontSize: "1.1rem", margin: 30 }}>
          Synopsis:
          <br />
          {summary.replaceAll("<p>", "  ").replaceAll("</p>", "")}
        </div>
        <div
          style={{
            fontSize: "1.1rem",
            margin: 30,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={handleShow}
            style={{ bottom: "25%", position: "absolute" }}
          >
            Book Now
          </Button>
        </div>{" "}
        {/* Form Modal to Book Ticket for this movie */}
        <Form onSubmit={handleTicket}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Booking Tickets</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Movie Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Normal text"
                  disabled
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  type="tel"
                  onChange={handleTicketInput}
                  name="phoneNumber"
                  value={ticketData.phoneNumber}
                  placeholder="Phone number for E-ticket"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  onChange={handleTicketInput}
                  value={ticketData.email}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Show Time</Form.Label>
                <Form.Control type="datetime-local" name="showTime"
                  value={ticketData.showTime} onChange={handleTicketInput} placeholder="Show time" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>How Many tickets</Form.Label>
                <Form.Select aria-label="Default select example" name="NoOfTickets" onChange={handleTicketInput} value={ticketData.NoOfTickets}>
                  <option>Select</option>
                  {new Array(10).fill("shiva").map((_,i)=><option key={i} value={i+1}>{i+1}</option>)}
                </Form.Select>
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleTicket}>
              Save Changes
            </Button>
          </Modal.Footer>  
        </Modal>
        </Form>
      </Card.ImgOverlay>
    </Card>
  );
};

export default Summary;
