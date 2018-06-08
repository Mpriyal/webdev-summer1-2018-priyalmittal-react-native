import React from 'react'
import {ScrollView, View} from 'react-native'
import {Text, Button, CheckBox, Icon} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import FillInTheBlankService from "../services/FillInTheBlankService";
import ExamQuestionList from "../components/ExamQuestionList"

class UpdateFillInTheBlanks extends React.Component {
    static navigationOptions = { title: "Update Fill in the Blank"}
    constructor(props) {
        super(props)
        this.state = {
            examId: 1,
            questionId:1,
            lessonId: 1,
            fillBlanksQuestion: {title: '', description: '', points: 0, questionText: '', variables: '', type: 'FillInTheBlanks'}
        }
        this.fillInTheBlankQuestionService = FillInTheBlankService.instance;
    }

    componentWillReceiveProps(newProps){
        this.setState({
            examId: newProps.examId,
            questionId: newProps.questionId,
            lessonId: newProps.lessonId
        })
    }

    componentDidMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam('questionId');
        const examId = navigation.getParam('examId');
        const lessonId = navigation.getParam('lessonId');
        const question = navigation.getParam('question');
        this.setState({
            questionId: questionId,
            examId: examId,
            lessonId: lessonId,
            fillBlanksQuestion: question
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

    updateFillInTheBlank(){
        this.fillInTheBlankQuestionService.
        updateFillInTheBlankQuestion(this.state.questionId, this.state.fillBlanksQuestion)
            .then(() => {
            this.props.navigation
                .navigate("ExamQuestionList", {examId: this.state.examId, lessonId: this.state.lessonId});
        })
    }

    deleteFillInTheBlank(){
        this.fillInTheBlankQuestionService
            .deleteFillInTheBlankQuestion(this.state.questionId)
            .then(() => {
                this.props.navigation
                    .navigate("ExamQuestionList", {examId: this.state.examId, lessonId: this.state.lessonId});
            })}

    render() {

        return(
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput
                    value ={this.state.fillBlanksQuestion.title}
                    onChangeText={
                        text => this.updateTitle(text)
                    }/>
                <FormLabel>Description</FormLabel>
                <FormInput
                    value ={this.state.fillBlanksQuestion.description}
                    onChangeText={
                        text => this.updateDescription(text)
                    }/>
                <FormLabel>Points</FormLabel>
                <FormInput
                    value ={(this.state.fillBlanksQuestion.points).toString()}
                    onChangeText={
                        text => this.updatePoints(text)
                    }/>
                <FormLabel>Question Text</FormLabel>
                <FormInput
                    value ={this.state.fillBlanksQuestion.questionText}
                    onChangeText={
                        text => this.updateQuestionText(text)
                    }/>

                <View style={{padding: 15}}>
                    <View style={{flex:1,flexDirection: 'row', alignItems:'center'}}>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Icon
                                reverse
                                color='green'
                                name='refresh'
                                type='font-awesome'
                                onPress={() =>
                                {this.updateFillInTheBlank()}}
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
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Icon
                                reverse
                                color='red'
                                name='trash'
                                type='font-awesome'
                                onPress={() =>
                                {this.deleteFillInTheBlank()}}
                            />
                        </View>
                    </View>
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text h3>Preview</Text>
                </View>
                <Text>{this.state.fillBlanksQuestion.questionText.replace(/\[([^\]]+)\]/g, '[         ]')}</Text>
                <Text>{this.state.fillBlanksQuestion.title}</Text>
                <Text>{this.state.fillBlanksQuestion.description}</Text>
                <Text>{this.state.fillBlanksQuestion.points}</Text>
            </ScrollView>
        )
    }
}

export default UpdateFillInTheBlanks