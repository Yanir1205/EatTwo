import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MealPreview extends Component {

    getNextDateFromNow() {
        let max = -Infinity
        let maxIdx;
        this.props.meal.occurrences.forEach((occurrence, idx) => {
            if (occurrence.date > max && occurrence.date > Date.now()) {
                max = occurrence
                maxIdx = idx
            }
        })
        return { max, maxIdx }
    }

    getDifferenceInDays(date) {
        const date1 = new Date(date)
        const now = new Date(Date.now())
        const diffInDays = (date1.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        return Math.floor(diffInDays);
    }

    getPromotionMsg() {
        const nextMeal = this.getNextDateFromNow()
        if (this.props.meal.isPromoted) return 'super host';
        else if (this.getDifferenceInDays(nextMeal.max.date) <= 2) return 'hurry up!';
        else if (this.props.meal.capacity - this.props.meal.occurrences[nextMeal.maxIdx].attendees.length < 4) {
            return `${this.props.meal.capacity - this.props.meal.occurrences[nextMeal.maxIdx].attendees.length} places left!`
        }
        return null;
    }

    getMainMsg() {
        let res;
        if (this.props.renderType === 'location') {
            res = {
                val: this.props.meal.location.city + ', ' + this.props.meal.location.country,
                type: 'location'
            }
            return res
        } else {
            res = {
                val: this.props.meal.cuisineType,
                type: 'cuisine'
            }
            return res
        }
    }

    onCardClick = (id) => {
        this.props.onCardClick(id)
    }

    render() {
        const msg = this.getMainMsg();
        const reviews = [...this.props.meal.reviews]
        const promotionMsg = this.getPromotionMsg()
        const avgRate = (this.props.meal && reviews) ? this.props.getAvgRate(reviews) : ''
        let nextDate = new Date(this.getNextDateFromNow().max.date)
        nextDate = nextDate.toDateString().split(' ').slice(1, 3).join(' ')
        // return this.props.meal && <div className="item meal-card flex" onClick={() => this.onCardClick(this.props.meal._id)}>
        //     {promotionMsg && <div className="category ">{promotionMsg}</div>}
        //     <img className="" src={this.props.meal.imgUrls[0]} alt=""></img>
        //     <div className="">
        //         <div className="">
        //             <div className="">{msg.val}</div>
        //             <div className="star">{avgRate ? Math.floor(avgRate) + ' ⭐' : ''}</div>
        //         </div>
        //         <h5 className="card-name">{msg.type === 'location' ? this.props.meal.cuisineType : this.props.meal.location.city}</h5>


        //         <div className="">
        //             <div>{this.props.meal.title}</div>
        //             <div>{nextDate}</div>
        //         </div>
        //         <div className="description-tag">
        //             <hr className="hr"></hr>
        //         </div>
        //         <div className="price-tag flex align-end justify-end">${this.props.meal.price} (per guest)</div>

        //     </div>
        // </div>
        return (this.props.meal && <div className="item  meal-card flex" onClick={() => this.onCardClick(this.props.meal._id)}>
        {promotionMsg && <div className="super-host-preview">{promotionMsg}</div>}
        <div className='category-card'>
          <img src={this.props.meal.imgUrls[0]} alt='category' className='card-img'></img>
          <h5 className='card-name'>{msg.val}</h5>
          <div className='card-total-one'>
            {/* <img src={this.state.variationIcon} alt='icon'></img> */}
            <div>
              {/* <span>{this.state.variationTxt}</span> */}
            </div>
          </div>
          <div className='card-hosted'>
            {/* <img src='https://res.cloudinary.com/contentexs/image/upload/v1580170530/dinner-round.svg' alt='dinner icon'></img> */}
            <div>
              {/* <span> {this.state.hostedTxt} </span> */}
            </div>
          </div>
          <div className="meal-preview-title">
              <span className="title">{this.props.meal.title}</span>
              </div>
          <div className='card-next-date'>
            <img src='https://res.cloudinary.com/contentexs/image/upload/v1580170530/calender-round.svg' alt='calender icon'></img>
            <div>
              <span className='title'>Next Event Is On, </span> <span>{nextDate}</span>
            </div>
          </div>
          <div className='card-avg-price'>
            <img src='https://res.cloudinary.com/contentexs/image/upload/v1580328925/money.svg' alt='money icon'></img>
            <div>
              <span className='title'>Avg Price Is, </span>
              <span>
                ${this.props.meal.price}
                <small> (per guest)</small>
              </span>
            </div>
          </div>
          <div className='card-btn'>
            {/* <Link to={`/meal/${this.props.displayCategory.toLowerCase()}/${this.props.category.name}`} className='btn'>
              <span className=''>View Events</span>
            </Link> */}
          </div>
        </div>
          </div>
        )
    }
}
export default MealPreview;


/*

<div className="meal-preview-card-container" ><img className="" src={this.props.meal.imgUrls[0]} alt=""></img>
            {promotionMsg && <div className="category ">{promotionMsg}</div>}
            <h5 className="card-name main msg">{msg.val}</h5>
            <div className="meal-preview-text-container">
                <div className="meal-preview-title">{this.props.meal.title}</div>
                <div className="secondary-msg">{msg.type === 'location' ? this.props.meal.cuisineType : this.props.meal.location.city}</div>
                <div className="meal-preview-num-of-occurrences">{this.props.meal.occurrences.length} Hosted {this.props.meal.occurrences.length > 1 ? 'Events' : 'Event'}</div>
                <div className="meal-preview-nex-event">Next date is on {nextDate}</div>
                <div className="meal-preview-price">${this.props.meal.price} <span className="meal-preview-price-ending-text">(per guest)</span></div>
            </div>
            <Link to={`/meal/${this.props.meal._id}`} className='btn meal-preview-view-event-btn'>
                <span className=''>View Event</span>
            </Link>
        </div>

*/