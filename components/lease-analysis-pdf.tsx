import type React from "react"
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

// Create styles without external font dependencies
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 40,
    fontSize: 11,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#3B82F6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  date: {
    fontSize: 10,
    color: "#9CA3AF",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  clauseContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
  },
  clauseTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 6,
  },
  clauseSection: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 8,
  },
  impactBadge: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#3B82F6",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  highImpact: {
    backgroundColor: "#EF4444",
  },
  mediumImpact: {
    backgroundColor: "#F59E0B",
  },
  lowImpact: {
    backgroundColor: "#10B981",
  },
  originalText: {
    fontSize: 10,
    color: "#4B5563",
    fontStyle: "italic",
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  explanation: {
    fontSize: 11,
    color: "#1F2937",
    backgroundColor: "#EBF8FF",
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  tipsContainer: {
    backgroundColor: "#F0FDF4",
    padding: 10,
    borderRadius: 4,
  },
  tipsTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#166534",
    marginBottom: 6,
  },
  tip: {
    fontSize: 10,
    color: "#166534",
    marginBottom: 3,
    paddingLeft: 10,
  },
  redFlagContainer: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: "#FEF2F2",
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
  },
  redFlagTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#991B1B",
    marginBottom: 6,
  },
  redFlagSeverity: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#EF4444",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 6,
    alignSelf: "flex-start",
  },
  redFlagDescription: {
    fontSize: 10,
    color: "#7F1D1D",
    marginBottom: 8,
  },
  redFlagImpact: {
    fontSize: 10,
    color: "#7F1D1D",
    backgroundColor: "#FEE2E2",
    padding: 8,
    borderRadius: 4,
    marginBottom: 6,
  },
  redFlagAction: {
    fontSize: 10,
    color: "#1E40AF",
    backgroundColor: "#EBF8FF",
    padding: 8,
    borderRadius: 4,
  },
  tipCategory: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: "#F0F9FF",
    borderRadius: 6,
  },
  tipCategoryTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1E40AF",
    marginBottom: 8,
  },
  tipItem: {
    fontSize: 10,
    color: "#1E40AF",
    marginBottom: 4,
    paddingLeft: 12,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 9,
    color: "#9CA3AF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 10,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 9,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#9CA3AF",
  }
})

interface LeaseAnalysisPDFProps {
  clauses: Array<{
    id: string
    title: string
    section: string
    originalText: string
    explanation: string
    impact: string
    tips: string[]
  }>
  redFlags: Array<{
    severity: string
    title: string
    description: string
    impact: string
    action: string
  }>
  actionableTips: Array<{
    category: string
    tips: string[]
  }>
}

