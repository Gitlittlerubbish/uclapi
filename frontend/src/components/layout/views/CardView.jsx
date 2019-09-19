import React from 'react'; 

/**
REQUIRED ATTRIBUTES:
this.props.src (gives the name of the image to be rendered relative to images/)
this.props.description (gives a description of the image being rendered for slow browsers)
this.props.width (need the width of the image)
this.props.height (need the height of the image)

OPTIONAL ATTRIBUTES:
this.props.link (Turns the card clickable)
this.props.margin (Custom set the margin)
this.props.padding (Custom set the padding)
**/
export default class CardView extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var card_class_name = "uclapi-card uclapi-card-";
    var card_style = {};

    var cardType = "default";
    if(this.props.cardType) {cardType=this.props.cardType;}
    card_class_name+=cardType;

    var isLink = false;

    if(this.props.isMobileFriendly) {card_class_name += " mobile-friendly"}
    if(this.props.link) { card_class_name += " default-transition background-color-transition clickable uclapi-card-clicked-"+cardType; isLink = true;}
    if(this.props.isJustifiedText) { card_class_name += " justified-text";}
    if(this.props.padding) { card_style['padding'] = this.props.padding ;}
    if(this.props.margin) { card_style['margin'] = this.props.margin ;}
    if(this.props.size) { 
      card_class_name += " " + this.props.size + "-size"; 
      if(this.props.size == "fit-content") {
          card_style['padding'] = "0";
          card_style['overflow'] = "hidden";
      }
    }

    card_style['width'] = this.props.width;
    card_style['height'] = this.props.height;

    if(isLink) {
      return (
          <a href = {this.props.link}>
            <div className={card_class_name} style={card_style}>
              {this.props.children}
            </div>
          </a>
      );
    } else {
      return (
          <div className={card_class_name} style={card_style}>
            {this.props.children}
          </div>
      );
    }
  }

}