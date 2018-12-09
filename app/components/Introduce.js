import React, { Component } from 'react';
import styles from './Introduce.css';
import readme from '../../README.md';

export default class Introduce extends Component {
  constructor(props) {
    super(props);
  }

  wrapMarkup = html => ({
    __html: html
  });

  render() {
    return (
      <div className={styles.container}>
        <div
          className="markdown"
          dangerouslySetInnerHTML={this.wrapMarkup(readme)}
        />
      </div>
    );
  }
}
