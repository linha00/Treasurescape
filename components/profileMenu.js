import React from 'react';
import { Modal, TouchableWithoutFeedback, StyleSheet, View, Text } from 'react-native';

import color from '../config/colors';

export class ProfileMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    show = () => {
        this.setState({show: true})
    }
    
    close = () => {
        this.setState({show: false})
    }

    renderOutsideTouchable(onTouch) {
        const view = <View style = {{flex: 1, width: '100%'}} />
        if (!onTouch) return view;

        return (
            <TouchableWithoutFeedback onPress={onTouch} style={{flex: 1, width: '100%'}}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    render() {
        let {show} = this.state
        const {onTouchOutside} = this.props

        return (
            <Modal
                animationType = {'fade'}
                transparent = {true}
                visible = {show}
                onRequestClose = {this.close}
            >
                <View style = {styles.container}>
                    {this.renderOutsideTouchable(onTouchOutside)}
                    <View style = {styles.menu}>
                        <Text>asd</Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#000000aa",
    },

    menu: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        width: '80%',
        height: '50%',
        bottom: 250,
        padding: 20,
        backgroundColor: color.gold,
    },
    
})