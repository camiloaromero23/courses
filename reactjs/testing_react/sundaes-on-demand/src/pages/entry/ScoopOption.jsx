import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

export const ScoopOption = ({ imagePath, name, updateItemCount }) => {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const currentValue = e.target.value;

    const currentValueFloat = parseFloat(currentValue);

    const valueIsValid =
      0 <= currentValueFloat &&
      currentValueFloat <= 10 &&
      Math.floor(currentValueFloat) === currentValueFloat;

    setIsValid(valueIsValid);

    valueIsValid && updateItemCount(name, currentValue);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            onChange={handleChange}
            defaultValue={0}
            isInvalid={!isValid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};
