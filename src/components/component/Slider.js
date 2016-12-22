import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import Slicker from 'react-slick';
import Arrow from './Arrow';

export default class Slider extends Component {
    static defaultProps = {
        name      : '',
        data      : []
    }
    static PropTypes = {
        name      : PropTypes.string.isRequired,
        data      : PropTypes.array,
        isDisabled: PropTypes.bool
    }
    constructor() {
        super();
    }
    _prev = () => {
        this.refs.slider.slickPrev();
    }
    _next = () => {
        this.refs.slider.slickNext();
    }
    _goto = (id) => {
        this.refs.slider.slickGoTo(id);
    }
    _renderChildren = () => {
        const { name, data } = this.props;
        let _this = this,
            settings = {
                arrows: false,
                dots: false,
                infinite: false,
                speed: 350,
                slidesToShow: 1,
                slidesToScroll: 1,
                beforeChange : function (currentSlide, nextSlide) {
                    if (_this.props.isDisabled && _this._rollback === -1) {
                        _this._rollback = currentSlide;
                    }
                },
                afterChange: function (currentSlide, nextSlide) {
                    if (_this.props.isDisabled && _this._rollback !== -1) {
                        _this._goto(_this._rollback);
                    }                
                }
            };
        _this._rollback = -1; 
        return(
            <Slicker ref='slider' {...settings}>
                {
                    data.map((val, index) => (
                        <div><div className="item" data-index={index} key={name + index}>{val}</div></div>
                    ))
                }
            </Slicker>
        );
    }
    render() {
        const { name, isDisabled } = this.props;
        return (
            <div className="scroll-wrap">
                <h2>{ name }</h2>
                <div className="control-wrap">
                    <Arrow onClick={this._prev} type='left' isDisabled={isDisabled}/>
                    <div className="touchcarousel-container">
                        {this._renderChildren()}
                    </div>
                    <Arrow onClick={this._next} type='right' isDisabled={isDisabled}/>
                </div>
            </div>
        );
    };
};
