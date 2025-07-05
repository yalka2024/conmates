export interface StateRule {
  state: string
  securityDepositLimit?: string
  requiredDisclosures?: string[]
  lateFeeLimit?: string
  noticePeriod?: string
  tips?: string[]
}

export const stateRules: StateRule[] = [
  { state: "Alabama" },
  { state: "Alaska" },
  { state: "Arizona" },
  { state: "Arkansas" },
  { state: "California", securityDepositLimit: "2 months' rent (unfurnished), 3 months' rent (furnished)", requiredDisclosures: ["Lead-based paint", "Mold", "Bed bugs", "Flood hazard"], lateFeeLimit: "Must be reasonable and specified in lease", noticePeriod: "30 days (month-to-month)", tips: ["Landlords must return security deposit within 21 days of move-out.", "California has strict rules on habitability and repairs."] },
  { state: "Colorado" },
  { state: "Connecticut" },
  { state: "Delaware" },
  { state: "Florida" },
  { state: "Georgia" },
  { state: "Hawaii" },
  { state: "Idaho" },
  { state: "Illinois" },
  { state: "Indiana" },
  { state: "Iowa" },
  { state: "Kansas" },
  { state: "Kentucky" },
  { state: "Louisiana" },
  { state: "Maine" },
  { state: "Maryland" },
  { state: "Massachusetts" },
  { state: "Michigan" },
  { state: "Minnesota" },
  { state: "Mississippi" },
  { state: "Missouri" },
  { state: "Montana" },
  { state: "Nebraska" },
  { state: "Nevada" },
  { state: "New Hampshire" },
  { state: "New Jersey" },
  { state: "New Mexico" },
  { state: "New York" },
  { state: "North Carolina" },
  { state: "North Dakota" },
  { state: "Ohio" },
  { state: "Oklahoma" },
  { state: "Oregon" },
  { state: "Pennsylvania" },
  { state: "Rhode Island" },
  { state: "South Carolina" },
  { state: "South Dakota" },
  { state: "Tennessee" },
  { state: "Texas", securityDepositLimit: "No state limit", requiredDisclosures: ["Lead-based paint", "Parking rules", "Flooding"], lateFeeLimit: "Cannot exceed 12% of monthly rent", noticePeriod: "30 days (month-to-month)", tips: ["Landlords must return security deposit within 30 days.", "Late fees must be specified in the lease."] },
  { state: "Utah" },
  { state: "Vermont" },
  { state: "Virginia" },
  { state: "Washington" },
  { state: "West Virginia" },
  { state: "Wisconsin" },
  { state: "Wyoming" },
]

export function getStateRule(state: string): StateRule | undefined {
  return stateRules.find(r => r.state === state)
} 