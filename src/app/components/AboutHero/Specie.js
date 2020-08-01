import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as styles from './styles.scss';

class Specie extends Component {

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
    const { specie } = this.props;
    const { show } = this.state;
    return (
      <div className={styles.about + ' ' + (show ? ' ' + styles.aboutActive : '')}>
        <div 
          onClick={this.toggleShow} 
          className={styles.aboutTitle + (show ? ' ' + styles.aboutTitleActive : '')}
        >
        {this.props.children}
          <span>
            {specie.name}
          </span>
        </div>
        {show && (
          <ul className={styles.features}>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Classification:</div> 
              <div className={styles.featuresValue}>{specie.classification}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Designation:</div> 
              <div className={styles.featuresValue}>{specie.designation}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Average height:</div> 
              <div className={styles.featuresValue}>{specie.average_height}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Skin colors:</div> 
              <div className={styles.featuresValue}>{specie.skin_colors}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Hair colors:</div> 
              <div className={styles.featuresValue}>{specie.hair_colors}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Eye colors:</div> 
              <div className={styles.featuresValue}>{specie.eye_colors}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Average lifespan:</div> 
              <div className={styles.featuresValue}>{specie.average_lifespan}</div>
            </li>
            <li className={styles.featuresItem}>
              <div className={styles.featuresName}>Language:</div> 
              <div className={styles.featuresValue}>{specie.language}</div>
            </li>
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const filterSpecies = state.speciesCache.filter(spec => spec.url === ownProps.url);
  if (filterSpecies.length === 0) {
    return { specie: {}, needLoading: true };
  }
  const specie = { ...filterSpecies[0] };
  return { specie };
}

export default connect(mapStateToProps)(Specie);
