import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as styles from './styles.scss';

class Vehicle extends Component {

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
    const { vehicle } = this.props;
    const { show } = this.state;
    return (
      <div className={styles.about + ' ' + (show ? ' ' + styles.aboutActive : '')}>
        <div 
          onClick={this.toggleShow} 
          className={styles.aboutTitle + (show ? ' ' + styles.aboutTitleActive : '')}
        >
        {this.props.children}
          <span>
            {vehicle.name}
          </span>
        </div>
        {show && (
          <ul className={styles.features}>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Model:</div> 
              <div className={styles.featuresValue}>{vehicle.model}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Manufacturer:</div> 
              <div className={styles.featuresValue}>{vehicle.manufacturer}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Cost in credits:</div> 
              <div className={styles.featuresValue}>{vehicle.cost_in_credits}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Length:</div> 
              <div className={styles.featuresValue}>{vehicle.length}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Max atmosphering speed:</div> 
              <div className={styles.featuresValue}>{vehicle.max_atmosphering_speed}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Crew:</div> 
              <div className={styles.featuresValue}>{vehicle.crew}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Passengers:</div> 
              <div className={styles.featuresValue}>{vehicle.passengers}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Cargo capacity:</div> 
              <div className={styles.featuresValue}>{vehicle.cargo_capacity}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Consumables:</div> 
              <div className={styles.featuresValue}>{vehicle.consumables}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Vehicle class:</div> 
              <div className={styles.featuresValue}>{vehicle.vehicle_class}</div>
            </li>
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const filterVehicles = state.vehiclesCache.filter(veh => veh.url === ownProps.url);
  if (filterVehicles.length === 0) {
    return { vehicle: {}, needLoading: true };
  }
  const vehicle = { ...filterVehicles[0] };
  return { vehicle };
}

export default connect(mapStateToProps)(Vehicle);
