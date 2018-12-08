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

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <Dropdown isOpen={this.state.open} toggle={this.toggle}>
            <DropdownToggle color="link" className={styles.toggle}>
              Blogtruyen
              <i className="material-icons align-top ml-2">
                keyboard_arrow_down
              </i>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <i className="material-icons align-top mr-2">save_alt</i>
                Export Invoices
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <i className="material-icons align-top mr-2">cached</i>
                Refresh List
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className={styles.searchInput}>
          <SearchInput />
        </div>
        <MangaList />
      </div>
    );
  }
}
