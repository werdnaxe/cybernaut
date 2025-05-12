import React from 'react'
import './GradeLevel.css'

const GradeLevel = () => {
  return (
    <div className="grade-level">
      {/* <h1>Grade level page</h1> */}
      <div>
        <button type="button" className="button1">
          Grade 5 & 6
        </button>
        <button type="button" className="button2">
          Grades 7 & 8
        </button>
        <button type="button" className="button3">
          Grades 9+
        </button>
      </div>
    </div>
  )
}

export default GradeLevel