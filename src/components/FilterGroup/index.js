import './index.css'

import Profile from '../Profile'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterGroup = props => {
  const {
    employmentType,
    minimumPackage,
    updateEmploymentType,
    updateMinimumPackage,
    onClearFilters,
  } = props

  return (
    <div className="filter-group-container">
      <Profile />

      <hr className="hr-line" />

      <h1 className="list-heading">Type of Employment</h1>
      <ul className="filter-list-container">
        {employmentTypesList.map(employmentTypeDetails => (
          <li
            key={employmentTypeDetails.employmentTypeId}
            className="filter-list-item"
          >
            <input
              type="checkbox"
              id={employmentTypeDetails.employmentTypeId}
              onChange={() =>
                updateEmploymentType(employmentTypeDetails.employmentTypeId)
              }
              checked={employmentType.includes(
                employmentTypeDetails.employmentTypeId,
              )}
              className="filter-list-input"
            />
            <label
              htmlFor={employmentTypeDetails.employmentTypeId}
              className="filter-label-text"
            >
              {employmentTypeDetails.label}
            </label>
          </li>
        ))}
      </ul>

      <hr className="hr-line" />

      <h1 className="list-heading">Salary Range</h1>
      <ul className="filter-list-container">
        {salaryRangesList.map(salaryRangeDetails => (
          <li
            key={salaryRangeDetails.salaryRangeId}
            className="filter-list-item"
          >
            <input
              type="radio"
              name="salary"
              id={salaryRangeDetails.salaryRangeId}
              onChange={() =>
                updateMinimumPackage(salaryRangeDetails.salaryRangeId)
              }
              checked={minimumPackage === salaryRangeDetails.salaryRangeId}
              className="filter-list-input"
            />
            <label
              htmlFor={salaryRangeDetails.salaryRangeId}
              className="filter-label-text"
            >
              {salaryRangeDetails.label}
            </label>
          </li>
        ))}
      </ul>

      <button
        className="clear-filter-btn"
        type="button"
        onClick={() => onClearFilters()}
      >
        Clear Filter
      </button>
    </div>
  )
}

export default FilterGroup
