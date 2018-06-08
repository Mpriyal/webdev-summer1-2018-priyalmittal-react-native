import React from 'react'
import {ScrollView, View} from 'react-native'
import {Text, Button, Icon} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import AssignmentServices from "../services/AssignmentServices";
import WidgetList from "../components/WidgetList";


class AssignmentContainer extends React.Component {
    static navigationOptions = {title: "Assignment Editor"};

    constructor(props) {
        super(props);
        this.assignmentService = AssignmentServices.instance;
        this.state = {
            lessonId: this.props.lessonId,
            assignment: {
                title: '',
                description: '',
                points: 0,
                widgetType: 'assignment'
            }
        }
    }

    componentDidMount() {
        this.setState({
            lessonId: this.props.lessonId
        })
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            lessonId: newProps.lessonId
        })
    }

    updateTitle(newTitle) {
        this.setState({
            assignment: {
                title: newTitle,
                description: this.state.assignment.description,
                points: this.state.assignment.points,
                widgetType: this.state.assignment.widgetType
            }
        });
    }

    updateDescription(newDescription) {
        this.setState({
            assignment: {
                title: this.state.assignment.title,
                description: newDescription,
                points: this.state.assignment.points,
                widgetType: this.state.assignment.widgetType
            }
        });
    }

    updatePoints(newPoints) {
        this.setState({
            assignment: {
                title: this.state.assignment.title,
                description: this.state.assignment.description,
                points: newPoints,
                widgetType: this.state.assignment.widgetType
            }
        });
    }

    updateForm(newState) {
        this.setState(newState)
    }

    createAssignment() {
        this.assignmentService
            .createAssignment(this.state.lessonId, this.state.assignment)
            .then(() => {
                    this.props.navigation
                        .navigate("WidgetList", {lessonId: this.state.lessonId})
                }
            );
    }

    render() {
        return (
            <ScrollView>
                <FormLabel>Title</FormLabel>
                <FormInput
                    placeholder={'Enter Assignment title'}
                    onChangeText={
                        text => this.updateTitle(text)
                    }/>

                <FormLabel>Description</FormLabel>
                <FormInput
                    placeholder={'Enter Assignment description'}
                    onChangeText={
                        text => this.updateDescription(text)
                    }/>

                <FormLabel>Points</FormLabel>
                <FormInput
                    placeholder={'Enter points for this assignment'}
                    onChangeText={
                        points => this.updatePoints(points)
                    }/>
                <View style={{padding: 15}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Icon
                                reverse
                                color='green'
                                name='save'
                                type='font-awesome'
                                onPress={() => {
                                    this.createAssignment()
                                }}
                            />
                        </View>

                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
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

                <View style={{justifyContent: "center", alignItems: "center"}}>
                    <Text h3>Preview</Text>
                </View>
                <Text h2>{this.state.title}</Text>
                <Text h1>{this.state.description}</Text>
                <Text h4>Essay Answer</Text>
                <FormInput
                placeholder={'This is the essay'}/>
                <Text h4>Upload a file</Text>
                <Button style={{color:'black', backgroundColor:"grey"}}>Upload file</Button>
                <Text h4>Submit a Link</Text>
                <FormInput
                    placeholder={'Enter link here'}/>

            </ScrollView>
        )
    }
}

export default AssignmentContainer