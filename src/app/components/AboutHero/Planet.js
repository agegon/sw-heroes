import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as styles from './styles.scss';

class Planet extends Component {

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
    const { planet } = this.props;
    const { show } = this.state;
    return (
      <div className={styles.about + ' ' + (show ? ' ' + styles.aboutActive : '')}>
        <div 
          onClick={this.toggleShow} 
          className={styles.aboutTitle + (show ? ' ' + styles.aboutTitleActive : '')}
        >
          {this.props.children}
          <span>{planet.name}</span>
        </div>
        {show && (
          <ul className={styles.features}>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Rotation period:</div> 
              <div className={styles.featuresValue}>{planet.rotation_period}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Orbital period:</div> 
              <div className={styles.featuresValue}>{planet.orbital_period}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Diameter:</div> 
              <div className={styles.featuresValue}>{planet.diameter}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Climate:</div> 
              <div className={styles.featuresValue}>{planet.climate}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Gravity:</div> 
              <div className={styles.featuresValue}>{planet.gravity}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Terrain:</div> 
              <div className={styles.featuresValue}>{planet.terrain}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Surface water:</div> 
              <div className={styles.featuresValue}>{planet.surface_water}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Population:</div> 
              <div className={styles.featuresValue}>{planet.population}</div>
            </li>
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const filterPlanets = state.planetsCache.filter(planet => planet.url === ownProps.url);
  if (filterPlanets.length === 0) {
    return { planet: {}, needLoading: true };
  }
  const planet = { ...filterPlanets[0] };
  return { planet };
}

export default connect(mapStateToProps)(Planet);