const LeaseAnalysisPDF: React.FC<LeaseAnalysisPDFProps> = ({ clauses, redFlags, actionableTips }) => {
  const getImpactStyle = (impact: string) => {
    switch (impact) {
      case "high":
        return [styles.impactBadge, styles.highImpact]
      case "medium":
        return [styles.impactBadge, styles.mediumImpact]
      case "low":
        return [styles.impactBadge, styles.lowImpact]
      default:
        return styles.impactBadge
    }
  }

  return (
    <Document>
      {/* Page 1: Header and Clause Analysis */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Lease Analysis Report</Text>
          <Text style={styles.subtitle}>Complete breakdown of your lease agreement</Text>
          <Text style={styles.date}>Generated on {new Date().toLocaleDateString()}</Text>
        </View>

        {/* Executive Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executive Summary</Text>
          <Text style={{ fontSize: 11, color: "#4B5563", marginBottom: 10 }}>
            This report provides a comprehensive analysis of your lease agreement, breaking down complex legal language
            into plain English. We have identified key terms, potential concerns, and actionable recommendations to help
            you understand your rights and responsibilities.
          </Text>
          <Text style={{ fontSize: 11, color: "#4B5563" }}>
            Key findings: {redFlags.length} potential red flags identified, {clauses.length} clauses analyzed, and{" "}
            {actionableTips.reduce((acc, category) => acc + category.tips.length, 0)} actionable recommendations
            provided.
          </Text>
        </View>

        {/* Clause Analysis - First few clauses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Clause-by-Clause Analysis</Text>
          {clauses.slice(0, 2).map((clause) => (
            <View key={clause.id} style={styles.clauseContainer}>
              <Text style={styles.clauseTitle}>{clause.title}</Text>
              <Text style={styles.clauseSection}>{clause.section}</Text>
              <View style={getImpactStyle(clause.impact)}>
                <Text style={{ color: "#ffffff", fontSize: 9, fontWeight: "bold" }}>
                  {clause.impact.toUpperCase()} IMPACT
                </Text>
              </View>
              <View style={styles.originalText}>
                <Text>Original Text: "{clause.originalText}"</Text>
              </View>
              <View style={styles.explanation}>
                <Text>Plain English: {clause.explanation}</Text>
              </View>
              <View style={styles.tipsContainer}>
                <Text style={styles.tipsTitle}>Pro Tips:</Text>
                {clause.tips.map((tip, tipIndex) => (
                  <Text key={tipIndex} style={styles.tip}>
                    • {tip}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>

      {/* Page 2: Remaining Clauses */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Clause Analysis (Continued)</Text>
          {clauses.slice(2).map((clause) => (
            <View key={clause.id} style={styles.clauseContainer}>
              <Text style={styles.clauseTitle}>{clause.title}</Text>
              <Text style={styles.clauseSection}>{clause.section}</Text>
              <View style={getImpactStyle(clause.impact)}>
                <Text style={{ color: "#ffffff", fontSize: 9, fontWeight: "bold" }}>
                  {clause.impact.toUpperCase()} IMPACT
                </Text>
              </View>
              <View style={styles.originalText}>
                <Text>Original Text: "{clause.originalText}"</Text>
              </View>
              <View style={styles.explanation}>
                <Text>Plain English: {clause.explanation}</Text>
              </View>
              <View style={styles.tipsContainer}>
                <Text style={styles.tipsTitle}>Pro Tips:</Text>
                {clause.tips.map((tip, tipIndex) => (
                  <Text key={tipIndex} style={styles.tip}>
                    • {tip}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>

      {/* Page 3: Red Flags */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Potential Red Flags</Text>
          <Text style={{ fontSize: 11, color: "#4B5563", marginBottom: 15 }}>
            We have identified several clauses that may work against your interests. Here is what to watch out for:
          </Text>
          {redFlags.map((flag, index) => (
            <View key={index} style={styles.redFlagContainer}>
              <Text style={styles.redFlagTitle}>{flag.title}</Text>
              <View style={styles.redFlagSeverity}>
                <Text style={{ color: "#ffffff", fontSize: 9, fontWeight: "bold" }}>
                  {flag.severity.toUpperCase()} RISK
                </Text>
              </View>
              <Text style={styles.redFlagDescription}>{flag.description}</Text>
              <View style={styles.redFlagImpact}>
                <Text style={{ fontWeight: "bold", marginBottom: 3 }}>Impact on You:</Text>
                <Text>{flag.impact}</Text>
              </View>
              <View style={styles.redFlagAction}>
                <Text style={{ fontWeight: "bold", marginBottom: 3 }}>What You Can Do:</Text>
                <Text>{flag.action}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>

      {/* Page 4: Actionable Tips */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Action Plan</Text>
          <Text style={{ fontSize: 11, color: "#4B5563", marginBottom: 15 }}>
            Follow these practical steps to protect yourself and make the most of your lease:
          </Text>
          {actionableTips.map((category, index) => (
            <View key={index} style={styles.tipCategory}>
              <Text style={styles.tipCategoryTitle}>{category.category}</Text>
              {category.tips.map((tip, tipIndex) => (
                <Text key={tipIndex} style={styles.tipItem}>
                  ✓ {tip}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Generated by Conmates - Making lease agreements simple and understandable</Text>
          <Text style={{ marginTop: 4 }}>
            This analysis is for informational purposes only and does not constitute legal advice.
          </Text>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  )
}

export default LeaseAnalysisPDF
