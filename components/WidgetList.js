import React, {Component} from 'react'
import {ScrollView, View} from 'react-native'
import {Button, ListItem, Icon} from 'react-native-elements'
import AssignmentContainer from "../elements/AssignmentContainer";

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'};

    constructor(props) {
        super(props)
        this.state = {
            widgets: [],
            courseId: 1,
            moduleId: 1,
            lessonId: 1
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId");
        this.setState({
            lessonId: lessonId
        })
        fetch("http://localhost:8080/api/lesson/" + lessonId + "/widget")
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets}))
    }

    componentWillReceiveProps(newProps) {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId");
        this.setState({
            lessonId: lessonId
        })
        fetch("http://localhost:8080/api/lesson/" + lessonId + "/widget")
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets}))
    }

    render() {
        return (
            <ScrollView style={{padding: 15}}>
                <View style={{justifyContent:"center", alignItems:"center"}}>
                <Icon
                    reverse
                    color='green'
                    name='plus'
                    type='font-awesome'
                    onPress={() =>
                        this.props.navigation.navigate('WidgetEditor', {lessonId: this.state.lessonId})}
                />
                </View>

                {this.state.widgets.map(
                    (widget, index) => (
                        <ListItem
                            onPress={() => {
                                if (widget.widgetType === "exam") {
                                    this.props.navigation.navigate("ExamQuestionList", {examId: widget.id, lessonId: this.state.lessonId})
                                }
                                else {
                                    this.props.navigation.navigate("AssignmentEditor", {assignmentId: widget.id, widget: widget,lessonId: this.state.lessonId })
                                }
                            }}
                            key={index}
                            title={widget.title}
                            subtitle={widget.description}/>
                    ))}
            </ScrollView>
        )
    }
}

export default WidgetList