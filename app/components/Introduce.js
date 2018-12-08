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
        <h4>Manga Bot</h4>
        <p>I'd like to introduce new UI of the tiny tool</p>

        <h4>Features</h4>
        <ul>
          <li>Support many popular manga sites</li>
          <li>Accelerate to download manga simultaniously</li>
          <li />
        </ul>

        <div
          className="markdown"
          dangerouslySetInnerHTML={this.wrapMarkup(readme)}
        />
      </div>
    );
  }
}
