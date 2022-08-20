import React from 'react';
import './game.scss';


export default function Game() {
    return (
        <div className='container-game'>
            <span class="material-symbols-outlined arrow-back">
                arrow_back
            </span>
            <div className="tracker">
                {Array(7).fill().map((item, index) => {
                    return (<div className='item-no'>
                        <div className="noOfTracker">
                            {index + 1}
                        </div>
                        <div className="line"></div>
                    </div>)
                })}

            </div>
            <div className="question-voice">
                <span class="material-symbols-outlined volume">
                    volume_down_alt
                </span>
                <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laci dollacii
                    met, consectetur ad quam ?</h5>
            </div>
            <div className="images-game">

                {Array(8).fill().map((item) => {
                    return (<div className="image-game">
                        <div className="typography">?</div>
                    </div>)
                })}

            </div>
        </div>
    )
}
