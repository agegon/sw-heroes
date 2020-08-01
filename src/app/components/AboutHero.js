import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';

import Film from './AboutHero/Film';
import Planet from './AboutHero/Planet';
import Specie from './AboutHero/Specie';
import Vehicle from './AboutHero/Vehicle';
import Starship from './AboutHero/Starship';

import { fetchPerson, fetchData } from '../store/actions';
import * as styles from './AboutHero.scss';
import avatar from '../../img/avatar.png';

class AboutHero extends Component {

  componentDidMount() {
    this.fetchPerson();
  }

  componentDidUpdate(prev) {
    const needLoading = prev.match.params.id !== this.props.match.params.id; 
    if (needLoading) {
      this.fetchPerson();
    }
  }

  fetchPerson = () => {
    const { id } = this.props.match.params;
    if (get(this.props.person.id) !== id) {
      this.props.fetchPerson(id);
    }
  }

  renderPerson = person => {
    const { fetchData } = this.props;
    const {
      homeworld,
      films = [],
      species = [],
      vehicles = [],
      starships = [],
    } = person;
    return (
      <Scrollbars styles={{flex: 'auto'}}>
        <div className={styles.container}>
          <div className={styles.person}>
            <div className={styles.personAvatar}>
              <img src={avatar} alt={person.name} title={person.name}/>
            </div>
            <div className={styles.personInfo}>
              <h2 className={styles.personName}>{person.name}</h2>
              <ul className={styles.features}>
                <li className={styles.featuresItem}>
                  <div className={styles.featuresName}>Height:</div> 
                  <div className={styles.featuresValue}>{person.height}</div>
                </li>
                <li className={styles.featuresItem}>
                  <div className={styles.featuresName}>Mass:</div> 
                  <div className={styles.featuresValue}>{person.mass}</div>
                </li>
                <li className={styles.featuresItem}>
                  <div className={styles.featuresName}>Hair color:</div> 
                  <div className={styles.featuresValue}>{person.hair_color}</div>
                </li>
                <li className={styles.featuresItem}>
                  <div className={styles.featuresName}>Skin color:</div> 
                  <div className={styles.featuresValue}>{person.skin_color}</div>
                </li>
                <li className={styles.featuresItem}>
                  <div className={styles.featuresName}>Eye color:</div> 
                  <div className={styles.featuresValue}>{person.eye_color}</div>
                </li>
                <li className={styles.featuresItem}>
                  <div className={styles.featuresName}>Birth year:</div> 
                  <div className={styles.featuresValue}>{person.birth_year}</div>
                </li>
                <li className={styles.featuresItem}>
                  <div className={styles.featuresName}>Gender:</div> 
                  <div className={styles.featuresValue}>{person.gender}</div>
                </li>
              </ul>
            </div>
          </div>
            <div className={styles.content}>
              <div className={styles.contentTitle}>Homeworld:</div>
              <div className={styles.contentContainer}>
                <Planet url={homeworld} fetch={() => {if (homeworld) fetchData([homeworld], 'planetsCache')}}/>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.contentTitle}>Films:</div>
              <div className={styles.contentContainer}>
                {films.map((url, i) =>
                  <Film url={url} key={`film_${i}`} fetch={() => {fetchData(films, 'filmsCache')}} />
                )}
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.contentTitle}>Species:</div>
              <div className={styles.contentContainer}>
                {species.map((url, i) => 
                  <Specie url={url} key={`spec_${i}`} fetch={() => {fetchData(species, 'speciesCache')}} />
                )}
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.contentTitle}>Vehicles:</div>
              <div className={styles.contentContainer}>
                {vehicles.map((url, i) => 
                  <Vehicle url={url} key={`veh_${i}`} fetch={() => {fetchData(vehicles, 'vehiclesCache')}} />
                )}
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.contentTitle}>Starships:</div>
              <div className={styles.contentContainer}>
                {starships.map((url, i) => 
                  <Starship url={url} key={`ship_${i}`} fetch={() => {fetchData(starships, 'starshipsCache')}} />
                )}
              </div>
            </div>
          <div className={styles.buttons}>
            <Link to='/' className={styles.buttonsLink}>Back</Link>
          </div>
        </div>
      </Scrollbars>
    )
  }

  render() {
    const { loading, error, person } = this.props;

    if (error || !person) {
      return (
        <div className={styles.container}>
          <div className={styles.error}>
            Can't load :(
            <br />
            {person.detail}
          </div>
          <div className={styles.buttons}>
            <button onClick={this.fetchPerson} className={styles.buttonsLink}>
              Try again
            </button>
            <Link to='/' className={styles.buttonsLink}>Back</Link>
          </div>
        </div>
      );
    } else if (loading) {
      return (
        <div className={styles.container}>
          <div className={styles.loading}>
            Loading...
          </div>
        </div>
      );
    } else {
      return this.renderPerson(person);
    }
  }
}

const mapStateToProps = function(state) {
  const props = { 
    ...state.personStatus, 
    person: { ...state.currentPerson }
  };

  if (props.person.detail) {
    props.error = true;
  }

  return props;
}

export default connect(mapStateToProps, { fetchPerson, fetchData })(AboutHero);
