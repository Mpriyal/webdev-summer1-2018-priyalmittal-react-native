import React from 'react'
import {ScrollView, View} from 'react-native'
import {Text, Button, CheckBox, ButtonGroup, Icon} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import ExamQuestionList from "../components/ExamQuestionList"
import MultipleChoiceService from "../services/MultipleChoiceService";

class UpdateMultipleChoice extends React.Component {
    static navigationOptions = {title: "Multiple Choice Updator"}

    constructor(props) {
        super(props)
        this.state = {
            examId: 1,
            questionId: 1,
            lessonId: 1,
            buttons: [],
            multipleChoiceQuestion: {
                title: '',
                description: '',
                points: 0,
                options: '',
                correctOption: 0,
                type: 'MultipleChoice'
            }
        }
        this.multipleChoiceQuestionService = MultipleChoiceService.instance;
    }

    componentWillReceiveProps(newProps) {
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
            lessonId: lessonId,
            buttons: question.options.split(","),
            examId: examId,
            multipleChoiceQuestion: question
        })
    }

    updateTitle(title) {
        this.setState({
            multipleChoiceQuestion: {
                title: title,
                description: this.state.multipleChoiceQuestion.description,
                points: this.state.multipleChoiceQuestion.points,
                options: this.state.multipleChoiceQuestion.options,
                correctOption: this.state.multipleChoiceQuestion.correctOption,
                type: this.state.multipleChoiceQuestion.type
            }
        });
    }

    updateDescription(description) {
        this.setState({
            multipleChoiceQuestion: {
                title: this.state.multipleChoiceQuestion.title,
                description: description,
                points: this.state.multipleChoiceQuestion.points,
                options: this.state.multipleChoiceQuestion.options,
                correctOption: this.state.multipleChoiceQuestion.correctOption,
                type: this.state.multipleChoiceQuestion.type
            }
        });
    }

    updatePoints(points) {
        this.setState({
            multipleChoiceQuestion: {
                title: this.state.multipleChoiceQuestion.title,
                description: this.state.multipleChoiceQuestion.description,
                points: points,
                options: this.state.multipleChoiceQuestion.options,
                correctOption: this.state.multipleChoiceQuestion.correctOption,
                type: this.state.multipleChoiceQuestion.type
            }
        });
    }

    updateForm(newState) {
        this.setState(newState)
    }

    updateOption(correctOption) {
        this.setState({
            multipleChoiceQuestion: {
                title: this.state.multipleChoiceQuestion.title,
                description: this.state.multipleChoiceQuestion.description,
                points: this.state.multipleChoiceQuestion.points,
                options: this.state.multipleChoiceQuestion.options,
                correctOption: correctOption,
                type: this.state.multipleChoiceQuestion.type
            }
        });
    }

    updateOptions(options) {
        this.setState({
            multipleChoiceQuestion: {
                title: this.state.multipleChoiceQuestion.title,
                description: this.state.multipleChoiceQuestion.description,
                points: this.state.multipleChoiceQuestion.points,
                options: options,
                correctOption: this.state.multipleChoiceQuestion.correctOption,
                type: this.state.multipleChoiceQuestion.type
            }
        }
        );
        this.setState(
            {buttons: options.split(",")}
            )
    }

    updateMultipleChoice() {
        this.multipleChoiceQuestionService
            .updateMultipleChoiceQuestion(this.state.questionId, this.state.multipleChoiceQuestion)
            .then(() => {
            this.props.navigation
                .navigate("ExamQuestionList", {examId: this.state.examId, lessonId: this.state.lessonId});
        })
    }

    deleteMultipleChoice() {
        this.multipleChoiceQuestionService
            .deleteMultipleChoiceQuestion(this.state.questionId)
            .then(() => {
                this.props.navigation
                    .navigate("ExamQuestionList", {examId: this.state.examId, lessonId: this.state.lessonId});
            })
    }

    render() {
        return (
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput
                    value={this.state.multipleChoiceQuestion.title}
                    onChangeText={
                        text => this.updateTitle(text)
                    }/>
                <FormLabel>Description</FormLabel>
                <FormInput
                    value={this.state.multipleChoiceQuestion.description}
                    onChangeText={
                        text => this.updateDescription(text)
                    }/>
                <FormLabel>Points</FormLabel>
                <FormInput
                    value={this.state.multipleChoiceQuestion.points.toString()}
                    onChangeText={
                        text => this.updatePoints(text)
                    }/>

                <FormLabel>Options</FormLabel>
                <FormInput
                    value={this.state.multipleChoiceQuestion.options}
                    onChangeText={
                        text => this.updateOptions(text)
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
                                {this.updateMultipleChoice()}}
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
                                {this.deleteMultipleChoice()}}
                            />
                        </View>
                    </View>
                </View>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                <Text h3>Preview</Text>
                </View>
                <Text>{this.state.multipleChoiceQuestion.title}</Text>
                <Text>{this.state.multipleChoiceQuestion.description}</Text>
                <Text>{this.state.multipleChoiceQuestion.points}</Text>
                <Text>{this.state.multipleChoiceQuestion.options}</Text>
                <ButtonGroup
                    onPress={this.updateOption}
                    selectedIndex={this.state.multipleChoiceQuestion.correctOption}
                    buttons={this.state.buttons}/>
            </ScrollView>
        )
    }
}
export default UpdateMultipleChoice;