import React from 'react'

export const User = (props) => {
    const user = props.children;
    
    return (
        <span>
            {`${user.firstName}:`}
            <a className="user-number" href="#">{`${user.phone}`}</a>
        </span>
    );
};
