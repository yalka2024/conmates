const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Function to create a PDF from text content
function createPDF(content, filename) {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 50
  });

  const outputPath = path.join(__dirname, '..', 'public', 'templates', filename);
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Add title
  doc.fontSize(18)
     .font('Helvetica-Bold')
     .text(content.split('\n')[0], { align: 'center' })
     .moveDown(2);

  // Add content
  doc.fontSize(12)
     .font('Helvetica')
     .text(content.split('\n').slice(1).join('\n'), {
       align: 'left',
       lineGap: 5
     });

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

// Template content
const templates = {
  'california-tenant-rights.pdf': `CALIFORNIA TENANT RIGHTS GUIDE

CALIFORNIA DEPARTMENT of CONSUMER AFFAIRS
TENANT RIGHTS AND RESPONSIBILITIES

This guide provides an overview of your rights and responsibilities as a tenant in California.

RENT CONTROL
- Many cities in California have rent control ordinances
- Check your local city ordinances for specific limits
- Landlords must provide proper notice for rent increases
- Some increases may be limited by local laws

SECURITY DEPOSITS
- Maximum security deposit: 2 months' rent for unfurnished units
- Maximum security deposit: 3 months' rent for furnished units
- Must be returned within 21 days of move-out
- Landlord must provide itemized statement of deductions

EVICTION PROTECTION
- Landlords must have "just cause" to evict in many cities
- Proper notice periods required (3, 30, or 60 days depending on circumstances)
- Tenants have the right to contest evictions in court
- No-fault evictions may require relocation assistance

HABITABILITY STANDARDS
- Landlord must maintain premises in habitable condition
- Essential services: heat, water, electricity, plumbing
- Repairs must be made within reasonable time
- Tenants may have right to withhold rent for serious violations

NOTICE REQUIREMENTS
- 24-hour notice required for non-emergency entry
- 30-day notice for rent increases over 10%
- 60-day notice for rent increases over 10% in some cases
- Proper written notice required for lease termination

DISCRIMINATION PROTECTION
- Protected classes: race, color, religion, sex, national origin, disability, familial status
- Fair housing laws apply to all rental housing
- File complaints with California Department of Fair Employment and Housing

REPAIRS AND MAINTENANCE
- Landlord responsible for major repairs and maintenance
- Tenant responsible for minor repairs and damage caused by tenant
- Emergency repairs: tenant may make and deduct from rent
- Document all repair requests in writing

UTILITIES AND SERVICES
- Landlord must provide essential utilities unless lease specifies otherwise
- Cannot shut off utilities as form of eviction
- Utility billing arrangements must be clearly stated in lease

PRIVACY RIGHTS
- Right to quiet enjoyment of premises
- Landlord cannot harass or interfere with tenant's use
- Reasonable notice required for entry (except emergencies)
- Right to change locks with landlord's permission

MOVING OUT
- Proper notice required (30 or 60 days depending on tenancy)
- Return keys and provide forwarding address
- Clean premises and repair damage beyond normal wear and tear
- Request final inspection within 2 weeks of move-out

LEGAL RESOURCES
- California Department of Consumer Affairs: www.dca.ca.gov
- Local legal aid organizations
- Tenant rights hotlines
- Small claims court for disputes under $10,000

EMERGENCY CONTACTS
- California Tenant Rights Hotline: 1-800-799-7233
- Local Housing Authority
- Legal Aid Foundation
- Fair Housing Organizations

This guide is for informational purposes only and does not constitute legal advice. For specific legal questions, consult with an attorney or legal aid organization.`,

  'newyork-rent-stabilization.pdf': `NEW YORK RENT STABILIZATION GUIDE

NEW YORK STATE DIVISION of HOUSING AND COMMUNITY RENEWAL
RENT STABILIZATION AND TENANT RIGHTS

This guide explains rent stabilization laws and tenant rights in New York.

RENT STABILIZATION BASICS
- Applies to buildings with 6+ units built before 1974
- Rent increases are limited by law
- Annual rent increase guidelines set by Rent Guidelines Board
- Tenants have right to renew lease

RENT INCREASES
- Annual increases typically 1-3% for 1-year leases
- Annual increases typically 2-4% for 2-year leases
- Individual apartment improvements (IAI) may allow higher increases
- Major capital improvements (MCI) may allow higher increases

TENANT RIGHTS
- Right to a written lease
- Right to renew lease
- Right to challenge rent increases
- Right to file complaints with DHCR
- Right to withhold rent for serious violations

SECURITY DEPOSITS
- Maximum: 1 month's rent
- Must be held in interest-bearing account
- Interest must be paid to tenant annually
- Must be returned within 14 days of move-out

EVICTION PROTECTION
- Landlords must have "good cause" to evict
- Rent-stabilized tenants have strong protections
- Eviction proceedings must go through housing court
- Tenants have right to legal representation

HABITABILITY STANDARDS
- Landlord must maintain heat, hot water, and essential services
- Repairs must be made promptly
- Tenants can file complaints with 311 or DHCR
- Rent may be reduced for serious violations

LEASE RENEWAL
- Landlord must offer renewal lease 90-150 days before expiration
- Tenant has 60 days to accept or reject
- Renewal lease must be for 1 or 2 years
- Rent increase must follow guidelines

RENT OVERCHARGE COMPLAINTS
- File with DHCR within 4 years
- May be entitled to refund of overcharges
- Penalties may apply to landlords
- Interest on overcharges may be awarded

INDIVIDUAL APARTMENT IMPROVEMENTS
- Landlord can increase rent for improvements
- Tenant must consent to improvements
- Increases are temporary (30 years)
- Tenant can challenge increases

MAJOR CAPITAL IMPROVEMENTS
- Building-wide improvements may allow rent increases
- Increases are permanent
- Tenant can challenge increases
- Must benefit all tenants

UTILITIES AND SERVICES
- Landlord must provide essential services
- Cannot reduce services without approval
- Tenants can file complaints for service reductions
- Rent may be reduced for service losses

DISCRIMINATION PROTECTION
- Protected classes under fair housing laws
- Cannot be evicted for discriminatory reasons
- File complaints with NYC Commission on Human Rights
- State and federal protections also apply

LEGAL RESOURCES
- NYC Tenant Support Unit: 311
- DHCR: www.nyshcr.org
- Legal Aid Society
- NYC Bar Association

EMERGENCY CONTACTS
- NYC 311 for housing complaints
- DHCR Hotline: 1-718-739-6400
- Legal Aid Society: 1-888-663-6880
- NYC Commission on Human Rights

This guide is for informational purposes only and does not constitute legal advice. For specific legal questions, consult with an attorney or legal aid organization.`,

  'texas-tenant-rights.pdf': `TEXAS TENANT RIGHTS GUIDE

TEXAS ATTORNEY GENERAL'S OFFICE
TENANT RIGHTS AND RESPONSIBILITIES

This guide provides an overview of your rights and responsibilities as a tenant in Texas.

SECURITY DEPOSITS
- No statutory limit on security deposit amount
- Must be returned within 30 days of move-out
- Landlord must provide itemized list of deductions
- Deductions must be for actual damages beyond normal wear and tear

RENT PAYMENT
- Rent is due on date specified in lease
- No grace period required by law
- Late fees must be reasonable
- Landlord must provide written notice before eviction

EVICTION PROCESS
- Landlord must give written notice to vacate
- 3-day notice for non-payment of rent
- 30-day notice for lease violations
- Only court can order eviction
- Sheriff must execute eviction order

HABITABILITY STANDARDS
- Landlord must repair conditions that affect health and safety
- Essential services: heat, air conditioning, water, electricity
- Repairs must be made within reasonable time
- Tenant can file complaint with local health department

NOTICE REQUIREMENTS
- 24-hour notice required for non-emergency entry
- Emergency entry allowed without notice
- Landlord cannot harass or interfere with tenant's use
- Right to quiet enjoyment of premises

LEASE TERMINATION
- Written notice required to terminate lease
- 30-day notice for month-to-month tenancies
- Longer notice may be required for longer leases
- Early termination may result in penalties

REPAIRS AND MAINTENANCE
- Landlord responsible for major repairs
- Tenant responsible for minor repairs and damage
- Emergency repairs: tenant may make and deduct from rent
- Document all repair requests in writing

UTILITIES AND SERVICES
- Lease should specify who pays utilities
- Landlord cannot shut off utilities as form of eviction
- Utility billing arrangements must be clear
- Tenant responsible for utilities unless lease specifies otherwise

PRIVACY RIGHTS
- Right to quiet enjoyment of premises
- Landlord cannot enter without proper notice
- Right to change locks with landlord's permission
- Landlord cannot harass or interfere with tenant

DISCRIMINATION PROTECTION
- Protected classes under fair housing laws
- Cannot be evicted for discriminatory reasons
- File complaints with Texas Workforce Commission
- Federal protections also apply

MOVING OUT
- Proper notice required
- Return keys and provide forwarding address
- Clean premises and repair damage
- Request final inspection

LEGAL RESOURCES
- Texas Attorney General's Office: www.texasattorneygeneral.gov
- Local legal aid organizations
- Tenant rights hotlines
- Justice of the Peace courts for eviction cases

EMERGENCY CONTACTS
- Texas Attorney General's Office: 1-800-621-0508
- Local Legal Aid
- Tenant Rights Hotlines
- Local Housing Authorities

This guide is for informational purposes only and does not constitute legal advice. For specific legal questions, consult with an attorney or legal aid organization.`,

  'florida-tenant-rights.pdf': `FLORIDA TENANT RIGHTS GUIDE

FLORIDA BAR ASSOCIATION
TENANT RIGHTS AND RESPONSIBILITIES

This guide provides an overview of your rights and responsibilities as a tenant in Florida.

SECURITY DEPOSITS
- No statutory limit on security deposit amount
- Must be returned within 15-60 days of move-out
- Landlord must provide written notice of deductions
- Deductions must be for actual damages beyond normal wear and tear

RENT PAYMENT
- Rent is due on date specified in lease
- No grace period required by law
- Late fees must be reasonable
- Landlord must provide written notice before eviction

EVICTION PROCESS
- Landlord must give written notice to vacate
- 3-day notice for non-payment of rent
- 7-day notice for lease violations
- Only court can order eviction
- Sheriff must execute eviction order

HABITABILITY STANDARDS
- Landlord must maintain premises in habitable condition
- Essential services: heat, air conditioning, water, electricity
- Repairs must be made within reasonable time
- Tenant can file complaint with local code enforcement

NOTICE REQUIREMENTS
- 12-hour notice required for non-emergency entry
- Emergency entry allowed without notice
- Landlord cannot harass or interfere with tenant's use
- Right to quiet enjoyment of premises

LEASE TERMINATION
- Written notice required to terminate lease
- 15-day notice for week-to-week tenancies
- 30-day notice for month-to-month tenancies
- Longer notice may be required for longer leases

REPAIRS AND MAINTENANCE
- Landlord responsible for major repairs
- Tenant responsible for minor repairs and damage
- Emergency repairs: tenant may make and deduct from rent
- Document all repair requests in writing

UTILITIES AND SERVICES
- Lease should specify who pays utilities
- Landlord cannot shut off utilities as form of eviction
- Utility billing arrangements must be clear
- Tenant responsible for utilities unless lease specifies otherwise

PRIVACY RIGHTS
- Right to quiet enjoyment of premises
- Landlord cannot enter without proper notice
- Right to change locks with landlord's permission
- Landlord cannot harass or interfere with tenant

DISCRIMINATION PROTECTION
- Protected classes under fair housing laws
- Cannot be evicted for discriminatory reasons
- File complaints with Florida Commission on Human Relations
- Federal protections also apply

MOVING OUT
- Proper notice required
- Return keys and provide forwarding address
- Clean premises and repair damage
- Request final inspection

LEGAL RESOURCES
- Florida Bar Association: www.floridabar.org
- Local legal aid organizations
- Tenant rights hotlines
- County courts for eviction cases

EMERGENCY CONTACTS
- Florida Bar Association: 1-800-342-8011
- Local Legal Aid
- Tenant Rights Hotlines
- Local Housing Authorities

This guide is for informational purposes only and does not constitute legal advice. For specific legal questions, consult with an attorney or legal aid organization.`,

  'illinois-tenant-rights.pdf': `ILLINOIS TENANT RIGHTS GUIDE

ILLINOIS LEGAL AID ONLINE
TENANT RIGHTS AND RESPONSIBILITIES

This guide provides an overview of your rights and responsibilities as a tenant in Illinois.

SECURITY DEPOSITS
- No statutory limit on security deposit amount
- Must be returned within 30-45 days of move-out
- Landlord must provide itemized list of deductions
- Deductions must be for actual damages beyond normal wear and tear

RENT PAYMENT
- Rent is due on date specified in lease
- No grace period required by law
- Late fees must be reasonable
- Landlord must provide written notice before eviction

EVICTION PROCESS
- Landlord must give written notice to vacate
- 5-day notice for non-payment of rent
- 10-day notice for lease violations
- Only court can order eviction
- Sheriff must execute eviction order

HABITABILITY STANDARDS
- Landlord must maintain premises in habitable condition
- Essential services: heat, water, electricity, plumbing
- Repairs must be made within reasonable time
- Tenant can file complaint with local health department

NOTICE REQUIREMENTS
- 24-hour notice required for non-emergency entry
- Emergency entry allowed without notice
- Landlord cannot harass or interfere with tenant's use
- Right to quiet enjoyment of premises

LEASE TERMINATION
- Written notice required to terminate lease
- 30-day notice for month-to-month tenancies
- Longer notice may be required for longer leases
- Early termination may result in penalties

REPAIRS AND MAINTENANCE
- Landlord responsible for major repairs
- Tenant responsible for minor repairs and damage
- Emergency repairs: tenant may make and deduct from rent
- Document all repair requests in writing

UTILITIES AND SERVICES
- Lease should specify who pays utilities
- Landlord cannot shut off utilities as form of eviction
- Utility billing arrangements must be clear
- Tenant responsible for utilities unless lease specifies otherwise

PRIVACY RIGHTS
- Right to quiet enjoyment of premises
- Landlord cannot enter without proper notice
- Right to change locks with landlord's permission
- Landlord cannot harass or interfere with tenant

DISCRIMINATION PROTECTION
- Protected classes under fair housing laws
- Cannot be evicted for discriminatory reasons
- File complaints with Illinois Department of Human Rights
- Federal protections also apply

CHICAGO RENT CONTROL
- Chicago has additional tenant protections
- Check local ordinances for specific requirements
- Some buildings may be subject to rent control
- Contact Chicago Department of Housing for information

MOVING OUT
- Proper notice required
- Return keys and provide forwarding address
- Clean premises and repair damage
- Request final inspection

LEGAL RESOURCES
- Illinois Legal Aid Online: www.illinoislegalaid.org
- Local legal aid organizations
- Tenant rights hotlines
- Circuit courts for eviction cases

EMERGENCY CONTACTS
- Illinois Legal Aid Online: 1-800-252-8629
- Local Legal Aid
- Tenant Rights Hotlines
- Local Housing Authorities

This guide is for informational purposes only and does not constitute legal advice. For specific legal questions, consult with an attorney or legal aid organization.`,

  'all-states-tenant-rights.pdf': `UNIVERSAL TENANT RIGHTS GUIDE

FEDERAL TENANT PROTECTIONS
BASIC RIGHTS ACROSS ALL STATES

This guide provides an overview of universal tenant rights that apply across all states.

FAIR HOUSING ACT
- Protects against discrimination based on race, color, religion, sex, national origin, disability, familial status
- Applies to all rental housing
- File complaints with HUD or state agencies
- Covers advertising, application process, and tenancy

HABITABILITY STANDARDS
- Landlord must provide habitable premises
- Essential services: heat, water, electricity, plumbing
- Repairs must be made within reasonable time
- Tenants may have right to withhold rent for serious violations

QUIET ENJOYMENT
- Right to peaceful use of premises
- Landlord cannot harass or interfere with tenant
- Reasonable notice required for entry
- Right to privacy in your home

SECURITY DEPOSITS
- Must be returned within time specified by state law
- Landlord must provide itemized list of deductions
- Deductions must be for actual damages
- Cannot be used for normal wear and tear

EVICTION PROTECTION
- Only court can order eviction
- Landlord must follow proper legal process
- Tenants have right to defend against eviction
- Self-help evictions are illegal

NOTICE REQUIREMENTS
- Written notice required for most actions
- Notice periods vary by state
- Emergency entry allowed without notice
- Proper notice required for lease termination

REPAIRS AND MAINTENANCE
- Landlord responsible for major repairs
- Tenant responsible for damage caused by tenant
- Emergency repairs may allow tenant action
- Document all repair requests

UTILITIES AND SERVICES
- Cannot shut off utilities as form of eviction
- Utility arrangements must be clear in lease
- Essential services must be maintained
- Tenant responsible unless lease specifies otherwise

LEASE AGREEMENTS
- Must be in writing for leases over 1 year
- All terms must be clearly stated
- Unconscionable terms may be unenforceable
- State laws may override lease terms

DISCRIMINATION PROTECTION
- Federal fair housing laws apply everywhere
- State laws may provide additional protection
- Cannot be evicted for discriminatory reasons
- File complaints with appropriate agencies

MOVING OUT
- Proper notice required
- Return keys and provide forwarding address
- Clean premises and repair damage
- Request final inspection

LEGAL RESOURCES
- HUD: www.hud.gov
- Local legal aid organizations
- Tenant rights hotlines
- State housing agencies

EMERGENCY CONTACTS
- HUD Fair Housing Hotline: 1-800-669-9777
- Local Legal Aid
- Tenant Rights Hotlines
- State Housing Authorities

This guide is for informational purposes only and does not constitute legal advice. For specific legal questions, consult with an attorney or legal aid organization.`,

  'habitabilty-complaint.pdf': `HABITABILITY COMPLAINT TEMPLATE

[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE, ZIP]
[PHONE NUMBER]
[EMAIL]

[DATE]

[LANDLORD'S NAME]
[LANDLORD'S ADDRESS]
[CITY, STATE, ZIP]

RE: Habitability Complaint - [PROPERTY ADDRESS]

Dear [LANDLORD'S NAME],

I am writing to formally notify you of habitability issues at my rental unit located at [PROPERTY ADDRESS]. These conditions affect my health and safety and require immediate attention.

ISSUES REQUIRING REPAIR:

1. [DESCRIBE ISSUE 1]
   - Location: [SPECIFIC LOCATION]
   - Impact: [HOW IT AFFECTS HEALTH/SAFETY]
   - Requested action: [WHAT NEEDS TO BE DONE]

2. [DESCRIBE ISSUE 2]
   - Location: [SPECIFIC LOCATION]
   - Impact: [HOW IT AFFECTS HEALTH/SAFETY]
   - Requested action: [WHAT NEEDS TO BE DONE]

3. [DESCRIBE ISSUE 3]
   - Location: [SPECIFIC LOCATION]
   - Impact: [HOW IT AFFECTS HEALTH/SAFETY]
   - Requested action: [WHAT NEEDS TO BE DONE]

LEGAL BASIS:
These conditions violate the implied warranty of habitability and state housing codes. Under [STATE] law, landlords must maintain premises in habitable condition.

REQUESTED ACTION:
I request that these issues be repaired within [NUMBER] days of receipt of this letter. If repairs are not completed within this timeframe, I may exercise my legal rights, including but not limited to:
- Withholding rent
- Making repairs and deducting from rent
- Filing complaints with housing authorities
- Pursuing legal action

DOCUMENTATION:
I have documented these issues with photographs and will continue to document all communications regarding these repairs.

Please contact me at [PHONE NUMBER] or [EMAIL] to schedule repairs or discuss this matter.

Sincerely,

[YOUR NAME]

CC: [ANY RELEVANT AGENCIES OR ORGANIZATIONS]`,

  'rent-challenge.pdf': `RENT INCREASE CHALLENGE TEMPLATE

[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE, ZIP]
[PHONE NUMBER]
[EMAIL]

[DATE]

[LANDLORD'S NAME]
[LANDLORD'S ADDRESS]
[CITY, STATE, ZIP]

RE: Challenge to Rent Increase - [PROPERTY ADDRESS]

Dear [LANDLORD'S NAME],

I am writing to formally challenge the rent increase notice I received on [DATE OF NOTICE] for my rental unit at [PROPERTY ADDRESS].

DETAILS OF CHALLENGE:

1. Current Rent: $[AMOUNT]
2. Proposed New Rent: $[AMOUNT]
3. Increase Amount: $[AMOUNT]
4. Increase Percentage: [PERCENTAGE]%
5. Effective Date: [DATE]

BASIS FOR CHALLENGE:

1. [REASON 1 - e.g., "The increase exceeds legal limits under rent control laws"]
2. [REASON 2 - e.g., "Insufficient notice was provided"]
3. [REASON 3 - e.g., "The increase is retaliatory for my complaint about habitability issues"]

LEGAL BASIS:
This rent increase appears to violate [SPECIFIC LAW OR REGULATION]. Under [STATE/CITY] law, [EXPLAIN RELEVANT LEGAL REQUIREMENTS].

DOCUMENTATION:
I have attached the following documentation:
- Copy of rent increase notice
- Copy of my lease agreement
- [ANY OTHER RELEVANT DOCUMENTS]

REQUESTED ACTION:
I request that you:
1. Withdraw the rent increase notice
2. Maintain my current rent of $[AMOUNT]
3. Provide written confirmation of the withdrawal

If this matter is not resolved within [NUMBER] days, I may:
- File a complaint with [RELEVANT AGENCY]
- Seek legal counsel
- Pursue other available remedies

Please contact me at [PHONE NUMBER] or [EMAIL] to discuss this matter.

Sincerely,

[YOUR NAME]

CC: [ANY RELEVANT AGENCIES]`,

  'deposit-demand.pdf': `SECURITY DEPOSIT DEMAND LETTER

[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE, ZIP]
[PHONE NUMBER]
[EMAIL]

[DATE]

[LANDLORD'S NAME]
[LANDLORD'S ADDRESS]
[CITY, STATE, ZIP]

RE: Security Deposit Demand - [PROPERTY ADDRESS]

Dear [LANDLORD'S NAME],

I am writing to demand the return of my security deposit for the rental unit at [PROPERTY ADDRESS].

DETAILS:

1. Move-out Date: [DATE]
2. Security Deposit Amount: $[AMOUNT]
3. Days Since Move-out: [NUMBER] days
4. Legal Deadline: [DATE] (based on state law)

LEGAL REQUIREMENTS:
Under [STATE] law, landlords must return security deposits within [NUMBER] days of move-out. If deductions are made, an itemized list must be provided.

CURRENT STATUS:
I have not received my security deposit or an itemized list of deductions within the required timeframe.

DOCUMENTATION:
I have attached the following documentation:
- Copy of my lease agreement
- Move-out inspection report (if applicable)
- Photographs of the unit at move-out
- [ANY OTHER RELEVANT DOCUMENTS]

DEMAND:
I demand that you immediately:
1. Return my full security deposit of $[AMOUNT]
2. Provide an itemized list of any deductions (if applicable)
3. Provide written confirmation of the return

LEGAL ACTION:
If my security deposit is not returned within [NUMBER] days of this letter, I may:
- File a complaint with [RELEVANT AGENCY]
- Pursue legal action in small claims court
- Seek additional damages as allowed by law

Please contact me at [PHONE NUMBER] or [EMAIL] to arrange the return of my security deposit.

Sincerely,

[YOUR NAME]

CC: [ANY RELEVANT AGENCIES]`,

  'repair-request.pdf': `REPAIR REQUEST LETTER

[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE, ZIP]
[PHONE NUMBER]
[EMAIL]

[DATE]

[LANDLORD'S NAME]
[LANDLORD'S ADDRESS]
[CITY, STATE, ZIP]

RE: Repair Request - [PROPERTY ADDRESS]

Dear [LANDLORD'S NAME],

I am writing to request repairs for issues at my rental unit located at [PROPERTY ADDRESS].

REPAIR REQUESTS:

1. [DESCRIBE REPAIR 1]
   - Location: [SPECIFIC LOCATION]
   - Issue: [DETAILED DESCRIPTION]
   - Impact: [HOW IT AFFECTS USE OF PREMISES]
   - Urgency: [HIGH/MEDIUM/LOW]

2. [DESCRIBE REPAIR 2]
   - Location: [SPECIFIC LOCATION]
   - Issue: [DETAILED DESCRIPTION]
   - Impact: [HOW IT AFFECTS USE OF PREMISES]
   - Urgency: [HIGH/MEDIUM/LOW]

3. [DESCRIBE REPAIR 3]
   - Location: [SPECIFIC LOCATION]
   - Issue: [DETAILED DESCRIPTION]
   - Impact: [HOW IT AFFECTS USE OF PREMISES]
   - Urgency: [HIGH/MEDIUM/LOW]

LEGAL BASIS:
Under [STATE] law, landlords are responsible for maintaining premises in habitable condition and making necessary repairs.

REQUESTED TIMELINE:
I request that these repairs be completed within [NUMBER] days of receipt of this letter. For urgent repairs affecting health and safety, I request immediate attention.

ACCESS FOR REPAIRS:
I am available for repair access at the following times:
- [AVAILABLE TIMES]
- Contact me at [PHONE NUMBER] to schedule

DOCUMENTATION:
I have documented these issues with photographs and will continue to document all communications regarding these repairs.

FOLLOW-UP:
If repairs are not completed within the requested timeframe, I may:
- Send a follow-up letter
- File a complaint with housing authorities
- Exercise my legal rights under state law

Please contact me at [PHONE NUMBER] or [EMAIL] to schedule repairs or discuss this matter.

Sincerely,

[YOUR NAME]

CC: [ANY RELEVANT AGENCIES]`
};

// Generate all PDFs
async function generateAllPDFs() {
  console.log('Generating PDF templates...');
  
  for (const [filename, content] of Object.entries(templates)) {
    try {
      await createPDF(content, filename);
      console.log(`✓ Generated ${filename}`);
    } catch (error) {
      console.error(`✗ Failed to generate ${filename}:`, error);
    }
  }
  
  console.log('PDF generation complete!');
}

generateAllPDFs(); 