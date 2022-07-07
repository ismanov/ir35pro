import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Card, CardBody, CardTitle, Media } from "reactstrap"
import { Link } from "react-router-dom"
import { map } from "lodash"
import images from "assets/images"

const IR35ClientForm = ({ contractor }) => {

  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-4">IR35Pro Client Form</CardTitle>
        <div className="text-center mt-4 pt-2">
          <Link to={"/form-client/" + contractor.id} className="btn btn-primary btn-sm">
            Request Form
          </Link>
        </div>
      </CardBody>
    </Card>
  )
}

IR35ClientForm.propTypes = {
  contractor: PropTypes.object,
}

export default IR35ClientForm
