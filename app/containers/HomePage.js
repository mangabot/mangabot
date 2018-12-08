// @flow
import React, { Component } from 'react';
import styles from './HomePage.css';
import Home from '../components/Home';
import Introduce from '../components/Introduce';
import Sidebar from '../components/Sidebar';

type Props = {};

export default class HomePage extends Component<Props> {
  props: Props;

  render() {
    return (
      <main className={styles.container + ' d-flex'}>
        <div>
          <Sidebar />
        </div>

        <div className={styles.main + ' scrollable flex-fill pl-3 pr-3'}>
          <Introduce />
        </div>
      </main>
    );
  }
}
