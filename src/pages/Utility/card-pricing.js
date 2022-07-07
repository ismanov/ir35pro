import PropTypes, { element } from 'prop-types'
import React from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Media } from "reactstrap"

import axiosApi from 'helpers/api_helper'

// import * as paymentMethod from "../../services/PaymentService"

const CardPricing = props => {

  // async function onClickSignup(id) {
  //   try {
  //     let res = await axiosApi().get(`api/check-subscription`);
  //     if(res.status == 200) {
  //       res = await axiosApi().get('api/config');
  //       const stripe = Stripe(res.data.publishableKey)
  //       console.log(stripe);
  //       const elements = stripe.elements();
  //       let card = elements.create('card');
  //       card.mount('#card-element');
  //       // const { error, paymentMethod } = await stripe.createPaymentMethod({
  //       //   type: "card",
  //       //   card: elements
  //       // });
  //       // console.log(error, paymentMethod)
  //     } else if (res.status == 409) {
  //       alert(res.state.message);
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <React.Fragment>
      <Col xl="3" md="6">
        <Card className="plan-box">
          <CardBody className="p-4">
            <Media>
              <Media body>
                <h5>{props.pricing.title}</h5>
                <p className="text-muted">{props.pricing.description}</p>
              </Media>
              <div className="ms-3">
                <i
                  className={"bx " + props.pricing.icon + " h1 text-primary"}
                />
              </div>
            </Media>
            <div className="py-4">
              <h2>
                {props.pricing.price}/{" "}
                <span className="font-size-13">{props.pricing.duration}</span>
              </h2>
            </div>
            <div className="text-center">
              <Link
                to={props.pricing.link}
                className="btn btn-primary btn-sm "
              >
                Sign up Now
              </Link>
            </div>

            <div className="plan-features mt-5">
              {props.pricing.features.map((feature, key) => (
                <p key={"_feature_" + key}>
                  <i className="bx bx-checkbox-square text-primary me-2" />{" "}
                  {feature.title}
                </p>
              ))}
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

CardPricing.propTypes = {
  pricing: PropTypes.object
}

export default CardPricing
