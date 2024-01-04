'use client'
import styles from './styles.module.css'

const Test = ({ examples }) => {

  const examplesUnpacked = examples[0].examples
  console.log(Array.isArray(examplesUnpacked))
  console.log('examples unpacked ' + JSON.stringify(examplesUnpacked))
  return (
    <div>
      <h5>I am a test</h5>
      { examplesUnpacked.map(({english, spanish}, index) => (
        <div key={index} className='testing'>
        <span>english: {english}</span>
        <span>spanish: {spanish}</span>
        <span>index: {index}</span>
        </div>
      ))}
    </div>
  );
};
export default Test;
