import React from 'react'
import './ThingsToKnow.css'
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LockIcon from "@mui/icons-material/Lock";

import PetsIcon from "@mui/icons-material/Pets";
import EventIcon from "@mui/icons-material/Event";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import CleanHandsIcon from "@mui/icons-material/CleanHands";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { SmokeFree } from "@mui/icons-material";

const ThingsToKnow = () => {
  return (
    <div className='things-to-know-container'>
        <div className='things-to-know-heading'>
        <h3>Things to know</h3>
        </div>
        <div className="things-to-know-content">
          <div className="house-rules">
            <h4>House rules</h4>
            <ul>
              <li><AccessTimeIcon /> Check-in: After 4:00 PM</li>
              <li><AccessTimeIcon /> Checkout: 10:00 AM</li>
              <li><LockIcon /> Self check-in with lockbox</li>
              <li><ChildCareIcon /> Not suitable for infants (under 2 years)</li>
              <li><SmokeFree/> No smoking</li>
              <li><PetsIcon /> No pets</li>
              <li><EventIcon /> No parties or events</li>
            </ul>
          </div>
          <div className="health-safety">
            <h4>Health & safety</h4>
            <ul>
              <li><CleanHandsIcon /> Committed to Airbnb's enhanced cleaning process.<strong>Show more</strong></li>
              <li><VerifiedUserIcon /> Airbnb's social-distancing and other COVID-19-related guidelines apply</li>
              <li><ReportProblemIcon /> Carbon monoxide alarm</li>
              <li><ReportProblemIcon /> Smoke alarm</li>
              <li><ReportProblemIcon /> Security Deposit - if you damage the home, you may be charged up to $566</li>
            </ul>
          </div>
          <div className="cancellation-policy">
            <h4>Cancellation policy</h4>
            <p>Free cancellation before Feb 14</p>
            <a href="#">Show more</a>
          </div>
        </div>
    </div>
  )
}

export default ThingsToKnow
