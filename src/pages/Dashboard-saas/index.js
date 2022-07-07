import React, { useEffect, useState } from "react"
import { Container, Row, Col } from "reactstrap"
import MetaTags from "react-meta-tags"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Components
import CardUser from "./card-user"
import CardWelcome from "./card-welcome"
import MiniWidget from "./mini-widget"
import ContractorsAnalytics from "./contractors-analytics"
import { useDispatch, useSelector } from "react-redux"
import { getContractors as onGetContractors } from "store/actions"
import { isEmpty } from "lodash"

const DashboardSaas = props => {
  const dispatch = useDispatch()

  const { contractors } = useSelector(state => ({
    contractors: state.projects.contractors,
  }))

  useEffect(() => {
    //if (isEmpty(contractors)) {
    dispatch(onGetContractors())
    //}
  }, [])

  const reports = [
    {
      icon: "bx bx-copy-alt",
      title: "Orders",
      value: "1,452",
      badgeValue: "+ 0.2%",
      color: "success",
      desc: "From previous period",
    },
    {
      icon: "bx bx-archive-in",
      title: "Revenue",
      value: "$ 28,452",
      badgeValue: "+ 0.2%",
      color: "success",
      desc: "From previous period",
    },
    {
      icon: "bx bx-purchase-tag-alt",
      title: "Average Price",
      value: "$ 16.2",
      badgeValue: "0%",
      color: "warning",
      desc: "From previous period",
    },
  ]

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Homepage | IR35Pro</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Dashboards" breadcrumbItem="Status Dashboard" />

          {/* Card User */}
          <CardUser />

          <Row>
            <CardWelcome />

            <Col xl="8">
              <Row>
                <MiniWidget />
              </Row>
            </Col>
          </Row>

          <Row>
            {/* <Earning /> */}
            <Col xl="12">
              <ContractorsAnalytics />
            </Col>
          </Row>

          {/* <Row>
            <TopContractor />
            <ChatBox />
          </Row> */}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default DashboardSaas
