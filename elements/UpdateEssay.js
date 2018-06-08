import React from 'react'
import {ScrollView, View} from 'react-native'
import {Text, Button, Icon} from 'react-native-elements'
import {FormLabel, FormInput}
    from 'react-native-elements'
import EssayService from "../services/EssayService";
import ExamQuestionList from "../components/ExamQuestionList"

class UpdateEssay extends React.Component {
    static navigationOptions = { title: "Essay Updator"}
    constructor(props) {
        super(props)
        this.state = {
            examId: 1,
            questionId: 1,
            lessonId: 1,
            essayQuestion: {
                title: '',
                description: '',
                points: 0,
                type: 'Essay'
            }
        }
        this.essayService = EssayService.instance;
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
        const lessonId = navigation.getParam('lessonId');
        const question = navigation.getParam('question');
        const examId = navigation.getParam('examId');
        this.setState({
            questionId:questionId,
            lessonId: lessonId,
            essayQuestion: question,
            examId: examId
        })
    }

    updateTitle(title) {
        this.setState({essayQuestion: {title: title,
                description: this.state.essayQuestion.description,
                points: this.state.essayQuestion.points,
                type: this.state.essayQuestion.type}});
    }

    updateDescription(description) {
        this.setState({essayQuestion: {title: this.state.essayQuestion.title,
                description: description,
                points: this.state.essayQuestion.points,
                type: this.state.essayQuestion.type}});
    }

    updatePoints(points) {
        this.setState({essayQuestion: {title: this.state.essayQuestion.title,
                description: this.state.essayQuestion.description,
                points: points,
                type: this.state.essayQuestion.type}});
    }

    updateForm(newState) {
        this.setState(newState)
    }

    updateEssay(){
        this.essayService.updateEssayQuestion(this.state.questionId, this.state.essayQuestion)
            .then(() => {
                this.props.navigation
                    .navigate("ExamQuestionList", {examId: this.state.examId})
            });
    }

    deleteEssay(){
        this.essayService
            .deleteEssayQuestion(this.state.questionId)
            .then(() => {
                this.props.navigation
                    .navigate("ExamQuestionList", {examId: this.state.examId, lessonId: this.state.lessonId});
            })}

    render() {
        return(
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput
                    value ={this.state.essayQuestion.title}
                    onChangeText={
                        text => this.updateTitle(text)
                    }/>

                <FormLabel>Description</FormLabel>
                <FormInput
                    value ={this.state.essayQuestion.description}
                    onChangeText={
                        text => this.updateDescription(text)
                    }/>

                <FormLabel>Points</FormLabel>
                <FormInput
                    value ={(this.state.essayQuestion.points).toString()}
                    onChangeText={
                        text => this.updatePoints(text)
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
                                {this.updateEssay()}}
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
                                {this.deleteEssay()}}
                            />
                        </View>
                    </View>
                </View>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                <Text h3>Preview</Text>
                </View>
                <Text>{this.state.essayQuestion.title}</Text>
                <Text>{this.state.essayQuestion.description}</Text>
            </ScrollView>
        )
    }
}
export default UpdateEssay;