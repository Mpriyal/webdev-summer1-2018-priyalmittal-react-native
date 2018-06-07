import React from 'react'
import {View} from 'react-native'
import {Text, Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import AssignmentServices from "../services/AssignmentServices";


class AssignmentEditor extends React.Component {
    static navigationOptions = { title: "Assignment Editor"};
    constructor(props) {
        super(props);
        this.assignmentService = AssignmentServices.instance;
        this.state = {
            assignmentId:1,
            lessonId:1,
            assignment: {
            title: '',
            description: '',
            points: 0,
            widgetType: 'assignment'}
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const assignmentId = navigation.getParam('assignmentId');
        const lessonId = navigation.getParam('lessonId');
        const widget = navigation.getParam('widget');
        this.setState({
            lessonId:lessonId,
            assignmentId: assignmentId,
            assignment: widget
        })
    }

    componentWillReceiveProps(newProps){
        this.setState({
            lessonId: newProps.lessonId,
            assignmentId: newProps.assignmentId
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

    updateAssignment(){
        this.assignmentService
            .updateAssignment(this.state.assignmentId, this.state.assignment);
    }

    deleteWidget(){
        this.assignmentService
            .deleteAssignment(this.state.assignmentId)
            .then(() => {
                this.props.navigation
                    .navigate("WidgetList", {lessonId: this.state.lessonId});
    })}

    render() {
        return(
            <View>
                <FormLabel>Title</FormLabel>
                <FormInput
                    value ={this.state.assignment.title}
                    onChangeText={
                    text => this.updateTitle(text)
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput
                    value ={this.state.assignment.description}
                    onChangeText={
                    text => this.updateDescription(text)
                }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Points</FormLabel>
                <FormInput
                    value ={(this.state.assignment.points).toString()}
                    onChangeText={
                    points => this.updatePoints(points)
                }/>
                <FormValidationMessage>
                    Points is required
                </FormValidationMessage>

                <Button	backgroundColor="green"
                           color="white"
                           title="Update"
                           onPress={() => {this.updateAssignment()}}/>
                <Button	backgroundColor="blue"
                           color="white"
                           title="Cancel"
                           onPress={() => {this.updateForm({title:'',description:'',points:'',widgetType:'assignment'})}}/>
                <Button backgroundColor="red"
                        color="white"
                        onPress={() => {this.deleteWidget()}}
                        title="Delete Widget"/>

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

export default AssignmentEditor