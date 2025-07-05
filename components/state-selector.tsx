import React from "react"

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
]

interface StateSelectorProps {
  value: string
  onChange: (state: string) => void
}

const StateSelector: React.FC<StateSelectorProps> = ({ value, onChange }) => (
  <div className="mb-4">
    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">Select your state:</label>
    <select
      id="state"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-md p-2"
    >
      <option value="">-- Select State --</option>
      {US_STATES.map(state => (
        <option key={state} value={state}>{state}</option>
      ))}
    </select>
  </div>
)

export default StateSelector 