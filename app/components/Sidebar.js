import React, { Component } from 'react';
import {
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown
} from 'reactstrap';
import styles from './Sidebar.css';
import MangaList from './MangaList';
import SearchInput from './SearchInput/SearchInput';
import SitesDropdown from './SitesDropdown';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <SitesDropdown />
        </div>
        <div className={styles.searchInput}>
          <SearchInput />
        </div>
        <MangaList />
      </div>
    );
  }
}
