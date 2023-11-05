'use client'

import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

function Privacy() {
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setPageNumber(1)
  }

  return (
    <div>
      <Document
        file="/policy/location.pdf" // 여기는 가지고 계신 pdf 주소
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {/* height, width는 number 타입으로 vh, %는 먹지 않습니다. */}
        <Page height={600} pageNumber={pageNumber} />
      </Document>
      Page {pageNumber} of {numPages}
      {pageNumber > 1 && (
        <button
          type="button"
          onClick={() => setPageNumber((prev) => prev + -1)}
        >
          이전페이지
        </button>
      )}
      {pageNumber < numPages && (
        <button
          type="button"
          onClick={() => setPageNumber((prev) => prev + +1)}
        >
          다음페이지
        </button>
      )}
    </div>
  )
}

export default Privacy
