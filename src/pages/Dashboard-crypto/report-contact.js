import React, { useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
  FormGroup,
  Button,
} from "reactstrap"
import { Link } from "react-router-dom"
import AvForm from "availity-reactstrap-validation/lib/AvForm"
import AvField from "availity-reactstrap-validation/lib/AvField"

const ContactForm = () => {
  const [menu, setMenu] = useState(false)

  return (
    <React.Fragment>
      <Col xl="4">
        <Card>
          <CardBody>
            <p>Want more detailed report on your IR35 savings? Contact us.</p>
            <AvForm>
              <FormGroup>
                <AvField
                  label="Email"
                  type="email"
                  name="contact-email"
                  required>
                </AvField>
                <AvField
                  label="Description"
                  type="textarea"
                  name="contact-description"
                  rows={5}
                  required>
                </AvField>
              </FormGroup>
              <FormGroup style={{ textAlign: "right" }}>
                <button
                  type="submit"
                  className="mt-3 btn btn-primary">Submit</button>
              </FormGroup>
            </AvForm>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default ContactForm
