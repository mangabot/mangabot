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
    const { onSiteSelected, onMangaSelected } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.title + ' heading'}>
          <SitesDropdown onSiteSelected={onSiteSelected} />
        </div>
        <div className={styles.searchInput}>
          <SearchInput />
        </div>
        <MangaList onMangaSelected={onMangaSelected} />
      </div>
    );
  }
}
