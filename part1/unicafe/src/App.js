import React, { useState } from 'react';

const Button = ({ text, onClick}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({good, neutral, bad}) => {
  const all = good+neutral+bad;
  if (all!==0) {
    const avg = (good-bad)/all 
    const positivePercent = `${(good/all)*100} %`;

    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={avg} />
            <StatisticLine text="positive" value={positivePercent} />
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <p>No feedback</p>
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodClicked = () => {
    setGood(good + 1);
  };
  const neutralClicked = () => {
    setNeutral(neutral + 1);
  };
  const badClicked = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={goodClicked}/>
      <Button text="neutral" onClick={neutralClicked}/>
      <Button text="bad" onClick={badClicked}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
