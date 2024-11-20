import React from 'react';
import { useSwipeable } from 'react-swipeable';

const SwipeComponent = () => {
    const handlers = useSwipeable({
        onSwipedLeft: () => console.log('Swiped left!'),
        onSwipedRight: () => console.log('Swiped right!'),
    });

    return (
        <div {...handlers} style={{ width: '100%', height: '200px', background: '#ccc' }}>
            Swipe Me!
        </div>
    );
};

export default SwipeComponent;
