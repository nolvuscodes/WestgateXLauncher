// @flow
import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { PACKS_PATH, THEMES } from '../../constants';
import styles from './Home.scss';
import News from './components/News/News';
import Card from '../Common/Card/Card';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      latestBtnClicked: false,
      latestInstalled: false
    };
  }
  /* eslint-disable */
  openLink(url) {
    require('electron').shell.openExternal(url);
  }

  componentDidMount = async () => {
    this.props.getNews();
    try {
      await promisify(fs.access)(path.join(PACKS_PATH, '1.13.2'));
      this.setState({ latestInstalled: true });
    } catch (e) {
      this.setState({ latestInstalled: false });
    }
    // Downloads the versions list just the first time
    if (this.props.versionsManifest.length === 0) {
      this.props.getVanillaMCVersions();
    }
  };

  /* eslint-enable */

  render() {
    return (
      <div>
        <main className={styles.content}>
          <div className={styles.innerContent}>
            <News news={this.props.news} />
            <div className={styles.cards}>
              <Card
                style={{
                  height: 'auto',
                  width: '100%',
                  minWidth: 420,
                  display: 'block',
                  marginTop: 15,
                  textAlign: 'left'
                }}
                title={`Welcome to Wingate Studios ${this.props.username} `}
              >
                <div className={styles.firstCard}>
                  <div>
                    <span className={styles.titleHeader}>
                    Keep us powered with {' '}
                      <a
                        href="https://www.buymeacoffee.com/WestgateXL"
                        className={styles.patreonText}
                      target="_new"
                      >
                         Coffee <i class="fas fa-coffee" />
                      </a>
                    </span>
                    <div className={styles.bymecoffeeContent}>
                      If you like WestgateXLauncher and you would like it to have even
                      more features and bug fixes, consider helping us out
                      supporting the project. Happy Gaming!
                    </div>
                  </div>
                  
                  <div>
                    You can find us here:
                    <div className={styles.discord}>
                      <a href="https://discord.gg/TBEvCVgY" target="_new">Discord</a>
                    </div>
                    <div className={styles.github}>
                      <a href="https://github.com/NanobugXL/WestgateXLauncher" target="_new">
                        Github
                      </a>
                    </div>
                    <div className={styles.instagram}>
                      <a href="https://twitter.com/westgatexl" target="_new">Twitter</a>
                    </div>
                    <div className={styles.facebook}>
                      <a href="https://fb.me/westgatestudio" target="_new">Facebook</a>
                    </div>
                  </div>
                </div>
              </Card>

              <Card
                style={{
                  height: 170,
                  width: '100%',
                  minWidth: 420,
                  display: 'block',
                  marginTop: 15,
                  textAlign: 'center'
                }}
                title="Default: v1.17.1"
              >
                v1.14.2 Pre-Release has just been released, create an instance!
                {this.state.latestBtnClicked || this.state.latestInstalled ? (
                  <Link to="/dmanager" style={{ display: 'block', margin: '35px auto' }}
                  >View Your Instances
                  </Link>
                  
                ) : (
                  <Button type="primary" loading={this.props.packCreationLoading}
                    style={{ display: 'block', margin: '35px auto' }}
                    onClick={() => {
                      this.props.createPack('1.17.1', '1.17.1');
                      this.setState({ latestBtnClicked: true });
                    }}
                  >
                    Install v1.17.1
                  </Button>
                )}
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
