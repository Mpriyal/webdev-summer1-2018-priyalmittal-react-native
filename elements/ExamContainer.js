import React from 'react'
import {View} from 'react-native'
import {Text, Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import ExamServices from "../services/ExamServices";
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
            .createExam(this.state.lessonId, this.state.exam);
    }

    render() {
        return(
            <View>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateTitle(text)
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateDescription(text)
                }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={() => {this.createExam()}}/>

                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"
                           onPress={() => {this.setState({exam: {title:'',description:'',questions:[],
                               widgetType:'exam'}})}}/>

                <Text h3>Preview</Text>
                {<Text h2>{this.state.exam.title}</Text>}
                {<Text>{this.state.exam.description}</Text>}
                <FormInput/>
                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                />
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"
                />
            </View>
        )
    }
}

export default ExamContainer