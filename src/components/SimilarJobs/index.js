import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJobs = props => {
  const {similarJobs} = props
  return (
    <div className="similar-jobs-container">
      <h1 className="similar-jobs-heading">Similar Jobs</h1>
      <ul className="similar-jobs-list-container">
        {similarJobs.map(job => (
          <li key={job.id} className="similar-job-details">
            <div className="similar-job-details-header">
              <img
                className="company-image"
                src={job.companyLogoUrl}
                alt="similar job company logo"
              />
              <div>
                <h1 className="job-name">{job.title}</h1>
                <div className="job-rating-container">
                  <FaStar className="star-icon" />
                  <p className="job-rating">{job.rating}</p>
                </div>
              </div>
            </div>
            <div className="job-description-container">
              <h1 className="job-description-title">Description</h1>
              <p className="job-description">{job.jobDescription}</p>
            </div>
            <div className="job-info">
              <div className="job-location-container">
                <MdLocationOn className="icon" />
                <p className="job-location">{job.location}</p>
              </div>
              <div className="job-type-container">
                <BsBriefcaseFill className="icon" />
                <p className="job-type">{job.employmentType}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SimilarJobs
