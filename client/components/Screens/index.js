import React from 'react'
import Screen0 from './Screen0'
import Screen1 from './Screen1'
import Screen2 from './Screen2'

const Screens = (props) => {
    if (props.screen == 0) {
        return (
            <Screen0 {...props} />
        )
    }
    if (props.screen == 1) {
        return (
            <Screen1 {...props} />
        )
    }
    if (props.screen == 2) {
        return (
            <Screen2 {...props} />
        )
    }
}

export default Screens