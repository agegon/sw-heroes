import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as styles from './styles.scss';

class Starship extends Component {

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
    const { starship } = this.props;
    const { show } = this.state;
    return (
      <div className={styles.about + ' ' + (show ? ' ' + styles.aboutActive : '')}>
        <div 
          onClick={this.toggleShow} 
          className={styles.aboutTitle + (show ? ' ' + styles.aboutTitleActive : '')}
        >
          {this.props.children}
          <span>{starship.name}</span>
        </div>
        {show && (
          <ul className={styles.features}>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Model:</div> 
              <div className={styles.featuresValue}>{starship.model}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Manufacturer:</div> 
              <div className={styles.featuresValue}>{starship.manufacturer}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Cost in credits:</div> 
              <div className={styles.featuresValue}>{starship.cost_in_credits}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Length:</div> 
              <div className={styles.featuresValue}>{starship.length}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Max atmosphering speed:</div> 
              <div className={styles.featuresValue}>{starship.max_atmosphering_speed}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Crew:</div> 
              <div className={styles.featuresValue}>{starship.crew}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Passengers:</div> 
              <div className={styles.featuresValue}>{starship.passengers}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Cargo capacity:</div> 
              <div className={styles.featuresValue}>{starship.cargo_capacity}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Consumables:</div> 
              <div className={styles.featuresValue}>{starship.consumables}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Hyperdrive rating:</div> 
              <div className={styles.featuresValue}>{starship.hyperdrive_rating}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>MGLT:</div> 
              <div className={styles.featuresValue}>{starship.MGLT}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Starship class:</div> 
              <div className={styles.featuresValue}>{starship.starship_class}</div>
            </li>
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const filterStarships = state.starshipsCache.filter(ship => ship.url === ownProps.url);
  if (filterStarships.length === 0) {
    return { starship: {}, needLoading: true };
  }
  const starship = { ...filterStarships[0] };
  return { starship };
}

export default connect(mapStateToProps)(Starship);
