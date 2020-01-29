import React, { Component } from 'react';


import { withRouter } from "react-router";
import MealPreview from './MealPreview'

class MealList extends Component {

  render() {
    debugger
    return (
      <section className="meal-list">
        {this.props.meals.map(meal => (
          <div className="meal-card " key={meal._id}>
            <MealPreview onCardClick={this.props.onCardClick} meal={meal} getAvgRate={this.props.getAvgRate} renderType={this.props.renderType} />
          </div>
        ))}
      </section>
    )
  }
}

export default withRouter(MealList);




