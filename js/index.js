import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Link}  from 'react-router-dom'

import Lazy from './Lazy'

let lazyB = function () {
    return (
        <Lazy load={() => import('./PageB')}>
            {(PageB) => {
                return PageB ? (<PageB/>) : (<div>loading</div>);
            }}
        </Lazy>);
};

function App(props) {
    return (
        <BrowserRouter>
            <div>
                <ul>
                    <li><Link to='/'>home</Link></li>
                    <li><Link to='pagea'>pageA</Link></li>
                    <li><Link to='pageb'>pageB</Link></li>
                    <li><Link to='pagec'>pageC</Link></li>
                </ul>
                <div>Hello world</div>
                <Route exact path="/" component={Home}/>
                <Route path="/pagea" component={PageA}>
                    <Route path='/pagea/:whatever' children={Whatever}/>
                </Route>
                <Route path="/pageb" component={lazyB}/>
                <Route path="/pagec" component={PageC}/>
            </div>
        </BrowserRouter>
    );
}

function Home(props) {
    return (
        <div>
            Home
        </div>
    );
}

function PageA(props) {
    return (
        <div>
            <ul>
                <li><Link to='/pagea/deep'>deep</Link></li>
                <li><Link to='/pagea/deeper'>deeper</Link></li>
            </ul>
            {props.children}
        </div>
    );
}

function Whatever({match}) {
    console.log(match);
    return (
        <div>{match.params.whatever}</div>
    );
}


function PageC(props) {
    return (
        <div>
            PageC
        </div>
    );
}


const ListItemLink = function (props) {
    return (
        <Route path={props.to} children={({match}) => (
            <li className={match ? 'active' : ''}>
                <Link to={props.to}/>
            </li>
        )}/>
    )
};

ReactDOM.render(
    <BrowserRouter>
        <ul>
            <ListItemLink to="/somewhere"/>
            <ListItemLink to="/somewhere-else"/>
        </ul>
    </BrowserRouter>, document.querySelector('#app'));