import React, {Component} from 'react'
import {ScrollView, Alert, Button, Picker, View} from 'react-native'
import {Text, ListItem, Icon} from 'react-native-elements'
import ExamServices from "../services/ExamServices";
import WidgetList from "./WidgetList";
import MultipleChoiceQuestionEditor from "../editor_elements/MultipleChoiceQuestionEditor";
import TrueFalseQuestionEditor from "../editor_elements/TrueFalseQuestionEditor";
import FillInTheBlanksQuestionEditor from "../editor_elements/FillInTheBlanksQuestionEditor";
import EssayQuestionEditor from "../editor_elements/EssayQuestionEditor";
import UpdateTrueFalse from "../elements/UpdateTrueFalse";
import UpdateMultipleChoice from "../elements/UpdateMultipleChoice";
import UpdateFillInTheBlanks from "../elements/UpdateFillInTheBlanks";

class ExamQuestionList extends Component {
    static navigationOptions = {title: 'Questions'}

    constructor(props) {
        super(props)
        this.state = {
            widgets: [],
            questions: [],
            examId: 1,
            lessonId: 1,
            newQuestion: ''
        }
        this.examService = ExamServices.instance;
        this.deleteExam = this.deleteExam.bind(this)

    }

    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId");
        const lessonId = navigation.getParam("lessonId");
        this.setState({
            examId: examId,
            lessonId: lessonId
        })
        fetch("http://localhost:8080/api/exam/" + examId + "/question")
            .then(response => (response.json()))
            .then(questions => this.setState({questions}))
    }

    componentWillReceiveProps(newProps) {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId");
        const lessonId = navigation.getParam("lessonId");
        this.setState({
            examId: examId,
            lessonId: lessonId
        })
        fetch("http://localhost:8080/api/exam/" + examId + "/question")
            .then(response => (response.json()))
            .then(questions => this.setState({questions}))
    }

    deleteExam() {
        this.examService
            .deleteExam(this.state.examId)
            .then(() => {
                this.props.navigation
                    .navigate("WidgetList", {lessonId: this.state.lessonId})
            });
    }

    render() {
        return (
            <ScrollView style={{padding: 15}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Icon
                        reverse
                        color='red'
                        name='trash'
                        type='font-awesome'
                        onPress={() =>
                            this.deleteExam()
                        }
                    />
                </View>
                <Picker
                    onValueChange={(value) =>
                        this.setState({newQuestion: value})}
                    selectedValue={this.state.newQuestion}>
                    <Picker.Item value="MC"
                                 label="Multiple Choice"/>
                    <Picker.Item value="TF"
                                 label="True or False"/>
                    <Picker.Item value="FB"
                                 label="Fill in the Blanks"/>
                    <Picker.Item value="EQ"
                                 label="Essay"/>
                </Picker>
                {this.state.newQuestion === 'MC' && <MultipleChoiceQuestionEditor examId={this.state.examId}
                                                                                  lessonId={this.state.lessonId}
                                                                                  navigation={this.props.navigation}/>}
                {this.state.newQuestion === 'TF' && <TrueFalseQuestionEditor examId={this.state.examId}
                                                                             lessonId={this.state.lessonId}
                                                                             navigation={this.props.navigation}/>}/>}
                {this.state.newQuestion === 'FB' && <FillInTheBlanksQuestionEditor examId={this.state.examId}
                                                                                   lessonId={this.state.lessonId}
                                                                                   navigation={this.props.navigation}/>}/>}
                {this.state.newQuestion === 'EQ' && <EssayQuestionEditor examId={this.state.examId}
                                                                         lessonId={this.state.lessonId}
                                                                         navigation={this.props.navigation}/>}/>}
                {this.state.questions.map(
                    (question, index) => (
                        <ListItem
                            onPress={() => {
                                if (question.type === "TrueFalse") {
                                    this.props.navigation
                                        .navigate("UpdateTrueFalse", {
                                            questionId: question.id, question: question,
                                            examId: this.state.examId, lessonId: this.state.lessonId
                                        })
                                }
                                if (question.type === "MultipleChoice") {
                                    this.props.navigation
                                        .navigate("UpdateMultipleChoice", {
                                            questionId: question.id, question: question,
                                            examId: this.state.examId, lessonId: this.state.lessonId
                                        })
                                }
                                else if (question.type === "FillInTheBlanks") {
                                    this.props.navigation
                                        .navigate("UpdateFillInTheBlanks", {
                                            questionId: question.id, question: question,
                                            examId: this.state.examId, lessonId: this.state.lessonId
                                        })
                                }
                                else if (question.type === "Essay") {
                                    this.props.navigation
                                        .navigate("UpdateEssay", {
                                            questionId: question.id, question: question,
                                            examId: this.state.examId, lessonId: this.state.lessonId
                                        })
                                }
                            }
                            }
                            key={index}
                            subtitle={question.description}
                            title={question.title}/>))}
            </ScrollView>
        )
    }
}

export default ExamQuestionList