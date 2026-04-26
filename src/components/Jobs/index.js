import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import JobItem from '../JobItem'
import FilterGroup from '../FilterGroup'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noJobs: 'NO_JOBS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    employmentType: [],
    minimumPackage: '',
    searchQuery: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchJobs()
  }

  fetchJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {employmentType, minimumPackage, searchQuery} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const employmentTypeString = employmentType.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeString}&minimum_package=${minimumPackage}&search=${searchQuery}`
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
      const updatedJobs = data.jobs.map(jobDetails => ({
        id: jobDetails.id,
        companyLogoUrl: jobDetails.company_logo_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
      }))

      this.setState({
        jobsList: updatedJobs,
        apiStatus:
          updatedJobs.length === 0
            ? apiStatusConstants.noJobs
            : apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateEmploymentType = employmentTypeId => {
    const {employmentType} = this.state
    if (employmentType.includes(employmentTypeId)) {
      const updatedEmploymentType = employmentType.filter(
        employmentId => employmentId !== employmentTypeId,
      )
      this.setState({employmentType: updatedEmploymentType}, this.fetchJobs)
    } else {
      this.setState(
        prev => ({
          employmentType: [...prev.employmentType, employmentTypeId],
        }),
        this.fetchJobs,
      )
    }
  }

  updateMinimumPackage = minimumPackage => {
    this.setState({minimumPackage}, this.fetchJobs)
  }

  changeSearchQuery = event => {
    this.setState({searchQuery: event.target.value})
  }

  onEnterSearch = event => {
    if (event.key === 'Enter') {
      this.fetchJobs()
    }
  }

  onSearch = () => {
    this.fetchJobs()
  }

  onClearFilters = () => {
    this.setState(
      {employmentType: [], minimumPackage: '', searchQuery: ''},
      this.fetchJobs,
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsSuccess = () => {
    const {jobsList} = this.state

    return (
      <ul className="jobs-list-container">
        {jobsList.map(jobDetails => (
          <JobItem key={jobDetails.id} jobDetails={jobDetails} />
        ))}
      </ul>
    )
  }

  renderJobsFailure = () => (
    <div className="jobs-failure-container">
      <img
        className="jobs-failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-button" type="button" onClick={this.fetchJobs}>
        Retry
      </button>
    </div>
  )

  renderNoJobs = () => (
    <div className="no-jobs-container">
      <img
        className="no-jobs-image"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderJobsSuccess()
      case apiStatusConstants.failure:
        return this.renderJobsFailure()
      case apiStatusConstants.noJobs:
        return this.renderNoJobs()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (!jwtToken) {
      return <Redirect to="/login" />
    }

    const {searchQuery, employmentType, minimumPackage} = this.state

    return (
      <>
        <Header />
        <div className="search-container search-container-sm">
          <input
            className="search-input-element"
            type="search"
            value={searchQuery}
            onChange={this.changeSearchQuery}
            onKeyDown={this.onEnterSearch}
            placeholder="Search"
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-button"
            onClick={this.onSearch}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="jobs-container">
          <FilterGroup
            employmentType={employmentType}
            minimumPackage={minimumPackage}
            updateEmploymentType={this.updateEmploymentType}
            updateMinimumPackage={this.updateMinimumPackage}
            updateSearchQuery={this.updateSearchQuery}
            onClearFilters={this.onClearFilters}
          />
          <div className="jobs-posts-container">
            <div className="search-container search-container-lg">
              <input
                className="search-input-element"
                type="search"
                value={searchQuery}
                onChange={this.changeSearchQuery}
                onKeyDown={this.onEnterSearch}
                placeholder="Search"
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.onSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
