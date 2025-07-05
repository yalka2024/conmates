"use client"

import { PDFDownloadLink } from "@react-pdf/renderer"
import LeaseAnalysisPDF from "./lease-analysis-pdf"
import { Download } from "lucide-react"
import React from "react"

interface PDFDownloadButtonProps {
  clauses: Array<any>
  redFlags: Array<any>
  actionableTips: Array<any>
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ clauses, redFlags, actionableTips }) => (
  <PDFDownloadLink
    document={<LeaseAnalysisPDF clauses={clauses} redFlags={redFlags} actionableTips={actionableTips} />}
    fileName="lease-analysis-report.pdf"
    className="inline-flex items-center px-4 py-2 border border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent rounded-md transition-colors"
  >
    {({ loading }) =>
      loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span>Generating PDF...</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </div>
      )
    }
  </PDFDownloadLink>
)

export default PDFDownloadButton 