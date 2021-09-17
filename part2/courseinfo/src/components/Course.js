import React from 'react';

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, part) => (sum+part.exercises), 0);
  return <b>total of {total} exercises</b>
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />

      { course.parts.map((part, i) => 
        <Part key={i} part={part} />
      ) }

      <Total course={course} />
    </div>
  )
}

export default Course;