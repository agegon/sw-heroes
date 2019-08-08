import React, { Component } from 'react';
import { connect } from  'react-redux';
import { Link } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroller';
import { isNull } from 'util';
import * as actions from '../store/actions';

class HeroesList extends Component {

  loadMore = () => {
    this.props.fetchPeople(this.props.next);
  }

  render() {
    const keys = Object.keys(this.props.people);
    const hasMore = !isNull(this.props.next);
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadMore}
        hasMore={hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        <ul>
          {
            keys.map(i => (
              <li key={`person_${i}`}>
                <Link to={`/people/${i}`}>
                  { this.props.people[i].name }
                </Link>
              </li>
            ))
          }
        </ul>
      </InfiniteScroll> 
    );
  }
}

const mapStateToProps = function(state) {
  return { people: state.peopleCache, next: state.nextPage };
}

export default connect(mapStateToProps, actions)(HeroesList);
