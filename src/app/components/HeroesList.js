import React, { Component } from 'react';
import { connect } from  'react-redux';
import { Link } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroller';
import { isNull } from 'lodash';
import * as actions from '../store/actions';
import * as styles from './HeroesList.scss';

class HeroesList extends Component {

  loadMore = () => {
    this.props.fetchPeople(this.props.next);
  }

  renderListItem = props => {
    let firstLetter = props.name ? props.name.match(/\w/) : '';
    firstLetter = firstLetter ? firstLetter[0].toUpperCase() : '';
    const isActive = this.props.match.params.id === props.id;
    return (
      <li className={styles['person']} key={`person_${props.id}`}>
        {!props.isLoading && 
          <Link to={`/people/${props.id}`} 
            className={styles['person__link'] + 
              (isActive ? ' ' + styles['person__link_active'] : '')
            }
          >
            <div 
              className={styles['person__avatar']}
            >
              {firstLetter}
            </div>
            <div className={styles['person__name']}>
              { props.name }
            </div>
          </Link>
        }
        {props.isLoading && <div className={styles['person__loading']}></div>}
      </li>
    );
  }

  render() {
    const { idList, isLoading, next, peopleCount, people } = this.props;
    const hasMore = !isNull(next);
    let toLoad = peopleCount - idList.length;
    toLoad = toLoad > 10 ? 10 : toLoad;
    const dummy = [];

    if (isLoading) {
      for (let i = 0; i < toLoad; i++) {
        dummy.push(i);
      }
    }

    return (
      <div className={styles['people']}>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={!isLoading && hasMore}
            useWindow={false}
          >
            <ul className={styles['people__list']}>
              {idList.map(i => this.renderListItem({id: i, name: people[i].name}))}
              {dummy.map(i => this.renderListItem({id: 'dummy_' + i, isLoading: true}))}
            </ul>
          </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { 
    people: state.peopleCache, 
    idList: state.peopleIdList, 
    next: state.nextPage,
    isLoading: state.peopleStatus.loading,
    hasError: state.peopleStatus.error,
    peopleCount: state.peopleCount
  };
}

export default connect(mapStateToProps, actions)(HeroesList);
