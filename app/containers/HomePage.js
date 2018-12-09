// @flow
import React, { Component } from 'react';
import styles from './HomePage.css';
import Home from '../components/Home';
import Introduce from '../components/Introduce';
import Sidebar from '../components/Sidebar';
import MangaDetail from '../components/MangaDetail';

type Props = {};

export default class HomePage extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = { activeSite: null, activeManga: null };
  }

  handleSiteSelected = site => {
    console.log('Active site: ' + site);
    this.setState({ activeSite: site });
  };

  handleMangaSelected = manga => {
    console.log('Active manga: ' + manga);
    this.setState({ activeManga: manga });
  };

  render() {
    const { activeSite, activeManga } = this.state;

    return (
      <main className={styles.container + ' d-flex'}>
        <div>
          <Sidebar
            onSiteSelected={this.handleSiteSelected}
            onMangaSelected={this.handleMangaSelected}
          />
        </div>

        <div className={styles.main + ' flex-fill'}>
          {activeManga == null ? (
            <Introduce />
          ) : (
            <MangaDetail site={activeSite} manga={activeManga} />
          )}
        </div>
      </main>
    );
  }
}
