import React, { Component } from 'react';
import { connect } from  'react-redux';
import { Link } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroller';
import { Scrollbars } from 'react-custom-scrollbars';
import { isNull, uniqueId } from 'lodash';
import { fetchPeople } from '../store/actions';
import * as styles from './HeroesList.scss';

class HeroesList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      peopleToLoading: [],
      hasMore: true
    }
  }

  componentDidUpdate(prevProps) {
    const { people, count, next } = this.props;
    const countLoaded = people.length - prevProps.people.length;
    if (countLoaded > 0) {
      // was received data with people
      const countToShow = prevProps.people.length + this.state.peopleToLoading.length;
      if (isNull(next)) {
        // nothing to load
        this.setState({ peopleToLoading: [], hasMore: false });
      } else if (isNull(count) || countToShow < count) {
        // if loading not complete and scroll is not in the end list
        const peopleToLoading = this.state.peopleToLoading.slice(countLoaded);
        this.setState({ peopleToLoading, hasMore: true });
      } else {
        // if scroll is over the end list
        const peopleToLoading = this.state.peopleToLoading.slice(0, count - people.length);
        this.setState({ peopleToLoading, hasMore: false });
      }
      return;
    }
    if (this.state.peopleToLoading.length > 0) {
      this.loadNext();
    }
  }

  loadNext = () => {
    const { fetchPeople, next, loading } = this.props;
    if (!isNull(next) && !loading) {
      fetchPeople(next);
    }
  }

  scrollHandler = () => {
    const { count, people } = this.props;
    const { peopleToLoading } = this.state;
    const countToShow = peopleToLoading.length + people.length;
    if (isNull(count) || countToShow < count) {
      this.setState({
        peopleToLoading: [
          ...peopleToLoading, 
          { isLoading: true }
        ],
        hasMore: true
      });
    } else {
      this.setState({ hasMore: false });
    }
  }

  renderListItem = ({name = '', isLoading = false, id}, index) => {
    const firstChar = name.length > 0 ? name[0] : '';
    const linkIsActive = this.props.match.params.id === id;

    return (
      <li className={styles.person} key={id ? `person_${id}` : uniqueId('loading_')}>
        {!isLoading && 
          <Link to={`/people/${id}`} 
            className={styles.personLink + 
              (linkIsActive ? ' ' + styles.personLinkActive : '')
            }
          >
            <div className={styles.personAvatar}>
              {firstChar.toUpperCase()}
            </div>
            <div className={styles.personName}>
              {name}
            </div>
          </Link>
        }
        {isLoading && <div className={styles.personLoading}></div>}
      </li>
    );
  }

  render() {
    const { hasMore, peopleToLoading } = this.state;
    const { people } = this.props;
    return (
      <div className={styles.people}>
        <Scrollbars>
          <InfiniteScroll
            loadMore={this.scrollHandler}
            hasMore={hasMore}
            useWindow={false}
          >
            <ul className={styles.peopleList}>
              {people.map(this.renderListItem)}
              {peopleToLoading.map(this.renderListItem)}
            </ul>
          </InfiniteScroll>
        </Scrollbars>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { 
    people: state.peopleCache, 
    next: state.nextPage,
    count: state.peopleCount,
    ...state.peopleStatus 
  };
}

export default connect(mapStateToProps, { fetchPeople })(HeroesList);
