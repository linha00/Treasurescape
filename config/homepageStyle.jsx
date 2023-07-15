import {StyleSheet, Dimensions} from 'react-native';
import color from './colors';

const temp_size = Dimensions.get('window').height / 50;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    //home page 
    home_topbar: {
        flex: 3,
        width: "100%",
        flexDirection: 'row',
        backgroundColor: color.secondary,
        alignItems: 'flex-end',
        padding: temp_size * 2,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    home_middleScreen: {
        flex: 9,
        width: "85%",
        marginVertical: 20,
    },
    home_section: {
        flex: 3,
        marginVertical: 5,        
    },
    headers: {
        fontSize: temp_size * 1.5,
        fontWeight: 'bold',
    },
    home_box: {
        backgroundColor: color.primary,
        width: '100%',
        height: '85%',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    home_username: {
        fontSize: temp_size * 2,
        color: color.quaternary,
    },
    home_totalgoldText: {
        fontSize: temp_size,
        paddingLeft: 3,
    },
    home_gold: {
        fontSize: temp_size * 2.1,
        color: color.gold,
        paddingLeft: temp_size,
    },
    home_avatar: {
        width: Dimensions.get('window').width / 4 + 10,
        height: (Dimensions.get('window').width / 4 + 10) * 1.3,
        top: temp_size,
        right: temp_size,
    },

    //home page profile memu
    profile_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#000000aa",
    },
    profile_menu: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        width: '80%',
        height: '70%',
        padding: 20,
        backgroundColor: color.primary,
    },
    profile_menu_top: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    profile_menu_header: {
        fontSize: 25,
    },
    cross: {
        position: 'absolute',
        left:  (Dimensions.get('window').width / 2) * 7.5 / 10
    },
    profile_menu_bottom: {
        flex: 13,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    profile_menu_avatar: {
        width: Dimensions.get('window').width / 3 * 2,
        height: (Dimensions.get('window').width / 3 * 2) * 1.1,
        top: 15,
    },
    profile_menu_button_group: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    profile_menu_button: {
        width: '45%',
    },

    log_out_button: {
        width: '100%',
        marginVertical: 10,
    },

    camera_cross: {
        position: 'absolute',
        alignItems: 'flex-end',
        right: temp_size,
        top: temp_size,
        backgroundColor: color.white,
    },
    camera_button: {
        alignItems: 'center',
        bottom: Dimensions.get('window').height / 15,
    },

    profile_menu_photo_taken: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        width: '75%',
        height: '52%',
        padding: 20,
        backgroundColor: color.primary,
    },

    profile_photo_taken: {
        margin: 15,
        width: temp_size * 14,
        height: temp_size * 14 * 1.1,
    },

    profile_photo_taken_button_group: {
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center',
    }, 

    photo_taken_button: {
        marginHorizontal: temp_size * 0.7,
        backgroundColor: color.tertiary,
        alignItems: 'center',
        justifyContent: 'center',
        width: temp_size * 6,
        height: temp_size * 4,
        borderRadius: 10,
    },

    leaderboard_box: {
        backgroundColor: color.primary,
        width: '100%',
        height: '85%',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
    },

    leaderboard_column: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    leaderboard_text:{
        fontSize: temp_size * 0.8,
        fontWeight: 'bold',
    },

    leaderboard_2nd: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: color.tertiary,
        width: '60%',
        height: '25%',
    },
    
    leaderboard_1st: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: color.tertiary,
        width: '60%',
        height: '35%',
    },
    
    leaderboard_3rd: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: color.tertiary,
        width: '60%',
        height: '15%',
    },

    leaderboard_image: {
        width: temp_size * 3.2,
        height: temp_size * 3.2 * 1.2,
    },
})

export default styles;