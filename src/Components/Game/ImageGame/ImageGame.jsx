import React from 'react';
import './image-game.scss';
import { Buffer } from 'buffer';

export default function ImageGame({ image, handleId, id }) {
    const imageClass = image.state ? " active " + image.state : "";

    return (
        <div className={"image-game" + imageClass} onClick={() => handleId(id)}>
            <img src={`data:${image.img.contentType};base64, ${Buffer.from(image.img.data).toString('base64')}`
            } />
            <div className="typography">?</div>
        </div>
    )
}
