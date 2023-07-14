import {StyleSheet, Dimensions} from 'react-native';
import color from './colors';

const windowWidth = Dimensions.get('window').width;
const temp_size = Dimensions.get('window').height / 50;
const componentWidth = (windowWidth / 3) - 30;
const componentHeight = componentWidth * 1.5;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    container2: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    main_friend_box: {
        width: windowWidth * 0.8,
        height: '75%',
        padding: 5,
        borderWidth: 1,
        borderRadius: 25,
    },

    main_logo: {
        width: windowWidth / 3,
        height: windowWidth / 3,
        top: -10,
    },

    main_box_group: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 50,
    },

    box2: {
        flexDirection: 'row',
        width: "100%",
        height: componentHeight + 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingBottom: 5,
        marginBottom: 10,
        borderBottomWidth: 1,
    },

    main_friend_profile: {
        width: componentWidth,
        height: componentHeight,
        left: 0,
    },

    text: {
        width: componentWidth + 30,
        top: 15,
        left: 20,
    },

    name: {
        fontSize: temp_size * 1.2,
        fontWeight: 'bold',
    },

    mission: {
        fontSize: temp_size * 0.8,
    },

    menuContainer: {
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
        padding: 20,
        backgroundColor: color.primary,
    },

    menu_top: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    menu_header: {
        flex: 1,
        fontSize: temp_size * 1.5,
        fontWeight: 'bold',
        left: windowWidth / 4,
    },

    menu_id: {
        flex: 1,
        width: '85%',
    },

    ownID: {
        fontSize: temp_size,
        fontWeight: 'bold',
    },

    addID: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    
    nearby: {
        flex: 4,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 15,
    },

    nearbyHeader: {
        fontSize: temp_size * 1.5,
        fontWeight: 'bold',
        paddingBottom: 5,
    },

    nearbyBox: {
        width: '100%',
        height: '75%',
        margin: 2,
        borderRadius: 10,
        borderWidth: 1,
    },

    menu_add_button: {
        backgroundColor: color.tertiary,
        width: temp_size * 4,
        height: temp_size * 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },

    menu_box2: {
        flexDirection: 'row',
        width: "100%",
        height: componentWidth,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 5,
        marginBottom: 10,
        borderBottomWidth: 1,
    },
    
    menu_friend_profile: {
        width: componentWidth * 0.65,
        height: componentHeight * 0.65,
    },

    friendRequest: {
        flex: 3,
        width: '90%',
        alignItems: 'center',
        marginTop: -20,
    },

    friendRequest_button_group: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        margin: 5,
    },

    friendRequest_button: {
        padding: temp_size * 0.4,
        backgroundColor: color.tertiary,
        borderRadius: 10,
    },
    
    friendRequest_button_nearby: {
        padding: temp_size * 0.5,
        backgroundColor: color.tertiary,
        borderRadius: 10,
    },
    
})

export default styles;