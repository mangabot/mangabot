import React, { Component } from 'react';
import {
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown
} from 'reactstrap';
import randomKey from '../utils/RandomKey';
import styles from './SitesDropdown.css';

export default class SitesDropdown extends Component {
  constructor(props) {
    super(props);

    const blogtruyenId = randomKey();

    this.state = {
      open: false,
      categories: ['Vietnamese', 'English'],
      activeSiteId: blogtruyenId,
      sites: [
        {
          id: blogtruyenId,
          name: 'BlogTruyện',
          url: 'blogtruyen.com',
          icon: '',
          category: 'Vietnamese'
        },
        {
          id: randomKey(),
          name: 'TruyệnTranh8',
          url: 'truyentranh8.net',
          icon: '',
          category: 'Vietnamese'
        },
        {
          id: randomKey(),
          name: 'TruyệnTranhTuần',
          url: 'truyentranhtuan.com',
          icon: '',
          category: 'Vietnamese'
        },
        {
          id: randomKey(),
          name: 'MangaK',
          url: 'mangak.info',
          icon: '',
          category: 'Vietnamese'
        },
        {
          id: randomKey(),
          name: 'MangaFox',
          url: 'mangafox.me',
          icon: '',
          category: 'English'
        },
        {
          id: randomKey(),
          name: 'MangaPark',
          url: 'mangapark.me',
          icon: '',
          category: 'English'
        }
      ]
    };
  }

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleSiteSelected = siteId => e => {
    this.setState({ activeSiteId: siteId });
  };

  render() {
    const { categories, sites, activeSiteId } = this.state;

    return (
      <Dropdown isOpen={this.state.open} toggle={this.toggle}>
        <DropdownToggle color="link" className={styles.toggle}>
          {sites.find(site => site.id === activeSiteId).name}
          <i className="material-icons align-top ml-2">keyboard_arrow_down</i>
        </DropdownToggle>
        <DropdownMenu className={styles.menu}>
          {categories.map((cat, index) => (
            <div key={cat}>
              <SiteCategory cat={cat} divider={index > 0} />
              {sites
                .filter(site => site.category === cat)
                .map(site => (
                  <Site
                    key={site.id}
                    site={site}
                    active={activeSiteId === site.id}
                    onSelected={this.handleSiteSelected(site.id)}
                  />
                ))}
            </div>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

class SiteCategory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { cat, divider } = this.props;

    return (
      <div>
        {divider && <DropdownItem divider className={styles.menuDivider} />}
        <DropdownItem key={cat} header className={styles.menuHeader}>
          {cat}
        </DropdownItem>
      </div>
    );
  }
}

class Site extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { site, active, onSelected } = this.props;

    return (
      <DropdownItem
        active={active}
        onClick={onSelected}
        className={styles.menuItem + ' ' + (active && styles.active)}
      >
        <img src={site.icon} />
        {site.name}
      </DropdownItem>
    );
  }
}
