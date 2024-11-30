import React from 'react';
import './GiftBox.css';

import BirthdayImage from "./assets/images/emoji-animated.gif"

export const GiftBox = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5 d-flex justify-content-center">
          <div className="box">
            <div className="box-body">
              <div className='img'>May your sweet smile never fade way.I wish you very happy and sweet birthday .God bless you<div><img  style={{height:"50px",width:"50px",marginLeft:"80px"}} src={BirthdayImage}/></div></div>
              <div className="box-lid">
                <div className="box-bowtie" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
