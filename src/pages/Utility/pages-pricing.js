import React, { useEffect, useState } from "react"
import { Container, Row, Col } from "reactstrap"
import MetaTags from 'react-meta-tags';
import axiosApi from 'helpers/api_helper'

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Pricing Cards
import CardPricing from "./card-pricing"

const PagesPricing = () => {
  const [pricings, setPricings] = useState([]);
  useEffect(() => {
    const getPlans = async () => {
      try {
        let res = await axiosApi().get(`api/plans`)
        let pricingData = [];
        res.data.products.forEach(element => {
          let pricing = {
            id: element.id,
            title: element.name,
            description: "Itaque earum hic",
            icon: element.images[0],
            price: element.plans[0].amount,
            duration: "Per " + element.plans[0].interval,
            link: "/subscribe",
            features: [
              { title: "Free Live Support" },
              { title: "Unlimited User" },
              { title: "No Time Tracking" },
              { title: "Free Setup" },
            ],
          }
          pricingData = [pricing].concat(pricingData);
        });
        setPricings(pricingData);
      } catch (err) {
        console.log(err)
      }
    }
    getPlans();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Pricing | IR35Pro</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Settings" breadcrumbItem="Pricing" />

          <Row className="justify-content-center">
            <Col lg={6}>
              <div className="text-center mb-5">
                <h4>Choose your Pricing plan</h4>
                <p className="text-muted">
                  To achieve this, it would be necessary to have uniform
                  grammar, pronunciation and more common words If several
                  languages coalesce
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            {pricings.map((pricing, key) => (
              <CardPricing pricing={pricing} key={"_pricing_" + key} />
            ))}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default PagesPricing
