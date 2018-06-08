import React from 'react'
import {ScrollView, View} from 'react-native'
import {Text, Button, Icon} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import ExamServices from "../services/ExamServices";
import WidgetList from "../components/WidgetList";
// import QuestionTypePicker from "./QuestionTypePicker";


class ExamContainer extends React.Component {
    static navigationOptions = { title: "Assignment Editor"};
    constructor(props) {
        super(props);
        this.examService = ExamServices.instance;
        this.state = {
            lessonId: this.props.lessonId,
            exam : {title: '', description: '', questions: [],
                widgetType: 'exam'}
        }
    }

    componentDidMount() {
        this.setState({
            lessonId: this.props.lessonId
        })
    }

    componentWillReceiveProps(newProps){
        this.setState({
            lessonId: newProps.lessonId
        })
    }

    updateForm(newState) {
        this.setState(newState)
    }

    updateTitle(newTitle) {
        this.setState({exam: {title: newTitle,
                description: this.state.exam.description,
                questions: this.state.exam.questions,
            widgetType:this.state.exam.widgetType}});
    }

    updateDescription(newDescription) {

        this.setState({exam: {title: this.state.exam.title,
                description: newDescription,
                questions: this.state.exam.questions,
                widgetType:this.state.exam.widgetType}});
    }

    createExam(){
        this.examService
            .createExam(this.state.lessonId, this.state.exam)
            .then(() => {
                this.props.navigation
                    .navigate("WidgetList", {lessonId: this.state.lessonId})
            });
    }

    render() {
        return(
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput
                    placeholder={'Enter Exam title'}
                    onChangeText=
                        {
                    text => this.updateTitle(text)
                }/>

                <FormLabel>Description</FormLabel>
                <FormInput
                    placeholder={'Enter Exam description'}
                    onChangeText={
                    text => this.updateDescription(text)
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
                        {this.createExam()}}
                    />
                </View>

                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Icon
                        reverse
                        color='red'
                        name='times'
                        type='font-awesome'
                        onPress={() =>
                            this.props.navigation
                                .navigate("WidgetList", {lessonId: this.state.lessonId})
                        }
                    />
                </View>
                </View>
            </View>
                <View style={{justifyContent:"center", alignItems:"center"}}>
                <Text h1>Preview:</Text>
                </View>
                <Text h2>{this.state.exam.title}</Text>
                <Text h3>{this.state.exam.description}</Text>
            </ScrollView>
        )
    }
}

export default ExamContainer