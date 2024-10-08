import React from 'react'
import coarseImage from "../../images/coarseImage.png";

const WishCard:React.FC = () => {
  return (
    <div className="wish-card">
      <div className="card-image">
        <img src={coarseImage} alt="" />
      </div>
      <div className="card-text">
        <h6>This is some text within a card body.</h6>
        <p>this is for test</p>
        <div className="card-btn">
          <button>view coarse</button>
          <button>Remove</button>
        </div>
      </div>
    </div>
  );
}

export default WishCard