import React from 'react'
import {ScrollView, View} from 'react-native'
import {Text, Button, CheckBox, Icon} from 'react-native-elements'
import {FormLabel, FormInput} from 'react-native-elements'
import TrueFalseService from "../services/TrueFalseService";

class TrueFalseQuestionEditor extends React.Component {
    static navigationOptions = { title: "True False"}
    constructor(props) {
        super(props)
        this.state = {
            examId: 1,
            trueFalseQuestion: {title: '', description: '', points: 0, isTrue: true, type: 'TrueFalse' }
        }
        this.trueFalseQuestionService = TrueFalseService.instance;
        this.updateIsTrue = this.updateIsTrue.bind(this)
    }

    componentWillReceiveProps(newProps){
        this.setState({
            examId: newProps.examId
        })
    }

    componentDidMount() {
        const examId = this.props.examId;
        this.setState({
            examId: examId
        })
    }

    updateTitle(title) {
        this.setState({trueFalseQuestion: {title: title,
                description: this.state.trueFalseQuestion.description,
                points: this.state.trueFalseQuestion.points,
                isTrue: this.state.trueFalseQuestion.isTrue,
                type: this.state.trueFalseQuestion.type}});
    }

    updateDescription(description) {
        this.setState({trueFalseQuestion: {title: this.state.trueFalseQuestion.title,
                description: description,
                points: this.state.trueFalseQuestion.points,
                isTrue: this.state.trueFalseQuestion.isTrue,
                type: this.state.trueFalseQuestion.type}});
    }

    updatePoints(points) {
        this.setState({trueFalseQuestion: {title: this.state.trueFalseQuestion.title,
                description: this.state.trueFalseQuestion.description,
                points: points,
                isTrue: this.state.trueFalseQuestion.isTrue,
                type: this.state.trueFalseQuestion.type}});
    }

    updateIsTrue(isTrue) {
        this.setState({trueFalseQuestion: {title: this.state.trueFalseQuestion.title,
                description: this.state.trueFalseQuestion.description,
                points: this.state.trueFalseQuestion.points,
                isTrue: isTrue,
                type: this.state.trueFalseQuestion.type}});
    }

    updateForm(newState) {
        this.setState(newState)
    }

    createTrueFalse(){
        this.trueFalseQuestionService.createTrueFalseQuestion(this.state.examId, this.state.trueFalseQuestion)
            .then(() => {
                this.props.navigation
                    .navigate("ExamQuestionList", {examId: this.state.examId})
            });
    }

    render() {
        return(
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput
                    placeholder={'Enter question title'}
                    onChangeText={
                    text => this.updateTitle(text)
                }/>
                <FormLabel>Description</FormLabel>
                <FormInput
                    placeholder={'Enter question description'}
                    onChangeText={
                        text => this.updateDescription(text)
                }/>
                <FormLabel>Points</FormLabel>
                <FormInput
                    placeholder={'Enter question points'}
                    onChangeText={
                        text => this.updatePoints(text)
                }/>
                <CheckBox onPress={() => this.updateIsTrue(!this.state.trueFalseQuestion.isTrue)}
                          checked={this.state.trueFalseQuestion.isTrue} title='The answer is true'/>

                <View style={{padding: 15}}>
                    <View style={{flex:1,flexDirection: 'row', alignItems:'center'}}>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Icon
                                reverse
                                color='green'
                                name='save'
                                type='font-awesome'
                                onPress={() =>
                                {this.createTrueFalse()}}
                            />
                        </View>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Icon
                                reverse
                                color='black'
                                name='times'
                                type='font-awesome'
                                onPress={() =>
                                    this.props.navigation
                                        .navigate("ExamQuestionList", {examId: this.state.examId})
                                }
                            />
                        </View>
                    </View>
                </View>
                <View style={{flex:1,flexDirection: 'row', alignItems:'center'}}>
                <Text h3>Preview</Text>
                </View>
                <Text>{this.state.trueFalseQuestion.title}</Text>
                <Text>{this.state.trueFalseQuestion.description}</Text>
            </ScrollView>
        )
    }
}

export default TrueFalseQuestionEditor;