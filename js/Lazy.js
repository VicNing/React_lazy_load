import React from 'react'

export default class Lazy extends React.Component {

    constructor(props) {
        super(props);
        this.state = {mod: null};
    }

    componentWillMount() {
        this.load(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    load(props) {
        this.setState({
            mod: null
        });
        props.load().then((mod) => {
            this.setState({mod: mod.default ? mod.default : mod});
        });
        // props.load((mod) => {
        //     console.log(mod);
        //     this.setState({
        //         // handle both es imports and cjs
        //         mod: mod.default ? mod.default : mod
        //     })
        // })
    }

    render() {
        return this.props.children(this.state.mod);
    }
}

