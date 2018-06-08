import React from 'react'
import {ScrollView, View} from 'react-native'
import {Text, Button, Icon} from 'react-native-elements'
import {FormLabel, FormInput, ButtonGroup} from 'react-native-elements'
import MultipleChoiceService from "../services/MultipleChoiceService";

class MultipleChoiceQuestionEditor extends React.Component {
    static navigationOptions = {title: "Multiple Choice"}

    constructor(props) {
        super(props)
        this.state = {
            examId: 1,
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
        })
    }

    componentDidMount() {
        const examId = this.props.examId;
        this.setState({
            examId: examId,
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
        this.setState({buttons: options.split(",")})
    }

    updateForm(newState) {
        this.setState(newState)
    }

    createMultiChoice() {
        this.multipleChoiceQuestionService
            .createMultiChoiceQuestion(this.state.examId, this.state.multipleChoiceQuestion)
            .then(() => {
                this.props.navigation
                    .navigate("ExamQuestionList", {examId: this.state.examId})
            });
    }

    render() {
        return (
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput
                    placeholder={'Enter question title'}
                    onChangeText={
                    titleText => this.updateTitle(titleText)
                }/>

                <FormLabel>Description</FormLabel>
                <FormInput
                    placeholder={'Enter question description'}
                    onChangeText={
                    descriptionText => this.updateDescription(descriptionText)
                }/>

                <FormLabel>Points</FormLabel>
                <FormInput
                    placeholder={'Enter question points'}
                    onChangeText={
                    pointsText => this.updatePoints(pointsText)
                }/>

                <FormLabel>Options</FormLabel>
                <FormInput
                    placeholder={'Enter question options'}
                    onChangeText={
                    optionsText => this.updateOptions(optionsText)
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
                                {this.createMultiChoice()}}
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
                <View style={{justifyContent:'center', alignItems:'center'}}>
                <Text h3>Preview</Text>
                </View>
                <Text h2>{this.state.multipleChoiceQuestion.title}</Text>
                <Text>{this.state.multipleChoiceQuestion.description}</Text>
                <ButtonGroup
                    onPress={this.updateOption}
                    selectedIndex={this.state.multipleChoiceQuestion.correctOption}
                    buttons={this.state.buttons}/>
            </ScrollView>
        )
    }
}
export default MultipleChoiceQuestionEditor;