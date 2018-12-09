import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Nav, NavItem, NavLink, Badge } from 'reactstrap';
import styles from './MangaList.css';
import randomKey from '../utils/RandomKey';

export default class MangaList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMangaId: '',
      mangaList: [
        {
          id: randomKey(),
          name: 'Kanojo to Kanojo no Neko',
          thumbnail:
            'http://mangak.info/wp-content/uploads/2014/03/The-Gamer-61x61.png'
        },
        {
          id: randomKey(),
          name: ':rebirth',
          thumbnail:
            'http://mangak.info/wp-content/uploads/2014/07/Noragami-61x61.jpg'
        },
        {
          id: randomKey(),
          name: '[LH] LADY JUSTICE MANGA',
          thumbnail:
            'http://mangak.info/wp-content/uploads/2014/08/soma-61x61.jpg'
        },
        {
          id: randomKey(),
          name: '15 - Meisetsu Kougyou Koukou Rugby Bu',
          thumbnail:
            'http://mangak.info/wp-content/uploads/2014/03/Attack-on-Titan-61x61.jpg'
        },
        {
          id: randomKey(),
          name: '6 Giờ Ký Ức',
          thumbnail:
            'http://mangak.info/wp-content/uploads/2014/03/one-piece-61x61.jpg'
        },
        {
          id: randomKey(),
          name: 'A Death In The Family',
          thumbnail:
            'http://mangak.info/wp-content/uploads/2014/04/Great-Teacher-Onizuka-Paradise-Lost-61x61.jpg'
        },
        {
          id: randomKey(),
          name: 'A Secret Just Between You and Me',
          thumbnail:
            'http://mangak.info/wp-content/uploads/2014/07/Billy-Bat-61x61.jpg'
        },
        {
          id: randomKey(),
          name: 'Kanojo to Kanojo no Neko',
          thumbnail:
            'http://mangak.info/wp-content/uploads/2014/03/The-Gamer-61x61.png'
        },
        {
          id: randomKey(),
          name: ':rebirth',
          thumbnail:
            'http://mangak.info/wp-content/uploads/2014/07/Noragami-61x61.jpg'
        },
        {
          id: randomKey(),
          name: '[LH] LADY JUSTICE MANGA',
          thumbnail:
            'http://mangak.info/wp-content/uploads/2014/08/soma-61x61.jpg'
        },
        {
          id: randomKey(),
          name: '15 - Meisetsu Kougyou Koukou Rugby Bu',
          thumbnail:
            'http://mangak.info/wp-content/uploads/2014/03/Attack-on-Titan-61x61.jpg'
        },
        {
          id: randomKey(),
          name: '6 Giờ Ký Ức',
          thumbnail:
            'http://mangak.info/wp-content/uploads/2014/03/one-piece-61x61.jpg'
        },
        {
          id: randomKey(),
          name: 'A Death In The Family',
          thumbnail:
            'http://mangak.info/wp-content/uploads/2014/04/Great-Teacher-Onizuka-Paradise-Lost-61x61.jpg'
        },
        {
          id: randomKey(),
          name: 'A Secret Just Between You and Me',
          thumbnail:
            'http://mangak.info/wp-content/uploads/2014/07/Billy-Bat-61x61.jpg'
        },
        {
          id: randomKey(),
          name: 'Kanojo to Kanojo no Neko',
          thumbnail:
            'http://mangak.info/wp-content/uploads/2014/03/The-Gamer-61x61.png'
        },
        {
          id: randomKey(),
          name: ':rebirth',
          thumbnail:
            'http://mangak.info/wp-content/uploads/2014/07/Noragami-61x61.jpg'
        },
        {
          id: randomKey(),
          name: '[LH] LADY JUSTICE MANGA',
          thumbnail:
            'http://mangak.info/wp-content/uploads/2014/08/soma-61x61.jpg'
        },
        {
          id: randomKey(),
          name: '15 - Meisetsu Kougyou Koukou Rugby Bu',
          thumbnail:
            'http://mangak.info/wp-content/uploads/2014/03/Attack-on-Titan-61x61.jpg'
        },
        {
          id: randomKey(),
          name: '6 Giờ Ký Ức',
          thumbnail:
            'http://mangak.info/wp-content/uploads/2014/03/one-piece-61x61.jpg'
        },
        {
          id: randomKey(),
          name: 'A Death In The Family',
          thumbnail:
            'http://mangak.info/wp-content/uploads/2014/04/Great-Teacher-Onizuka-Paradise-Lost-61x61.jpg'
        },
        {
          id: randomKey(),
          name: 'A Secret Just Between You and Me',
          thumbnail:
            'http://mangak.info/wp-content/uploads/2014/07/Billy-Bat-61x61.jpg'
        }
      ]
    };
  }

  handleSelected = mangaId => e => {
    this.setState({ activeMangaId: mangaId });
    this.props.onMangaSelected(
      this.state.mangaList.find(manga => manga.id === mangaId)
    );
  };

  render() {
    const { activeMangaId, mangaList } = this.state;

    return (
      <div className={styles.container + ' scrollable'}>
        <Nav vertical>
          {mangaList.map(manga => (
            <MangaListItem
              key={manga.id}
              manga={manga}
              active={activeMangaId === manga.id}
              onSelected={this.handleSelected(manga.id)}
            />
          ))}
        </Nav>
      </div>
    );
  }
}

class MangaListItem extends Component {
  handleClicked = () => {
    this.props.onSelected();
  };

  render() {
    const { active, manga } = this.props;

    return (
      <NavItem
        active={active}
        className={styles.item + ' ' + (active && styles.active)}
        onClick={this.handleClicked}
      >
        <NavLink active={active} href="#" className="d-flex align-items-center">
          <div className="border border-light mr-3">
            <img src={manga.thumbnail} width="48px" height="48px" />
          </div>
          <div className={styles.name + ' flex-fill'}>{manga.name}</div>
        </NavLink>
      </NavItem>
    );
  }
}
