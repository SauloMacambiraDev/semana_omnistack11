import React from 'react';

// function Header(props){
function Header({ title, children }){
    // const { title, children } = props

    return (
        <header>
            <h1>{title}</h1>
            <h1>{children}</h1>
        </header>
    );
}

export default Header;