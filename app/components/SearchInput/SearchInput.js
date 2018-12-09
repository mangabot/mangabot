import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import styles from './SearchInput.scss';

export default class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = { focus: false };
  }

  handleInputFocus = () => {
    this.setState({
      focus: true
    });
  };

  handleInputBlur = () => {
    this.setState({
      focus: false
    });
  };

  render() {
    return (
      <InputGroup
        className={
          styles.searchInputContainer +
          ' search-input ' +
          (this.state.focus && styles.focus)
        }
      >
        <InputGroupAddon addonType="prepend">
          <InputGroupText className={styles.searchInputText}>
            <i className="material-icons">search</i>
          </InputGroupText>
        </InputGroupAddon>
        <Input
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          className={styles.searchInput}
          placeholder="Search"
        />
      </InputGroup>
    );
  }
}
