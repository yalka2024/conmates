import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import VideoPlaceholder from "@/components/video-placeholder";
import { 
  Play, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Download,
  ArrowLeft,
  ArrowRight,
  Lock,
  Star,
  Users,
  FileText,
  Shield,
  AlertTriangle,
  Target,
  Video,
  FileText as FileTextIcon
} from "lucide-react";
import Link from "next/link";

export default function TenantRights101Page() {
  const courseData = {
    title: "Tenant Rights 101",
    description: "Master the fundamentals of tenant rights and learn how to protect yourself in any rental situation.",
    price: 99,
    duration: "2 hours",
    lessons: 12,
    students: 1250,
    rating: 4.8,
    instructor: "Sarah Johnson, Esq.",
    instructorTitle: "Tenant Rights Attorney",
    instructorBio: "Sarah has been practicing tenant law for over 15 years and has helped thousands of tenants understand and protect their rights.",
    
    modules: [
      {
        id: 1,
        title: "Understanding Your Basic Rights",
        duration: "15 min",
        lessons: [
          {
            id: 1,
            title: "Introduction to Tenant Rights",
            duration: "15:30",
            videoUrl: "/videos/tenant-rights-intro.mp4",
            description: "Learn the fundamental rights every tenant has and how to protect yourself.",
            materials: [
              "Tenant Rights Checklist",
              "State-Specific Rights Guide",
              "Emergency Contact Template"
            ]
          },
          {
            id: 2,
            title: "Right to Habitable Housing",
            duration: "5 min",
            type: "lesson",
            description: "What constitutes habitable housing and your rights regarding repairs",
            completed: true,
            content: `
              <h3>Your Right to Habitable Housing</h3>
              <p>Every tenant has the right to live in a safe, habitable dwelling. This includes:</p>
              <ul>
                <li>Working plumbing and electricity</li>
                <li>Heating and air conditioning</li>
                <li>No mold or pest infestations</li>
                <li>Secure doors and windows</li>
                <li>Clean, sanitary conditions</li>
              </ul>
              <p><strong>What to do if your home is uninhabitable:</strong></p>
              <ol>
                <li>Document the issues with photos and videos</li>
                <li>Notify your landlord in writing</li>
                <li>Give reasonable time for repairs</li>
                <li>Contact local housing authorities if needed</li>
              </ol>
              
              <h4>Downloadable Resources:</h4>
              <ul>
                <li><a href="/resources/repair-request-template.pdf" download>Repair Request Template</a></li>
                <li><a href="/resources/habitability-checklist.pdf" download>Habitability Checklist</a></li>
              </ul>
            `
          },
          {
            id: 3,
            title: "Right to Privacy",
            duration: "5 min",
            type: "lesson",
            description: "Understanding your privacy rights and landlord entry restrictions",
            completed: false,
            content: `
              <h3>Your Right to Privacy</h3>
              <p>Your home is your sanctuary. Landlords cannot enter without proper notice except in emergencies.</p>
              <h4>Notice Requirements:</h4>
              <ul>
                <li><strong>24 hours notice</strong> for non-emergency entry</li>
                <li><strong>Reasonable time</strong> (usually 8 AM - 6 PM)</li>
                <li><strong>Written notice</strong> is preferred</li>
                <li><strong>No notice needed</strong> for true emergencies</li>
              </ul>
              <h4>What constitutes an emergency?</h4>
              <ul>
                <li>Fire or flood</li>
                <li>Gas leak</li>
                <li>Broken water pipe</li>
                <li>Electrical hazard</li>
              </ul>
              <p><strong>If your landlord enters without notice:</strong></p>
              <ol>
                <li>Document the incident</li>
                <li>Send a written complaint</li>
                <li>Consider changing locks (check your lease first)</li>
                <li>Contact legal aid if it continues</li>
              </ol>
              
              <h4>Downloadable Resources:</h4>
              <ul>
                <li><a href="/resources/privacy-rights-guide.pdf" download>Privacy Rights Guide</a></li>
                <li><a href="/resources/entry-notice-template.pdf" download>Entry Notice Template</a></li>
              </ul>
            `
          }
        ]
      },
      {
        id: 2,
        title: "Lease Agreements & Your Rights",
        duration: "20 min",
        lessons: [
          {
            id: 4,
            title: "Reading Your Lease Agreement",
            duration: "7 min",
            type: "lesson",
            description: "How to read and understand your lease agreement",
            completed: false,
            content: `
              <h3>How to Read Your Lease Agreement</h3>
              <p>Your lease is a legally binding contract. Here's how to understand it:</p>
              <h4>Key Sections to Review:</h4>
              <ul>
                <li><strong>Parties:</strong> Who is renting to whom</li>
                <li><strong>Property:</strong> Exact address and unit number</li>
                <li><strong>Term:</strong> How long the lease lasts</li>
                <li><strong>Rent:</strong> Amount, due date, and late fees</li>
                <li><strong>Security Deposit:</strong> Amount and return conditions</li>
                <li><strong>Utilities:</strong> Who pays for what</li>
                <li><strong>Rules:</strong> Pet policies, noise, guests</li>
              </ul>
              <h4>Red Flags to Watch For:</h4>
              <ul>
                <li>Unreasonable late fees (over 5% of rent)</li>
                <li>Automatic rent increases</li>
                <li>Waiver of tenant rights</li>
                <li>Excessive cleaning requirements</li>
                <li>Unlimited entry rights</li>
              </ul>
              <p><strong>Always read the entire lease before signing!</strong></p>
              
              <h4>Downloadable Resources:</h4>
              <ul>
                <li><a href="/resources/lease-review-checklist.pdf" download>Lease Review Checklist</a></li>
                <li><a href="/resources/red-flags-guide.pdf" download>Red Flags Guide</a></li>
              </ul>
            `
          },
          {
            id: 5,
            title: "Unenforceable Lease Clauses",
            duration: "7 min",
            type: "lesson",
            description: "Identifying illegal or unenforceable terms in your lease",
            completed: false,
            content: `
              <h3>Unenforceable Lease Clauses</h3>
              <p>Some lease terms are illegal and cannot be enforced, even if you sign them.</p>
              <h4>Common Illegal Clauses:</h4>
              <ul>
                <li><strong>Waiver of Habitability:</strong> "Tenant accepts property as-is"</li>
                <li><strong>Excessive Late Fees:</strong> More than state maximum</li>
                <li><strong>Unlimited Entry:</strong> "Landlord can enter anytime"</li>
                <li><strong>Automatic Eviction:</strong> "One late payment = eviction"</li>
                <li><strong>Tenant Pays All Repairs:</strong> Including landlord's responsibility</li>
                <li><strong>No Right to Sue:</strong> "Tenant waives all legal rights"</li>
              </ul>
              <h4>What to Do About Illegal Clauses:</h4>
              <ol>
                <li>Cross out the illegal clause</li>
                <li>Initial the change</li>
                <li>Keep a copy of the modified lease</li>
                <li>If landlord refuses, consider not signing</li>
              </ol>
              <p><strong>Remember:</strong> You cannot sign away your legal rights!</p>
              
              <h4>Downloadable Resources:</h4>
              <ul>
                <li><a href="/resources/illegal-clauses-guide.pdf" download>Illegal Clauses Guide</a></li>
                <li><a href="/resources/lease-modification-template.pdf" download>Lease Modification Template</a></li>
              </ul>
            `
          },
          {
            id: 6,
            title: "Negotiating Lease Terms",
            duration: "6 min",
            type: "lesson",
            description: "Tips for negotiating better lease terms before signing",
            completed: false,
            content: `
              <h3>Negotiating Better Lease Terms</h3>
              <p>Everything in a lease is negotiable before you sign. Here's how to get better terms:</p>
              <h4>Negotiable Items:</h4>
              <ul>
                <li><strong>Rent Amount:</strong> Research market rates</li>
                <li><strong>Security Deposit:</strong> Ask for lower amount</li>
                <li><strong>Pet Policies:</strong> Request pet-friendly terms</li>
                <li><strong>Utilities:</strong> Negotiate who pays what</li>
                <li><strong>Maintenance:</strong> Clarify repair responsibilities</li>
                <li><strong>Lease Term:</strong> Shorter or longer options</li>
              </ul>
              <h4>Negotiation Strategies:</h4>
              <ol>
                <li>Research comparable rentals</li>
                <li>Highlight your good tenant history</li>
                <li>Offer to sign longer lease for better terms</li>
                <li>Ask for improvements or upgrades</li>
                <li>Be willing to walk away</li>
              </ol>
              <p><strong>Pro Tip:</strong> Get all changes in writing!</p>
            `
          }
        ]
      },
      {
        id: 3,
        title: "Security Deposits & Rent",
        duration: "25 min",
        lessons: [
          {
            id: 7,
            title: "Security Deposit Laws",
            duration: "8 min",
            type: "lesson",
            description: "Understanding security deposit limits and return requirements",
            completed: false,
            content: `
              <h3>Security Deposit Laws</h3>
              <p>Security deposits are heavily regulated to protect tenants. Here's what you need to know:</p>
              <h4>Deposit Limits by State:</h4>
              <ul>
                <li><strong>California:</strong> 2 months rent maximum</li>
                <li><strong>New York:</strong> 1 month rent maximum</li>
                <li><strong>Texas:</strong> No state limit</li>
                <li><strong>Florida:</strong> No state limit</li>
                <li><strong>Illinois:</strong> No state limit</li>
              </ul>
              <h4>Landlord Responsibilities:</h4>
              <ul>
                <li>Return deposit within 21-30 days (varies by state)</li>
                <li>Provide itemized deductions</li>
                <li>Cannot charge for normal wear and tear</li>
                <li>Must store deposit in separate account</li>
                <li>Pay interest in some states</li>
              </ul>
              <h4>Protecting Your Deposit:</h4>
              <ol>
                <li>Take photos before moving in</li>
                <li>Document existing damage</li>
                <li>Keep copies of all communications</li>
                <li>Clean thoroughly before moving out</li>
                <li>Request final walk-through</li>
              </ol>
              <p><strong>If your deposit is wrongfully withheld, you can sue for 2-3x the amount!</strong></p>
            `
          },
          {
            id: 8,
            title: "Rent Increases & Limits",
            duration: "8 min",
            type: "lesson",
            description: "When and how much your rent can be increased",
            completed: false,
            content: `
              <h3>Rent Increases & Limits</h3>
              <p>Rent increases are regulated in many areas. Know your rights:</p>
              <h4>Rent Control Areas:</h4>
              <ul>
                <li><strong>New York City:</strong> Rent stabilization</li>
                <li><strong>San Francisco:</strong> Rent control</li>
                <li><strong>Los Angeles:</strong> Rent control</li>
                <li><strong>Washington DC:</strong> Rent control</li>
                <li><strong>Oregon:</strong> Statewide rent control</li>
              </ul>
              <h4>Notice Requirements:</h4>
              <ul>
                <li><strong>Month-to-month:</strong> 30-60 days notice</li>
                <li><strong>Fixed-term lease:</strong> No increase during term</li>
                <li><strong>Rent control:</strong> Limited annual increases</li>
                <li><strong>Market rate:</strong> Varies by state</li>
              </ul>
              <h4>Fighting Unreasonable Increases:</h4>
              <ol>
                <li>Research market rates in your area</li>
                <li>Check if you're in a rent-controlled area</li>
                <li>Negotiate with your landlord</li>
                <li>File complaint with housing authority</li>
                <li>Consider moving if necessary</li>
              </ol>
              <p><strong>Remember:</strong> Rent increases cannot be retaliatory!</p>
            `
          },
          {
            id: 9,
            title: "Late Fees & Rent Payment",
            duration: "9 min",
            type: "lesson",
            description: "Understanding late fees and rent payment requirements",
            completed: false,
            content: `
              <h3>Late Fees & Rent Payment</h3>
              <p>Understanding rent payment rules and late fee limits:</p>
              <h4>Late Fee Limits:</h4>
              <ul>
                <li><strong>California:</strong> 5% of rent or $50, whichever is less</li>
                <li><strong>New York:</strong> 5% of rent</li>
                <li><strong>Texas:</strong> No state limit</li>
                <li><strong>Florida:</strong> No state limit</li>
                <li><strong>Illinois:</strong> No state limit</li>
              </ul>
              <h4>Rent Payment Rules:</h4>
              <ul>
                <li>Rent is due on the date specified in lease</li>
                <li>No grace period unless specified</li>
                <li>Payment methods must be reasonable</li>
                <li>Landlord must provide receipts</li>
                <li>Partial payments may be accepted</li>
              </ul>
              <h4>If You Can't Pay Rent:</h4>
              <ol>
                <li>Contact landlord immediately</li>
                <li>Ask for payment plan</li>
                <li>Apply for rental assistance</li>
                <li>Document all communications</li>
                <li>Know your eviction rights</li>
              </ol>
              <p><strong>Pro Tip:</strong> Always pay rent on time to avoid late fees and eviction risk!</p>
            `
          }
        ]
      },
      {
        id: 4,
        title: "Repairs & Maintenance",
        duration: "30 min",
        lessons: [
          {
            id: 10,
            title: "Requesting Repairs",
            duration: "10 min",
            type: "lesson",
            description: "How to properly request repairs and document issues",
            completed: false,
            content: `
              <h3>How to Request Repairs</h3>
              <p>Properly requesting repairs protects your rights and ensures they get done:</p>
              <h4>Repair Request Process:</h4>
              <ol>
                <li><strong>Document the Problem:</strong> Take photos and videos</li>
                <li><strong>Write a Formal Request:</strong> Be specific and detailed</li>
                <li><strong>Send via Certified Mail:</strong> Keep proof of delivery</li>
                <li><strong>Follow Up:</strong> Call after 24-48 hours</li>
                <li><strong>Escalate if Needed:</strong> Contact housing authorities</li>
              </ol>
              <h4>Sample Repair Request Letter:</h4>
              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
                <p><strong>Date:</strong> [Current Date]</p>
                <p><strong>To:</strong> [Landlord Name and Address]</p>
                <p><strong>Subject:</strong> Repair Request - [Specific Issue]</p>
                <p>Dear [Landlord Name],</p>
                <p>I am writing to request repairs for the following issue in my unit at [Address]:</p>
                <p>[Describe problem in detail]</p>
                <p>This issue affects my health/safety/comfort and requires immediate attention.</p>
                <p>Please contact me to schedule the repair within [reasonable timeframe].</p>
                <p>Sincerely,<br>[Your Name]</p>
              </div>
              <h4>Emergency vs. Non-Emergency:</h4>
              <ul>
                <li><strong>Emergency:</strong> Call immediately (fire, flood, no heat)</li>
                <li><strong>Non-Emergency:</strong> Written request with reasonable timeframe</li>
              </ul>
            `
          },
          {
            id: 11,
            title: "Withholding Rent for Repairs",
            duration: "10 min",
            type: "lesson",
            description: "When and how you can withhold rent for necessary repairs",
            completed: false,
            content: `
              <h3>Withholding Rent for Repairs</h3>
              <p>Rent withholding is a legal remedy but must be done correctly:</p>
              <h4>When You Can Withhold Rent:</h4>
              <ul>
                <li>Landlord has been notified of the problem</li>
                <li>Reasonable time has passed for repairs</li>
                <li>Problem affects habitability</li>
                <li>You've given proper notice</li>
                <li>You're current on rent</li>
              </ul>
              <h4>Proper Rent Withholding Process:</h4>
              <ol>
                <li>Send written notice of intent to withhold</li>
                <li>Specify the problems and timeline</li>
                <li>Put rent in escrow account</li>
                <li>Continue paying rent to escrow</li>
                <li>Release rent when repairs are complete</li>
              </ol>
              <h4>Risks of Rent Withholding:</h4>
              <ul>
                <li>Landlord may file for eviction</li>
                <li>You may need to prove your case in court</li>
                <li>Not all states allow rent withholding</li>
                <li>Must follow strict procedures</li>
              </ul>
              <p><strong>Warning:</strong> Never stop paying rent without following proper procedures!</p>
            `
          },
          {
            id: 12,
            title: "Emergency Repairs",
            duration: "10 min",
            type: "lesson",
            description: "Handling emergency repairs and urgent maintenance issues",
            completed: false,
            content: `
              <h3>Emergency Repairs</h3>
              <p>Emergency repairs require immediate action to protect your safety:</p>
              <h4>What Constitutes an Emergency:</h4>
              <ul>
                <li><strong>No Heat:</strong> Below freezing temperatures</li>
                <li><strong>No Water:</strong> Complete loss of water service</li>
                <li><strong>Electrical Issues:</strong> Sparks, exposed wires</li>
                <li><strong>Gas Leaks:</strong> Smell of gas or carbon monoxide</li>
                <li><strong>Flooding:</strong> Active water damage</li>
                <li><strong>Fire Hazards:</strong> Broken smoke detectors</li>
              </ul>
              <h4>Emergency Response Steps:</h4>
              <ol>
                <li><strong>Call 911</strong> if immediate danger</li>
                <li><strong>Contact landlord</strong> immediately</li>
                <li><strong>Document everything</strong> with photos/videos</li>
                <li><strong>Make temporary repairs</strong> if safe</li>
                <li><strong>Keep receipts</strong> for emergency expenses</li>
                <li><strong>Follow up in writing</strong> after emergency</li>
              </ol>
              <h4>Emergency Contact Numbers:</h4>
              <ul>
                <li><strong>Fire/Police:</strong> 911</li>
                <li><strong>Gas Company:</strong> [Local number]</li>
                <li><strong>Electric Company:</strong> [Local number]</li>
                <li><strong>Water Department:</strong> [Local number]</li>
                <li><strong>Code Enforcement:</strong> [Local number]</li>
              </ul>
              <p><strong>Remember:</strong> Your safety comes first!</p>
            `
          }
        ]
      }
    ],
    
    resources: [
      {
        title: "Tenant Rights Checklist",
        type: "PDF",
        description: "Printable checklist of your basic tenant rights",
        downloadUrl: "/resources/tenant-rights-checklist.pdf",
        content: `
          <h3>Tenant Rights Checklist</h3>
          <h4>Before Moving In:</h4>
          <ul>
            <li>□ Read entire lease before signing</li>
            <li>□ Take photos of property condition</li>
            <li>□ Get security deposit receipt</li>
            <li>□ Verify utilities are working</li>
            <li>□ Get landlord's contact information</li>
          </ul>
          <h4>During Tenancy:</h4>
          <ul>
            <li>□ Pay rent on time</li>
            <li>□ Report problems immediately</li>
            <li>□ Keep copies of all communications</li>
            <li>□ Document any issues with photos</li>
            <li>□ Know your privacy rights</li>
          </ul>
          <h4>When Moving Out:</h4>
          <ul>
            <li>□ Give proper notice</li>
            <li>□ Clean thoroughly</li>
            <li>□ Take final photos</li>
            <li>□ Return keys</li>
            <li>□ Request security deposit return</li>
          </ul>
        `
      },
      {
        title: "Repair Request Template",
        type: "PDF",
        description: "Template for requesting repairs from your landlord",
        downloadUrl: "/resources/repair-request-template.pdf",
        content: `
          <h3>Repair Request Template</h3>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 5px;">
            <p><strong>Date:</strong> [Insert Date]</p>
            <p><strong>To:</strong> [Landlord Name]<br>
            [Landlord Address]</p>
            <p><strong>From:</strong> [Your Name]<br>
            [Your Address]</p>
            <p><strong>Subject:</strong> Repair Request</p>
            <p>Dear [Landlord Name],</p>
            <p>I am writing to request repairs for the following issue(s) in my rental unit:</p>
            <p><strong>Problem Description:</strong><br>
            [Describe the problem in detail]</p>
            <p><strong>Location:</strong> [Where in the unit]</p>
            <p><strong>When Noticed:</strong> [Date you first noticed the problem]</p>
            <p><strong>Impact:</strong> [How this affects your health, safety, or comfort]</p>
            <p>Please contact me to schedule the repair within [reasonable timeframe, e.g., 7 days].</p>
            <p>Thank you for your attention to this matter.</p>
            <p>Sincerely,<br>
            [Your Name]<br>
            [Your Phone Number]<br>
            [Your Email]</p>
          </div>
        `
      },
      {
        title: "Security Deposit Documentation",
        type: "PDF",
        description: "Guide to documenting your apartment condition",
        downloadUrl: "/resources/security-deposit-guide.pdf",
        content: `
          <h3>Security Deposit Documentation Guide</h3>
          <h4>Before Moving In:</h4>
          <ul>
            <li>Take photos of every room</li>
            <li>Document existing damage</li>
            <li>Note any stains or marks</li>
            <li>Test all appliances</li>
            <li>Check for pests</li>
          </ul>
          <h4>What to Photograph:</h4>
          <ul>
            <li>Walls and ceilings</li>
            <li>Floors and carpets</li>
            <li>Kitchen appliances</li>
            <li>Bathroom fixtures</li>
            <li>Windows and doors</li>
            <li>Any existing damage</li>
          </ul>
          <h4>Documentation Tips:</h4>
          <ul>
            <li>Use date-stamped photos</li>
            <li>Include close-ups of damage</li>
            <li>Keep copies in multiple places</li>
            <li>Send copy to landlord</li>
            <li>Keep receipts for any repairs you make</li>
          </ul>
        `
      }
    ]
  };

  const completedLessons = 2;
  const totalLessons = courseData.lessons;
  const progress = (completedLessons / totalLessons) * 100;

  const lessons = [
    {
      id: 1,
      title: "Introduction to Tenant Rights",
      duration: "15:30",
      videoUrl: "/videos/tenant-rights-intro.mp4",
      description: "Learn the fundamental rights every tenant has and how to protect yourself.",
      materials: [
        "Tenant Rights Checklist",
        "State-Specific Rights Guide",
        "Emergency Contact Template"
      ],
      quiz: {
        questions: [
          {
            id: 1,
            question: "Which of the following is NOT a fundamental tenant right?",
            options: [
              "Right to habitable housing",
              "Right to privacy",
              "Right to withhold rent without notice",
              "Right to be free from discrimination"
            ],
            correctAnswer: 2,
            explanation: "Tenants cannot withhold rent without proper notice and following legal procedures. This could lead to eviction."
          },
          {
            id: 2,
            question: "What is the maximum security deposit allowed in most states?",
            options: [
              "1 month's rent",
              "2 months' rent",
              "3 months' rent",
              "No limit"
            ],
            correctAnswer: 1,
            explanation: "Most states limit security deposits to 1-2 months' rent, though some allow up to 3 months."
          }
        ]
      },
      interactiveScenario: {
        title: "Your First Apartment",
        description: "You're moving into your first apartment. The landlord asks for 3 months' rent as a security deposit and wants to do weekly inspections.",
        scenario: "You've found a great apartment, but the landlord's terms seem unusual. How do you respond?",
        options: [
          {
            id: "a",
            text: "Agree to everything to secure the apartment",
            outcome: "This could lead to problems. High deposits and frequent inspections may violate your rights.",
            learning: "Always review terms carefully and know your rights before agreeing."
          },
          {
            id: "b",
            text: "Ask for clarification and research local laws",
            outcome: "Good approach! You're being proactive about your rights.",
            learning: "Researching local tenant laws helps you make informed decisions."
          },
          {
            id: "c",
            text: "Refuse and look elsewhere",
            outcome: "While cautious, you might miss a good opportunity. Better to investigate first.",
            learning: "Don't immediately reject - investigate and negotiate when possible."
          }
        ]
      }
    },
    {
      id: 2,
      title: "Understanding Your Lease Agreement",
      duration: "22:15",
      videoUrl: "/videos/understanding-lease.mp4",
      description: "Break down complex lease terms and identify important clauses you need to know.",
      materials: [
        "Lease Analysis Worksheet",
        "Common Lease Terms Glossary",
        "Red Flag Checklist"
      ],
      quiz: {
        questions: [
          {
            id: 1,
            question: "What should you do if you find an unfair clause in your lease?",
            options: [
              "Sign anyway and deal with it later",
              "Cross it out and initial it",
              "Negotiate with the landlord before signing",
              "Ignore it completely"
            ],
            correctAnswer: 2,
            explanation: "Always negotiate unfair terms before signing. Once signed, you're bound by the agreement."
          }
        ]
      },
      interactiveScenario: {
        title: "Lease Review Challenge",
        description: "Review a sample lease and identify potential issues.",
        scenario: "You're reviewing a lease that includes a clause requiring you to pay for all repairs, even normal wear and tear.",
        options: [
          {
            id: "a",
            text: "This is normal - sign it",
            outcome: "Incorrect! Normal wear and tear is the landlord's responsibility.",
            learning: "Landlords cannot charge for normal wear and tear."
          },
          {
            id: "b",
            text: "This is illegal - refuse to sign",
            outcome: "Correct! This clause violates tenant rights in most states.",
            learning: "Know what landlords can and cannot charge for."
          }
        ]
      }
    },
    {
      id: 3,
      title: "Security Deposits and Rent",
      duration: "18:45",
      videoUrl: "/videos/security-deposits.mp4",
      description: "Everything you need to know about security deposits, rent increases, and payment rights.",
      materials: [
        "Security Deposit Tracker",
        "Rent Payment Log",
        "Deposit Dispute Letter Template"
      ],
      quiz: {
        questions: [
          {
            id: 1,
            question: "How long does a landlord typically have to return your security deposit?",
            options: [
              "Immediately upon move-out",
              "14-30 days",
              "60-90 days",
              "No time limit"
            ],
            correctAnswer: 1,
            explanation: "Most states require landlords to return deposits within 14-30 days of move-out."
          }
        ]
      }
    },
    {
      id: 4,
      title: "Maintenance and Repairs",
      duration: "20:10",
      videoUrl: "/videos/maintenance-repairs.mp4",
      description: "Your rights regarding property maintenance and how to request repairs properly.",
      materials: [
        "Maintenance Request Form",
        "Repair Timeline Tracker",
        "Emergency Repair Guide"
      ],
      quiz: {
        questions: [
          {
            id: 1,
            question: "What should you do if your landlord doesn't make necessary repairs?",
            options: [
              "Stop paying rent immediately",
              "Make the repairs yourself and deduct from rent",
              "Document everything and follow legal procedures",
              "Move out without notice"
            ],
            correctAnswer: 2,
            explanation: "Always document issues and follow proper legal procedures before withholding rent."
          }
        ]
      }
    },
    {
      id: 5,
      title: "Privacy and Entry Rights",
      duration: "16:20",
      videoUrl: "/videos/privacy-entry-rights.mp4",
      description: "Understanding your right to privacy and when landlords can enter your unit.",
      materials: [
        "Privacy Rights Summary",
        "Entry Notice Log",
        "Privacy Violation Response Template"
      ],
      quiz: {
        questions: [
          {
            id: 1,
            question: "How much notice must a landlord give before entering your unit?",
            options: [
              "No notice required",
              "24 hours",
              "48 hours",
              "1 week"
            ],
            correctAnswer: 1,
            explanation: "Most states require 24-48 hours notice for non-emergency entry."
          }
        ]
      }
    },
    {
      id: 6,
      title: "Eviction Protection",
      duration: "25:30",
      videoUrl: "/videos/eviction-protection.mp4",
      description: "Learn about eviction laws, your rights during the process, and how to fight wrongful evictions.",
      materials: [
        "Eviction Defense Checklist",
        "Legal Aid Resources",
        "Eviction Timeline Tracker"
      ],
      quiz: {
        questions: [
          {
            id: 1,
            question: "Can a landlord evict you without going to court?",
            options: [
              "Yes, if you're behind on rent",
              "No, landlords must go through court",
              "Only if you've been there less than 30 days",
              "Yes, if you violate the lease"
            ],
            correctAnswer: 1,
            explanation: "Landlords must go through court to legally evict tenants in all states."
          }
        ]
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="outline" className="mb-4">
            <Link href="/courses">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Link>
          </Button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">Beginner</Badge>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{courseData.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({courseData.students} students)</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{courseData.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{courseData.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {courseData.duration}
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {courseData.lessons} lessons
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  {courseData.students} enrolled
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">${courseData.price}</div>
              <Button size="lg" className="mt-2">
                Enroll Now
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Course Progress</span>
                    <span className="text-sm text-gray-600">{completedLessons}/{totalLessons} lessons</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                  <div className="text-sm text-gray-600">
                    {Math.round(progress)}% complete
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Modules */}
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {lessons.map((lesson) => (
                    <div key={lesson.id} className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold text-sm">{lesson.id}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{lesson.title}</h3>
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {lesson.duration}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4">{lesson.description}</p>
                          
                          {/* Video Player */}
                          <div className="mb-4">
                            <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                              <video 
                                className="w-full h-64 object-cover"
                                controls
                                preload="metadata"
                              >
                                <source src={lesson.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                                <div className="bg-white bg-opacity-90 rounded-full p-3">
                                  <Play className="w-6 h-6 text-blue-600" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Interactive Quiz */}
                          {lesson.quiz && (
                            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                              <h4 className="font-semibold text-blue-900 mb-3">Knowledge Check</h4>
                              <div className="space-y-4">
                                {lesson.quiz.questions.map((q) => (
                                  <div key={q.id} className="bg-white p-4 rounded border">
                                    <p className="font-medium mb-3">{q.question}</p>
                                    <div className="space-y-2">
                                      {q.options.map((option, index) => (
                                        <label key={index} className="flex items-center space-x-2 cursor-pointer">
                                          <input type="radio" name={`quiz-${lesson.id}-${q.id}`} className="text-blue-600" />
                                          <span className="text-sm">{option}</span>
                                        </label>
                                      ))}
                                    </div>
                                    <button className="mt-3 text-blue-600 text-sm hover:text-blue-800">
                                      Check Answer
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Interactive Scenario */}
                          {lesson.interactiveScenario && (
                            <div className="mb-6 p-4 bg-green-50 rounded-lg">
                              <h4 className="font-semibold text-green-900 mb-2">Interactive Scenario</h4>
                              <h5 className="font-medium text-green-800 mb-2">{lesson.interactiveScenario.title}</h5>
                              <p className="text-green-700 mb-3">{lesson.interactiveScenario.scenario}</p>
                              <div className="space-y-2">
                                {lesson.interactiveScenario.options.map((option) => (
                                  <button
                                    key={option.id}
                                    className="w-full text-left p-3 bg-white rounded border hover:bg-green-100 transition-colors"
                                  >
                                    <span className="font-medium">{option.id.toUpperCase()}. {option.text}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* AI-Powered Learning Assistant */}
                          <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-semibold text-purple-900 mb-3">AI Learning Assistant</h4>
                            <div className="space-y-3">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Ask a question about this lesson..."
                                  className="flex-1 px-3 py-2 border rounded text-sm"
                                />
                                <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">
                                  Ask AI
                                </button>
                              </div>
                              <div className="text-xs text-purple-700">
                                💡 Try asking: "What are my rights if my landlord refuses to make repairs?" or "How do I dispute an unfair security deposit deduction?"
                              </div>
                            </div>
                          </div>

                          {/* Downloadable Materials */}
                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-900">Downloadable Materials:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {lesson.materials.map((material, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                  <FileText className="w-4 h-4" />
                                  <span>{material}</span>
                                  <button className="ml-auto text-blue-600 hover:text-blue-800 text-xs">
                                    Download
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Progress Tracking */}
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Lesson Progress</span>
                              <div className="flex gap-2">
                                <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
                                  Mark Complete
                                </button>
                                <button className="px-3 py-1 border border-blue-600 text-blue-600 rounded text-xs hover:bg-blue-50">
                                  Take Notes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Lesson Content */}
            <Card>
              <CardHeader>
                <CardTitle>Current Lesson: Right to Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <FileTextIcon className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-600">Lesson Content</span>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <h3>Your Right to Privacy</h3>
                    <p>Your home is your sanctuary. Landlords cannot enter without proper notice except in emergencies.</p>
                    <h4>Notice Requirements:</h4>
                    <ul>
                      <li><strong>24 hours notice</strong> for non-emergency entry</li>
                      <li><strong>Reasonable time</strong> (usually 8 AM - 6 PM)</li>
                      <li><strong>Written notice</strong> is preferred</li>
                      <li><strong>No notice needed</strong> for true emergencies</li>
                    </ul>
                    <h4>What constitutes an emergency?</h4>
                    <ul>
                      <li>Fire or flood</li>
                      <li>Gas leak</li>
                      <li>Broken water pipe</li>
                      <li>Electrical hazard</li>
                    </ul>
                    <p><strong>If your landlord enters without notice:</strong></p>
                    <ol>
                      <li>Document the incident</li>
                      <li>Send a written complaint</li>
                      <li>Consider changing locks (check your lease first)</li>
                      <li>Contact legal aid if it continues</li>
                    </ol>
                    
                    <h4>Downloadable Resources:</h4>
                    <ul>
                      <li><a href="/resources/privacy-rights-guide.pdf" download className="text-blue-600 hover:underline">Privacy Rights Guide</a></li>
                      <li><a href="/resources/entry-notice-template.pdf" download className="text-blue-600 hover:underline">Entry Notice Template</a></li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Understanding Your Privacy Rights</h3>
                  <p className="text-gray-600">
                    Learn about your fundamental right to privacy in your rental unit. This lesson covers:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      When landlords can and cannot enter your unit
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      Required notice periods for non-emergency entry
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      How to handle unauthorized entry
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      Your rights regarding security cameras and surveillance
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Instructor */}
            <Card>
              <CardHeader>
                <CardTitle>Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">{courseData.instructor}</h3>
                  <p className="text-sm text-gray-600 mb-2">{courseData.instructorTitle}</p>
                  <p className="text-sm text-gray-600">{courseData.instructorBio}</p>
                </div>
              </CardContent>
            </Card>

            {/* Course Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Course Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {courseData.resources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-sm">{resource.title}</h4>
                        <p className="text-xs text-gray-600">{resource.description}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Features */}
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    Understand your fundamental tenant rights
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    Read and interpret lease agreements
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    Handle security deposit issues
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    Request and document repairs
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    Protect your privacy rights
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    Navigate rent increases legally
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card>
              <CardHeader>
                <CardTitle>Course Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/courses/lease-negotiation">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Next Course: Lease Negotiation
                    </Link>
                  </Button>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/courses">
                      View All Courses
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 