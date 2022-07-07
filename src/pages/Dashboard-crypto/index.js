import React from "react"
import { Container, Row, Col } from "reactstrap"
import MetaTags from 'react-meta-tags';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Components
import CardWelcome from "./card-welcome"
import MiniWidget from "./mini-widget"
import ContactForm from "./report-contact";

const Dashboard = () => {

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Reports Dashboard | IR35Pro</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Dashboards" breadcrumbItem="Reports" />
          <Row>
            <ContactForm />

            <Col xl="8">
              <CardWelcome />

              <Row>
                <MiniWidget />
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
