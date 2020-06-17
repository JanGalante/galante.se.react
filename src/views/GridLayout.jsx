import React from 'react';
import styles from './GridLayout.module.css';

const LayoutPage = () =>(
  <>
    <h1>Grid layout <span role="img" aria-label="wondering">🤔</span></h1>
    <div>
      <button className={styles.fun}>button</button>
      <p className={styles.fun}>
        Hallo there
      </p>
      <p className={styles.nyon}>
        Hallo there
      </p>
      <p className={styles.rainbow}>Rainbow text all the way to the moon and back</p>
      <p><span className={styles.rainbow}>Its raining and its lovely</span></p>
    </div>
  </>
)

export default LayoutPage