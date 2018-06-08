import React from 'react'
import {ScrollView, View} from 'react-native'
import {Text, Button, Icon} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import AssignmentServices from "../services/AssignmentServices";
import WidgetList from "../components/WidgetList";


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
        const widget = navigation.getParam('widget');
        const assignmentId = navigation.getParam('assignmentId');
        const lessonId = navigation.getParam('lessonId');
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

    newTitle(title) {
        this.setState({assignment: {title: title,
                description: this.state.assignment.description,
                points: this.state.assignment.points,
                widgetType:this.state.assignment.widgetType}});
    }

    newDescription(description) {
        this.setState({assignment: {title: this.state.assignment.title,
                description: description,
                points: this.state.assignment.points,
                widgetType:this.state.assignment.widgetType}});
    }

    newPoints(points) {
        this.setState({assignment: {title: this.state.assignment.title,
                description: this.state.assignment.description,
                points: points,
                widgetType:this.state.assignment.widgetType}});
    }

    updateForm(newState) {
        this.setState(newState)
    }

    updateAssignment(){
        this.assignmentService
            .updateAssignment(this.state.assignmentId, this.state.assignment)
            .then(() => {
                this.props.navigation
                    .navigate("WidgetList", {lessonId: this.state.lessonId});
    })}

    deleteWidget(){
        this.assignmentService
            .deleteAssignment(this.state.assignmentId)
            .then(() => {
                this.props.navigation
                    .navigate("WidgetList", {lessonId: this.state.lessonId});
    })}

    render() {
        return(
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput
                    value ={this.state.assignment.title}
                    onChangeText={
                    text => this.newTitle(text)
                }/>
                <FormLabel>Description</FormLabel>
                <FormInput
                    value ={this.state.assignment.description}
                    onChangeText={
                    text => this.newDescription(text)
                }/>
                <FormLabel>Points</FormLabel>
                <FormInput
                    value ={(this.state.assignment.points).toString()}
                    onChangeText={
                    points => this.newPoints(points)
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
                                {this.updateAssignment()}}
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
                                        .navigate("WidgetList", {lessonId: this.state.lessonId})
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
                                {this.deleteWidget()}}
                            />
                        </View>
                    </View>
                </View>

                <View style={{justifyContent:"center", alignItems:"center"}}>
                <Text h3>Preview</Text>
                </View>
                <Text h2>{this.state.title}</Text>
                <Text h1>{this.state.description}</Text>
                <FormInput
                    placeholder={'This is the essay'}/>
                <Text h4>Upload a file</Text>
                <Button style={{color:'white', backgroundColor:"black"}}>Upload file</Button>
                <Text h4>Submit a Link</Text>
                <FormInput
                    placeholder={'Enter link here'}/>

            </ScrollView>
        )
    }
}

export default AssignmentEditor