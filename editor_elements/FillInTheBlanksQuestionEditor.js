import React from 'react'
import {ScrollView, View} from 'react-native'
import {Text, Button, CheckBox, Icon} from 'react-native-elements'
import {FormLabel, FormInput}
    from 'react-native-elements'
import FillInTheBlankService from "../services/FillInTheBlankService";

class FillInTheBlankQuestionEditor extends React.Component {
    static navigationOptions = { title: "Fill in the Blanks"}
    constructor(props) {
        super(props)
        this.state = {
            examId: 1,
            fillBlanksQuestion: {
                title: '',
                description: '',
                points: 0,
                questionText: '',
                variables: '',
                type: 'FillInTheBlanks'}
        }
        this.fillInTheBlankQuestionService = FillInTheBlankService.instance;
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
        this.setState({fillBlanksQuestion: {
                title: title,
                description: this.state.fillBlanksQuestion.description,
                points: this.state.fillBlanksQuestion.points,
                questionText: this.state.fillBlanksQuestion.questionText,
                variables: this.state.fillBlanksQuestion.variables,
                type: this.state.fillBlanksQuestion.type}});
    }

    updateDescription(description) {
        this.setState({fillBlanksQuestion: {
                title: this.state.fillBlanksQuestion.title,
                description: description,
                points: this.state.fillBlanksQuestion.points,
                questionText: this.state.fillBlanksQuestion.questionText,
                variables: this.state.fillBlanksQuestion.variables,
                type: this.state.fillBlanksQuestion.type}});
    }

    updatePoints(points) {
        this.setState({fillBlanksQuestion: {
                title: this.state.fillBlanksQuestion.title,
                description: this.state.fillBlanksQuestion.description,
                points: points,
                questionText: this.state.fillBlanksQuestion.questionText,
                variables: this.state.fillBlanksQuestion.variables,
                type: this.state.fillBlanksQuestion.type}});
    }

    updateQuestionText(questionText) {

        let words = []
        questionText.replace(/\[(.+?)\]/g, function($0, $1) { words.push($1) })

        if(words){
            this.setState({fillBlanksQuestion: {
                    title: this.state.fillBlanksQuestion.title,
                    description: this.state.fillBlanksQuestion.description,
                    points: this.state.fillBlanksQuestion.points,
                    questionText: questionText,
                    variables: words.join(),
                    type: this.state.fillBlanksQuestion.type}});
        }
        else{
            this.setState({fillBlanksQuestion: {
                    title: this.state.fillBlanksQuestion.title,
                    description: this.state.fillBlanksQuestion.description,
                    points: this.state.fillBlanksQuestion.points,
                    questionText: questionText,
                    variables: this.state.fillBlanksQuestion.variables,
                    type: this.state.fillBlanksQuestion.type}});
        }

    }

    updateForm(newState) {
        this.setState(newState)
    }

    createFillInTheBlank(){
        this.fillInTheBlankQuestionService
            .createFillInTheBlankQuestion(this.state.examId, this.state.fillBlanksQuestion)
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
                <FormLabel>Question Text</FormLabel>
                <FormInput
                    placeholder={'Enter question text'}
                    onChangeText={
                    text => this.updateQuestionText(text)
                }/>
                <View style={{padding: 15}}>
                    <View style={{flex:1,flexDirection: 'row', alignItems:'center'}}>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Icon
                                reverse
                                color='green'
                                name='save'
                                type='font-awesome'
                                onPress={() =>
                                {this.createFillInTheBlank()}}
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

                <Text h3>Preview</Text>
                <Text>{this.state.fillBlanksQuestion.questionText.replace(/\[([^\]]+)\]/g, '[         ]')}</Text>
                <Text h2>{this.state.fillBlanksQuestion.title}</Text>
                <Text>{this.state.fillBlanksQuestion.description}</Text>
                <Text>{this.state.fillBlanksQuestion.points}</Text>
            </ScrollView>
        )
    }
}

export default FillInTheBlankQuestionEditor