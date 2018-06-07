import React, {Component} from 'react'
import {View, Alert, Button} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import ExamServices from "../services/ExamServices";
import WidgetList from "./WidgetList";

class QuestionList extends Component {
    static navigationOptions = {title: 'Questions'}

    constructor(props) {
        super(props)
        this.state = {
            widgets: [],
            questions: [],
            examId: 1,
            lessonId: 1
        }
        this.examService = ExamServices.instance;
        this.deleteExam = this.deleteExam.bind(this)

    }

    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId");
        const lessonId = navigation.getParam("lessonId");
        // this.findAllWidgetsForLesson(this.state.lessonId)
        this.setState({
            examId: examId,
            lessonId: lessonId
        })
        fetch("http://localhost:8080/api/exam/" + examId + "/question")
            .then(response => (response.json()))
            .then(questions => this.setState({questions}))
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            examId: newProps.examId,
            lessonId: newProps.lessonId
        })
        fetch("http://localhost:8080/api/exam/" + newProps.examId + "/question")
            .then(response => (response.json()))
            .then(questions => this.setState({questions}))
    }

    // findAllWidgetsForLesson(lessonId) {
    //     this.examService.findAllWidgetsForLesson(lessonId)
    //         .then((widgets) => {
    //             this.setWidgets(widgets)
    //         });
    // }

    // setWidgets(widgets) {
    //     this.setState({widgets: widgets})
    // }

    deleteExam() {
        this.examService
            .deleteExam(this.state.examId)
            .then(() => {
                this.props.navigation
                    .navigate("WidgetList", {lessonId: this.state.lessonId})
                // this.findAllWidgetsForLesson(this.state.lessonId)
            });
    }

    render() {
        return (
            <View style={{padding: 15}}>
                {this.state.questions.map(
                    (question, index) => (
                        <ListItem
                            onPress={() => {
                                if (question.type === "TrueFalse")
                                    this.props.navigation
                                        .navigate("TrueFalseQuestionEditor", {questionId: question.id})
                                if (question.type === "MultipleChoice")
                                    this.props.navigation
                                        .navigate("MultipleChoiceQuestionEditor", {questionId: question.id})
                            }}
                            key={index}
                            subtitle={question.description}
                            title={question.title}/>))}
                <Button backgroundColor="red"
                        color="white"
                        onPress={() => {
                            this.deleteExam()
                        }
                        }
                        title="Delete Exam"/>
            </View>
        )
    }
}

export default QuestionList