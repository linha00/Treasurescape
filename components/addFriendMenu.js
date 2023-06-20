import React from 'react';
import { Modal, TouchableWithoutFeedback, StyleSheet, View, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import color from '../config/colors';

import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/auth';

import CustomButton from './customButton';
import CustomInput from './customInput';

export class AddFriendMenu extends React.Component {

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
        // const {control, handleSubmit, formState: {errors}} = useForm();
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
                        <View style = {styles.top}>
                            <Text style = {styles.header}>Add Friend</Text>
                            <CustomButton style = {styles.cross} type='cross' onPress={this.close}/>
                        </View>
                        <View style = {styles.id}>
                            <Text style = {styles.ownID}>your ID: placeholder</Text>
                            <View style = {styles.addID}>
                                <Text>input placeholder</Text>
                                <Text>button placeholder</Text>
                            </View>
                        </View>
                        <View style = {styles.nearby}>
                            <Text style = {styles.nearbyHeader}>nearby</Text>
                            <Text style = {styles.list}>placeholder</Text>
                        </View>
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
        flexDirection: 'column',
        borderRadius: 20,
        width: '90%',
        height: '80%',
        bottom: 100,
        padding: 20,
        backgroundColor: color.primary,
    },

    top: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    header: {
        flex: 1,
        fontSize: 25,
        left: 135,
    },

    id: {
        flex: 2,
        width: '80%',
        backgroundColor: color.gold,
    },

    addID: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    
    nearby: {
        flex: 9,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.blue,
    },
    
})