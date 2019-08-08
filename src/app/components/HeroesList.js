import React, { Component } from 'react';
import { connect } from  'react-redux';
import * as actions from '../store/actions';

import InfiniteScroll from 'react-infinite-scroller';
import { isNull } from 'util';

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
        <h1>Star Wars heroes!</h1>
        <ul>
          {
            keys.map((i, k) => (
              <li key={k}>{ this.props.people[i].name }</li>
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