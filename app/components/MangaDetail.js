import React, { Component } from 'react';
import {
  Table,
  thead,
  tbody,
  tr,
  th,
  td,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
  Button
} from 'reactstrap';
import styles from './MangaDetail.css';

export default class MangaDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { site, manga } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.heading + ' heading d-flex align-items-center'}>
          <span className={styles.title + ' pl-4'}>{manga.name}</span>

          <Dropdown
            // isOpen={this.state.dropdownOpen}
            // toggle={this.toggle}
            className="ml-auto mr-3"
          >
            <DropdownToggle color="link" className={styles.btnLink}>
              <i className="material-icons align-top">more_horiz</i>
            </DropdownToggle>
            <DropdownMenu right>
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

        <div className={styles.infoContainer + ' scrollable'}>
          <div className={styles.description + ' d-flex p-4'}>
            <img src="http://mangak.info/wp-content/uploads/2014/03/The-Gamer-61x61.png" />

            <div>
              Tac gia: bla bla bla
              <br />
              The loai: bla bla
            </div>
          </div>

          <div className={styles.chaptersContainer + ' mt-4 pl-3 pr-3'}>
            <Card>
              <CardHeader>Chapters</CardHeader>
              <CardBody>
                <Table hover responsive className={styles.chapters}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Updated date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
