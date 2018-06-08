import React from 'react'
import {ScrollView, View} from 'react-native'
import {Text, Button, CheckBox, Icon} from 'react-native-elements'
import {FormLabel, FormInput}
    from 'react-native-elements'
import TrueFalseService from "../services/TrueFalseService";
import ExamQuestionList from "../components/ExamQuestionList"

class UpdateTrueFalse extends React.Component {
    static navigationOptions = { title: "True False Updator"}
    constructor(props) {
        super(props)
        this.state = {
            examId: 1,
            questionId: 1,
            lessonId: 1,
            trueFalseQuestion: {title: '', description: '', points: 0, isTrue: true, type: 'TrueFalse' }
        }
        this.trueFalseQuestionService = TrueFalseService.instance;
        this.updateIsTrue = this.updateIsTrue.bind(this)
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
            questionId:questionId,
            examId: examId,
            lessonId: lessonId,
            trueFalseQuestion: question
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

    updateTrueFalse(){
        this.trueFalseQuestionService
            .updateTrueFalseQuestion(this.state.questionId, this.state.trueFalseQuestion)
            .then(() => {
                this.props.navigation
                    .navigate("ExamQuestionList", {examId: this.state.examId, lessonId: this.state.lessonId});
            })
    }

    deleteTrueFalse(){
        this.trueFalseQuestionService
            .deleteTrueFalseQuestion(this.state.questionId)
            .then(() => {
                console.log(this.state.lessonId)
                this.props.navigation
                    .navigate("ExamQuestionList", {examId: this.state.examId, lessonId: this.state.lessonId});
            })}

    render() {
        return(
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput
                    value ={this.state.trueFalseQuestion.title}
                    onChangeText={
                        titleText => this.updateTitle(titleText)
                    }/>
                <FormLabel>Description</FormLabel>
                <FormInput
                    value ={this.state.trueFalseQuestion.description}
                    onChangeText={
                        descriptionText => this.updateDescription(descriptionText)
                    }/>
                <FormLabel>Points</FormLabel>
                <FormInput
                    value ={(this.state.trueFalseQuestion.points).toString()}
                    onChangeText={
                        pointsText => this.updatePoints(pointsText)
                    }/>
                <CheckBox
                    value ={this.state.trueFalseQuestion.isTrue}
                    onPress={() => this.updateIsTrue(!this.state.trueFalseQuestion.isTrue)}
                    checked={this.state.trueFalseQuestion.isTrue} title='The answer is true'/>

                <View style={{padding: 15}}>
                    <View style={{flex:1,flexDirection: 'row', alignItems:'center'}}>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Icon
                                reverse
                                color='green'
                                name='refresh'
                                type='font-awesome'
                                onPress={() =>
                                {this.updateTrueFalse()}}
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
                                {this.deleteTrueFalse()}}
                            />
                        </View>
                    </View>
                </View>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                <Text h3>Preview</Text>
                </View>
                <Text>{this.state.trueFalseQuestion.title}</Text>
                <Text>{this.state.trueFalseQuestion.description}</Text>
            </ScrollView>
        )
    }
}

export default UpdateTrueFalse;