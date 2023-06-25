/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, SafeAreaView, Text, Modal, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import color from '../../../config/colors';

import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../contexts/auth';

import BackButton from '../../../components/backButton';
import CustomButton from '../../../components/customButton';
import AppLoader from '../../../components/AppLoader';
import CustomInput from '../../../components/customInput';
import { useForm } from 'react-hook-form';

function MissionPage() {
    const nav = useRouter();
    const { user } = useAuth();
    const [missionId, setMissionId] = useState(0);
    const [text, setText] = useState("temp");
    const [gold, setGold] = useState(0);
    
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [enter_prompt, setenter_prompt] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [wrong, setWrong] = useState(false);
    const [enter_loading, setEnter_loading] = useState(false);
    
    const {control, handleSubmit } = useForm();

    async function getMission() {
        setLoading(true);
        let {data} = await supabase.from('profiles').select().eq('id', user.id).single();
        let tempid = data.mission;
        if (tempid != null) {
            let {data} = await supabase.from('missions').select().eq('id', tempid).single();
            setGold(data.award);
            setMissionId(data.id);
            setText(data.description);
        }
        setLoading(false);
        setRefresh(false);
    }

    useFocusEffect(
        React.useCallback(() => {
            getMission();
        }, [])
    );

    useEffect(() => {
        if (refresh) {
            getMission();
        }
    }, [refresh])

    const enter_pressed = async input => {
        const keyed = input.passcode;

        setEnter_loading(true);
        try {
            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();
            let balance = data.gold;
            let mission = data.mission;
            if (mission != 0) {
                const { data } = await supabase
                .from('missions')
                .select('*')
                .eq('id', mission)
                .single();
                let reward = data.award;
                let passcod = data.passcode;
                if (passcod == keyed) {
                    if (reward != 0 && mission != 3) {
                        await supabase
                        .from('profiles')
                        .update({ 
                            gold: balance + reward,
                            mission: mission + 1
                        })
                        .eq('id', user.id);
                        nav.push('/mission');
                    } else {
                        //temp solution for hiting the last mission
                        await supabase
                        .from('profiles')
                        .update({ 
                            gold: balance + reward,
                            mission: 1
                        })
                        .eq('id', user.id);
                        nav.push('/mission');
                    }
                    setRefresh(true);
                    setEnter_loading(false);
                    setCorrect(true);
                } else {
                    setWrong(true);
                }
            }
        } catch(error) {
            console.log(error.message);
        }
};

    return (
        <>
            <SafeAreaView style={styles.container}>
                <BackButton style={styles.back} onPress={() => nav.back()}/>
                <View style={styles.container1}>
                    <Image style={styles.logo} 
                        source={require('../../../assets/logo.png')} />
                </View>

                <View style={styles.container2}>
                    <View style = {styles.headertab}>
                        <Text style={styles.header}>
                            Mission {missionId}:
                        </Text>
                        <Text style = {styles.gold}>{gold}g</Text>
                    </View>
                    
                    <View style={styles.box}>
                        <Text>{text}</Text>
                    </View>
                </View>

                <View style={styles.button}>
                    <CustomButton text= "key" onPress={() => setenter_prompt(true)} />
                    <Modal
                        animationType = {'fade'}
                        transparent = {true}
                        visible = {enter_prompt}
                    >
                        <View style = {styles.passcode_container}>
                            <View style = {styles.passcode}>
                                <View style = {styles.top}>
                                    <Text style = {styles.passcode_header}>passcode</Text>
                                    <CustomButton 
                                        style = {styles.cross} 
                                        type='cross' 
                                        onPress={() => setenter_prompt(false)}
                                    />
                                </View>
                                <View style={styles.bottom}>
                                    <View style={styles.passcode_input}>
                                        <CustomInput 
                                            name = "passcode"
                                            placeholder = "passcode" 
                                            control = {control}
                                            rules = {{
                                                required: "enter the passcode",
                                                minLength: {value: 8, message: "passcode should be 8 characers long"},
                                            }}
                                        />
                                    </View>
                                    <View style={styles.passcode_button}>
                                        <CustomButton 
                                            text = {enter_loading ? "Loading" : "enter"} 
                                            onPress = {handleSubmit(enter_pressed)}
                                        />
                                    </View>
                                    <Modal
                                        visible = {correct}
                                        animationType = {'fade'}
                                        transparent = {true}
                                    >
                                        <TouchableWithoutFeedback style = {styles.temp} onPress={() => {setCorrect(false); setenter_prompt(false);}}>
                                            <SafeAreaView style = {styles.correct}>
                                                    <Image style = {styles.correctImage} source={require('../../../assets/logo.png')} />
                                                    <Text style = {styles.correctText}>That's Right!</Text>
                                            </SafeAreaView>
                                        </TouchableWithoutFeedback>
                                    </Modal>
                                    <Modal
                                        visible = {wrong}
                                        animationType = {'fade'}
                                        transparent = {true}
                                    >
                                        <TouchableWithoutFeedback style = {styles.temp} onPress={() => {setWrong(false)}}>
                                            <SafeAreaView style = {styles.wrong}>
                                                    <Image style = {styles.correctImage} source={require('../../../assets/logo.png')} />
                                                    <Text style = {styles.correctText}>That's Wrong!</Text>
                                            </SafeAreaView>
                                        </TouchableWithoutFeedback>
                                    </Modal>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
            {loading ? <AppLoader /> : null}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    container1: {
        flex: 2,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },  

    container2: {
        flex: 2.5,
        width: '90%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10,
    }, 

    button: {
        flex: 0.8,
        top: -50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        width: 280,
        height: 280,
        top: 30,
    },

    back: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    
    headertab: {
        flexDirection: 'row',
        width: '95%',
        alignItems: 'center',
        justifyContent: 'space-between',
        bottom: 10,
    },

    header: {
        fontSize: 25,
    },

    gold: {
        fontSize: 30,
        color: color.gold,
        top: 5,
    },

    box: {
        backgroundColor: color.primary,
        width: '100%',
        height: '80%',
        paddingTop: 25,
        paddingHorizontal: 30,
        borderRadius: 30,
    },

    passcode_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#000000aa",
    },

    passcode: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 20,
        width: '70%',
        height: '25%',
        padding: 20,
        backgroundColor: color.primary,
    },

    top: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    bottom: {
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        bottom: 10,
    },

    passcode_input: {
        width: '140%',
    },

    passcode_button: {
        width: '80%',
        left: 30,
    },

    passcode_header: {
        flex: 1,
        fontSize: 25,
        left: 95,
    },

    correct: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.gold,
    },

    wrong: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.red,
    },

    correctImage: {
        width: 200,
        height: 200,
    },

    correctText: {
        fontSize: 30,
    },
})

export default MissionPage;