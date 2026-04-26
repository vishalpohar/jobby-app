import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    jobDetails: {},
    skillsList: [],
    lifeAtCompanyDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchjobDetails()
  }

  fetchjobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      const updatedJobDetails = {
        id: data.job_details.id,
        title: data.job_details.title,
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        skills: data.job_details.skills,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
      }

      const updatedSkillsList = data.job_details.skills.map(skill => ({
        name: skill.name,
        imageUrl: skill.image_url,
      }))

      const updatedLifeAtCompanyDetails = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }

      const updatedSimilarJobs = data.similar_jobs.map(job => ({
        id: job.id,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        title: job.title,
        rating: job.rating,
      }))

      this.setState({
        jobDetails: updatedJobDetails,
        skillsList: updatedSkillsList,
        lifeAtCompanyDetails: updatedLifeAtCompanyDetails,
        similarJobs: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {jobDetails, skillsList, lifeAtCompanyDetails} = this.state
    const {similarJobs} = this.state
    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
    } = jobDetails
    return (
      <>
        <div className="job-details-container">
          <div className="job-details">
            <div className="job-details-header">
              <img
                className="company-logo-image"
                src={companyLogoUrl}
                alt="job details company logo"
              />
              <div>
                <h1 className="job-name">{title}</h1>
                <div className="job-rating-container">
                  <FaStar className="star-icon" />
                  <p className="job-rating">{rating}</p>
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
              <div className="job-description-header">
                <h1 className="job-description-title">Description</h1>
                <a className="website-link" href={companyWebsiteUrl}>
                  Visit
                  <FaExternalLinkAlt className="link-icon" />
                </a>
              </div>
              <p className="job-description">{jobDescription}</p>
            </div>
            <div className="skills-container">
              <h1 className="skills-heading">Skills</h1>
              <ul className="skills-list-container">
                {skillsList.map(skill => (
                  <li key={skill.name} className="skill-item">
                    <img
                      className="skill-image"
                      src={skill.imageUrl}
                      alt={skill.name}
                    />
                    <p className="skill-name">{skill.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="life-at-company-container">
              <h1 className="life-at-company-heading">Life at Company</h1>
              <div className="life-at-company">
                <p className="life-at-company-description">
                  {lifeAtCompanyDetails.description}
                </p>
                <img
                  className="life-at-company-image"
                  src={lifeAtCompanyDetails.imageUrl}
                  alt="life at company"
                />
              </div>
            </div>
          </div>
        </div>
        <SimilarJobs similarJobs={similarJobs} />
      </>
    )
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.fetchjobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (!jwtToken) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        {this.renderJobDetails()}
      </>
    )
  }
}

export default JobDetails
