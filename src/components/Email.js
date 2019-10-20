import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    TouchableHighlight,
    Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const highlight = 'orange';

class Email extends React.Component {
    state = {
        email: '',
        validEmail: false
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.title}>
                        enter your <Text style={{ color: highlight }}>email</Text>
                    </Text>
                </View>

                <View style={[styles.body, { marginTop: screenHeight / 16 }]}>
                    <TextInput
                        style={[styles.input, { borderBottomColor: this.state.validEmail ? '#5cb85c' : '#d9534f' }]}
                        onChangeText={(email) => this.validateEmail({ email })}
                        value={this.state.email}
                        autoCompleteType='email'
                        autoFocus={true}
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        autoCapitalize='none'
                        placeholder='user@example.com'
                    ></TextInput>

                    <TouchableHighlight
                        style={this.state.validEmail ? { opacity: 1 } : { opacity: .4 }}
                        onPress={() => {
                            if (this.state.validEmail) {
                                Actions.login({ email: this.state.email, firstName: "Alex" });
                            }
                        }}
                    >
                        <Text style={styles.button}>next</Text>
                    </TouchableHighlight>

                    {this.state.email.length > 3 && !this.state.validEmail &&
                        <Text style={styles.errorText}>
                            enter a valid email address
                        </Text>
                    }
                </View>
            </SafeAreaView >
        )
    }

    validateEmail(email) {
        this.setState(email);
        let regex = /[^@]+@[^\.]+\..+/g

        if (regex.test(email.email)) {
            this.setState({ 'validEmail': true });
        } else {
            this.setState({ 'validEmail': false });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    },
    body: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        marginTop: screenHeight / 8,
        paddingLeft: screenWidth * .05,
        paddingRight: screenWidth * .05,
        fontSize: 60,
        fontWeight: 'bold',
        color: '#00000f'
    },
    input: {
        fontSize: 25,
        width: screenWidth * .8,
        textAlign: 'center',
        borderBottomWidth: 2,
        borderBottomColor: "#d3d3d3",
    },
    button: {
        display: 'flex',
        marginTop: screenHeight / 24,
        padding: 10,
        fontSize: 20,
        backgroundColor: highlight,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },
    instruction: {
        textAlign: 'center',
        marginTop: screenHeight / 32,
        fontSize: 20,
        color: '#8c92ac'
    },
    errorText: {
        marginTop: screenHeight / 32,
        color: '#d9534f'
    }
});

export default Email;
export { styles };