import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24, // samething as padding: 0 24; in html/css
        paddingTop: Constants.statusBarHeight + 20,
    },
    header: {
        flexDirection: 'row', //By Default, in ReactNative the flex-direction property is col by default
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 15,
        color: '#737390',
    },
    headerTextBold: {
        fontWeight: 'bold'
    },
    title: {
        fontSize: 30,
        marginBottom: 16,
        marginTop: 48,
        color: '#13131a',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        color: '#737380',
        lineHeight: 24,
    },

    incidentList: {
        marginTop: 32,
    },
    incident: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16,
    },
    incidentProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold'
    },
    incidentValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380'
    },
    detailsButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    detailsButtonText: {
        color: '#e02041',
        fontSize: 21,
        fontWeight: 'bold'
    }
})

export default Styles