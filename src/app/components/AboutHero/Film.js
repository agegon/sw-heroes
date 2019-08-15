import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as styles from './styles.scss';

class Film extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData = () => {
    if (this.props.needLoading) {
      this.props.fetch();
    }
  }

  toggleShow = () => {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    const { film } = this.props;
    const { show } = this.state;
    const num = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    return (
      <div className={styles.about + ' ' + (show ? ' ' + styles.aboutActive : '')}>
        <div
          onClick={this.toggleShow} 
          className={styles.aboutTitle + (show ? ' ' + styles.aboutTitleActive : '')}
        >
          {this.props.children}
          <span>
            Episode {num[film.episode_id]}: {film.title}
          </span>
        </div>
        {show && (
          <div>
            <p className={styles.aboutFilm}>{film.opening_crawl}</p>
            <ul className={styles.features}>
              <li className={styles.featuresItem}>
                <div className={styles.featuresName}>Director:</div> 
                <div className={styles.featuresValue}>{film.director}</div>
              </li>
              <li className={styles.featuresItem}>
                <div className={styles.featuresName}>Producer:</div> 
                <div className={styles.featuresValue}>{film.producer}</div>
              </li>
              <li className={styles.featuresItem}>
                <div className={styles.featuresName}>Release date:</div> 
                <div className={styles.featuresValue}>{film.release_date}</div>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const filterFilms = state.filmsCache.filter(film => film.url === ownProps.url);
  if (filterFilms.length === 0) {
    return { film: {}, needLoading: true };
  }
  const film = { ...filterFilms[0] };
  return { film };
}

export default connect(mapStateToProps)(Film);
