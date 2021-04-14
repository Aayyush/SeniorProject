import { Card, Form, Checkbox } from "react-bootstrap";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";

async function handleSubmit(e) {}

export default function CreateEvent() {
  const eventNameRef = useRef();
  const descriptionRef = useRef();
  const openToPublicRef = useRef();

  const [eventDate, setEventDate] = useState(new Date());

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Create New Event</h2>
        <Form onSubmit={handleSubmit}></Form>
        <Form.Group id="event-name">
          <Form.Label>Event Name</Form.Label>
          <Form.Control type="text" ref={eventNameRef} required />
        </Form.Group>
        <Form.Group id="description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" ref={descriptionRef} required />
        </Form.Group>
        <Form.Group id="event-date">
          <Form.Label>Event Date</Form.Label>
          <DatePicker
            selected={eventDate}
            onChange={(date) => setEventDate(date)}
          />
        </Form.Group>
        <Form.Group controlId="openToPublic">
          <Form.Check
            type="checkbox"
            label="Open to Public?"
            ref={openToPublicRef}
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
