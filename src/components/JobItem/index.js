import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item">
        <div className="job-header">
          <img
            className="company-logo-image"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div>
            <h1 className="company-name">{title}</h1>
            <div className="company-rating-container">
              <FaStar className="star-icon" />
              <p className="company-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-specifics-container">
          <div className="job-info">
            <div className="job-location-container">
              <MdLocationOn className="icon" />
              <p className="job-location">{location}</p>
            </div>
            <div className="job-type-container">
              <BsBriefcaseFill className="icon" />
              <p className="job-type">{employmentType}</p>
            </div>
          </div>
          <p className="package-per-annum">{packagePerAnnum}</p>
        </div>
        <hr className="horizontal-line" />
        <div className="job-description-container">
          <h1 className="job-description-title">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
