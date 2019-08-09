import React, { Component } from 'react';
import { connect } from  'react-redux';
import { Link } from "react-router-dom";

import InfiniteScroll from 'react-infinite-scroller';
import { isNull } from 'util';
import * as actions from '../store/actions';

class HeroesList extends Component {

  getId = (url) => {
    const regId = /(?<=\/)\d+(?=\/?$)/;
    const id = url.match(regId);
    return isNull(id) ? '' : id[0];
  }

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
            keys.map((i, k) => (
              <li key={`person_${k}`}>
                <Link to={`/people/${this.getId(this.props.people[i].url)}`}>
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
