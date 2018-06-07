import React from 'react'
import {View} from 'react-native'
import {Text, Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import AssignmentServices from "../services/AssignmentServices";


class AssignmentContainer extends React.Component {
    static navigationOptions = { title: "Assignment Editor"};
    constructor(props) {
        super(props);
        this.assignmentService = AssignmentServices.instance;
        this.state = {
            lessonId: this.props.lessonId,
            assignment: {
            title: '',
            description: '',
            points: 0,
            widgetType: 'assignment'}
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

    updateTitle(newTitle) {
        this.setState({assignment: {title: newTitle,
                description: this.state.assignment.description,
                points: this.state.assignment.points,
                widgetType:this.state.assignment.widgetType}});
    }

    updateDescription(newDescription) {
        this.setState({assignment: {title: this.state.assignment.title,
                description: newDescription,
                points: this.state.assignment.points,
                widgetType:this.state.assignment.widgetType}});
    }

    updatePoints(newPoints) {
        this.setState({assignment: {title: this.state.assignment.title,
                description: this.state.assignment.description,
                points: newPoints,
                widgetType:this.state.assignment.widgetType}});
    }

    updateForm(newState) {
        this.setState(newState)
    }

    // createAssignment(){
    //     this.assignmentService
    //         .createAssignment(this.state.lessonId, {title: this.state.title,
    //             description: this.state.description,
    //             points: this.state.points});
    // }

    createAssignment(){
        this.assignmentService
            .createAssignment(this.state.lessonId, this.state.assignment);
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

                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={
                    points => this.updatePoints(points)
                }/>
                <FormValidationMessage>
                    Points is required
                </FormValidationMessage>

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={() => {this.createAssignment()}}/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"
                           onPress={() => {this.updateForm({title:'',description:'',points:'',widgetType:'assignment'})}}/>

                <Text h3>Preview</Text>
                <Text h2>{this.state.title}</Text>
                <Text>{this.state.description}</Text>
                <Text h4>Essay Answer</Text>
                <FormInput/>
                <Text h4>Upload a file</Text>
                <FormInput/>
                <Text h4>Submit a Link</Text>
                <FormInput/>
                <Button	backgroundColor="green"
                           color="white"
                           title="Submit"/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"/>

            </View>
        )
    }
}

export default AssignmentContainer